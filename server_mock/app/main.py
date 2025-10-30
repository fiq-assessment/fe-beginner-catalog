from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime, timedelta
import random

app = FastAPI(title="Product Catalog Mock API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory mock data
CATEGORIES = ["Apparel", "Gadgets", "Books", "Home"]
PRODUCTS = []

# Generate mock products
for i in range(1, 101):
    PRODUCTS.append({
        "id": str(i),
        "name": f"Product {i}",
        "description": f"This is a detailed description for product {i}. It showcases the features and benefits.",
        "priceCents": random.randint(999, 29999),
        "stock": random.randint(0, 100),
        "category": random.choice(CATEGORIES),
        "createdAt": (datetime.now() - timedelta(days=random.randint(0, 365))).isoformat()
    })

@app.get("/health")
async def health():
    return {"ok": True}

@app.get("/products")
async def list_products(
    search: str | None = None,
    category: str | None = None,
    sort: str | None = None,
    page: int = 1,
    limit: int = 20
):
    """
    EXPECTATION:
    - Implement offset pagination as specified in README.
    - Filter by search term (name/description) and category.
    - Support sorting by price:asc|desc, created_at:asc|desc.
    - Return proper status codes.
    """
    # Filter
    filtered = PRODUCTS.copy()
    
    if search:
        search_lower = search.lower()
        filtered = [p for p in filtered if search_lower in p["name"].lower() or search_lower in p["description"].lower()]
    
    if category:
        filtered = [p for p in filtered if p["category"] == category]
    
    # Sort
    if sort:
        for part in reversed(sort.split(",")):
            if ":" in part:
                key, direction = part.split(":")
                reverse = (direction == "desc")
                
                if key == "price":
                    filtered.sort(key=lambda x: x["priceCents"], reverse=reverse)
                elif key == "created_at":
                    filtered.sort(key=lambda x: x["createdAt"], reverse=reverse)
    else:
        # Default: newest first
        filtered.sort(key=lambda x: x["createdAt"], reverse=True)
    
    # Paginate
    total = len(filtered)
    start = (page - 1) * limit
    end = start + limit
    items = filtered[start:end]
    
    total_pages = max(1, (total + limit - 1) // limit)
    
    return {
        "items": items,
        "page": page,
        "totalPages": total_pages,
        "total": total
    }

@app.get("/products/{id}")
async def get_product(id: str):
    """
    EXPECTATION:
    - Return 404 if product not found.
    """
    product = next((p for p in PRODUCTS if p["id"] == id), None)
    if not product:
        raise HTTPException(404, "Product not found")
    return product

