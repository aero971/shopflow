import { Link } from 'react-router-dom';

export default function ProductCard({ product }) {
  const outOfStock = product.stock <= 0;
  const lowStock = !outOfStock && product.stock <= 5;
  const initial = product.name?.trim().charAt(0).toUpperCase() || '?';

  return (
    <article className="product-card" data-testid="product-card" data-product-id={product.id}>
      <Link to={`/products/${product.id}`}>
        <div className="product-monogram" aria-hidden="true">{initial}</div>
      </Link>
      <Link to={`/products/${product.id}`}>
        <h3 data-testid="product-name">{product.name}</h3>
      </Link>
      <p className="product-description">{product.description}</p>
      <div className="flex-between">
        <span className="price" data-testid="product-price">${product.price.toFixed(2)}</span>
        <span className={`stock-note${lowStock ? ' low' : ''}`} data-testid="product-stock">
          {outOfStock ? 'Out of stock' : lowStock ? `Only ${product.stock} left` : 'In stock'}
        </span>
      </div>
      <Link to={`/products/${product.id}`} className="btn btn-secondary btn-block" data-testid="view-product-link">
        View product
      </Link>
    </article>
  );
}
