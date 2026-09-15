import { useEffect, useMemo, useState } from 'react';
import * as productApi from '../api/productApi.js';
import ProductCard from '../components/ProductCard.jsx';
import EmptyState from '../components/EmptyState.jsx';

// FR-006/FR-007: search and filter/sort. The backend's GET /api/products
// has no query parameters, so this filters/sorts the fetched list
// client-side. Fine at this catalog size; if the catalog grows, this
// should move server-side.
export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('name-asc');

  useEffect(() => {
    let cancelled = false;
    productApi.getProducts()
      .then((data) => { if (!cancelled) setProducts(data); })
      .catch((err) => { if (!cancelled) setError(err.message); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, []);

  const visibleProducts = useMemo(() => {
    const term = search.trim().toLowerCase();
    const filtered = term
      ? products.filter((p) =>
          p.name.toLowerCase().includes(term) || p.description.toLowerCase().includes(term))
      : products;

    const sorted = [...filtered];
    switch (sort) {
      case 'price-asc':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        sorted.sort((a, b) => b.price - a.price);
        break;
      default:
        sorted.sort((a, b) => a.name.localeCompare(b.name));
    }
    return sorted;
  }, [products, search, sort]);

  return (
    <div>
      <div className="page-header">
        <h1>Products</h1>
      </div>

      <div className="toolbar">
        <input
          type="search"
          placeholder="Search products…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          data-testid="product-search-input"
          aria-label="Search products"
        />
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          data-testid="product-sort-select"
          aria-label="Sort products"
        >
          <option value="name-asc">Name (A–Z)</option>
          <option value="price-asc">Price (low to high)</option>
          <option value="price-desc">Price (high to low)</option>
        </select>
      </div>

      {loading && <p className="muted">Loading products…</p>}
      {error && <div className="form-error" data-testid="products-error">{error}</div>}

      {!loading && !error && visibleProducts.length === 0 && (
        <EmptyState
          title={search ? 'No products match your search' : 'No products yet'}
          description={search ? 'Try a different keyword.' : 'Check back once products are added.'}
        />
      )}

      {!loading && visibleProducts.length > 0 && (
        <div className="product-grid" data-testid="product-grid">
          {visibleProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
