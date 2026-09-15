import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as productApi from '../api/productApi.js';
import { useAuth } from '../context/AuthContext.jsx';
import { useCart } from '../context/CartContext.jsx';
import { useToast } from '../context/ToastContext.jsx';
import QuantityStepper from '../components/QuantityStepper.jsx';

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { addItem } = useCart();
  const { show } = useToast();

  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    setProduct(null);
    setError(null);
    productApi.getProduct(id)
      .then(setProduct)
      .catch((err) => setError(err.message));
  }, [id]);

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: { pathname: `/products/${id}` } } });
      return;
    }
    setAdding(true);
    try {
      await addItem(Number(id), quantity);
      show(`Added ${quantity} × ${product.name} to your cart.`, 'success');
    } catch (err) {
      show(err.message, 'error');
    } finally {
      setAdding(false);
    }
  };

  if (error) {
    return <div className="form-error" data-testid="product-detail-error">{error}</div>;
  }

  if (!product) {
    return <p className="muted">Loading product…</p>;
  }

  const outOfStock = product.stock <= 0;

  return (
    <div className="card" data-testid="product-detail">
      <div className="product-monogram" style={{ maxWidth: '16rem', fontSize: '3.5rem' }} aria-hidden="true">
        {product.name.charAt(0).toUpperCase()}
      </div>

      <h1 data-testid="product-detail-name">{product.name}</h1>
      <p data-testid="product-detail-description">{product.description}</p>
      <p className="price" data-testid="product-detail-price">${product.price.toFixed(2)}</p>
      <p className="stock-note" data-testid="product-detail-stock">
        {outOfStock ? 'Out of stock' : `${product.stock} in stock`}
      </p>

      {!outOfStock && (
        <div className="flex-between mt-6" style={{ maxWidth: '20rem' }}>
          <QuantityStepper value={quantity} max={product.stock} onChange={setQuantity} disabled={adding} />
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleAddToCart}
            disabled={adding}
            data-testid="add-to-cart-button"
          >
            {adding ? 'Adding…' : 'Add to cart'}
          </button>
        </div>
      )}
    </div>
  );
}
