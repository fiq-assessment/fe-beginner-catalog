import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="container">
      <div className="card">
        <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>FE Beginner: Product Catalog</h1>
        <p style={{ marginBottom: '1rem' }}>
          Build a product browsing interface with search, filters, sorting, and pagination.
        </p>
        <Link href="/products" className="btn">
          Go to Products →
        </Link>
      </div>
    </div>
  );
}

