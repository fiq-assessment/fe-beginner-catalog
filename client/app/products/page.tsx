"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "../../src/store";
import { setFilter } from "../../src/store/slices/scenario.slice";
import { api } from "../../src/lib/api";
import { debounce, formatCurrency } from "@/lib/utils";
import type { Product, PaginatedResponse } from "@/lib/types";
import { UiButton } from "../../src/components/UiButton";
import { UiInput } from "../../src/components/UiInput";

export default function ProductsPage() {
  const dispatch = useAppDispatch();
  const filters = useAppSelector((s) => s.scenario);

  const [data, setData] = useState<PaginatedResponse<Product> | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const searchParams = useSearchParams();

  const initialSearch = searchParams.get("search") || "";
  const initialCategory = searchParams.get("category") || "";
  const initialSort = searchParams.get("sort") || "price_asc";
  const initialPage = Number(searchParams.get("page") || 1);

  const [search, setSearch] = useState(initialSearch);
  const [category, setCategory] = useState(initialCategory);
  const [sort, setSort] = useState(initialSort);
  const [page, setPage] = useState(initialPage);

  // Update Redux filters and URL params with debounce
  const syncFiltersToUrl = useMemo(
    () =>
      debounce((nextFilters: Record<string, any>) => {
        const q = new URLSearchParams();
        Object.entries(nextFilters).forEach(([k, v]) => {
          if (v !== undefined && v !== "") q.set(k, String(v));
        });
        router.push(`/products?${q.toString()}`);
        dispatch(setFilter(nextFilters));
      }, 300),
    [router, dispatch]
  );

  useEffect(() => {
    syncFiltersToUrl({ search, category, sort, page });
  }, [search, category, sort, page, syncFiltersToUrl]);

  // Fetch Products when filters change
  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        setError(null);
        const params = new URLSearchParams({
          search,
          category,
          sort,
          page: String(page),
          limit: String(filters.limit ?? 20),
        });

        const res = await api(`/products?${params.toString()}`);
        setData(res);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [search, category, sort, page, filters.limit]);

  const nextPage = () => setPage((p) => p + 1);
  const prevPage = () => setPage((p) => Math.max(1, p - 1));

  const totalPages = data?.totalPages || 1;

  return (
    <div className="container">
      <h1>Products</h1>

      {/* filter controls */}
      <div>
        <UiInput
          label="Search"
          value={search}
          onChange={(e) => {
            setPage(1);
            setSearch(e.target.value);
          }}
        />

        <div>
          <label>Category</label>
          <select
            value={category}
            onChange={(e) => {
              setPage(1);
              setCategory(e.target.value);
            }}
            className="input"
          >
            <option value="">All</option>
            <option value="electronics">Electronics</option>
            <option value="apparel">Apparel</option>
            <option value="home">Home</option>
          </select>
        </div>

        <div>
          <label>Sort By</label>
          <select
            value={sort}
            onChange={(e) => {
              setPage(1);
              setSort(e.target.value);
            }}
            className="input"
          >
            <option value="price_asc">Price Up</option>
            <option value="price_desc">Price Down</option>
            <option value="newest">Newest</option>
          </select>
        </div>
      </div>
      {/* pagination */}
      <div>
        <UiButton onClick={prevPage} disabled={page <= 1}>
          Prev
        </UiButton>
        <span>
          page {page} of {totalPages}
        </span>
        <UiButton onClick={nextPage} disabled={page >= totalPages}>
          Next
        </UiButton>
      </div>
      <div className="grid">
        {data?.items.map((p) => (
          <div key={p.id} className="card">
            <a href={`/products/${p.id}`}>
              <h3>{p.name}</h3>
              <p>{p.description}</p>
              <p>Category: {p.category}</p>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
