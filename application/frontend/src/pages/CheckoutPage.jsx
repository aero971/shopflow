import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import { useToast } from '../context/ToastContext.jsx';
import * as orderApi from '../api/orderApi.js';
import { useAuth } from '../context/AuthContext.jsx';
import EmptyState from '../components/EmptyState.jsx';

// NOTE ON SCOPE: the spec (FR-013) asks checkout to collect shipping
// details. The backend's POST /api/orders/checkout takes no body at
// all - it always ships to whatever is on the user's account and
// there's currently no "my profile" endpoint to even display that
// address here. This page is a review + confirm screen against the
// backend as it exists today; adding a shipping-details step means
// adding that to the backend first.
export default function CheckoutPage() {
  const { cart, refresh } = useCart();
  const { token } = useAuth();
  const { show } = useToast();
  const navigate = useNavigate();
  const [placing, setPlacing] = useState(false);
  const [error, setError] = useState(null);

  const items = cart?.items ?? [];

  const handlePlaceOrder = async () => {
    setPlacing(true);
    setError(null);
    try {
      const order = await orderApi.checkout(token);
      await refresh();
      show('Order placed.', 'success');
      navigate(`/orders/${order.id}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setPlacing(false);
    }
  };

  if (items.length === 0) {
    return (
      <EmptyState
        title="Nothing to check out"
        description="Your cart is empty."
        action={<Link to="/products" className="btn btn-primary">Browse products</Link>}
      />
    );
  }

  return (
    <div>
      <div className="page-header">
        <h1>Checkout</h1>
      </div>

      <div className="card" data-testid="checkout-summary">
        <h2 className="section-title">Order summary</h2>
        <table className="data-table">
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td>{item.productName} × {item.quantity}</td>
                <td className="line-total">${(item.price * item.quantity).toFixed(2)}</td>
              </tr>
            ))}
            <tr className="table-total-row">
              <td>Total</td>
              <td data-testid="checkout-total">${cart.total.toFixed(2)}</td>
            </tr>
          </tbody>
        </table>

        <p className="muted mt-6">Payment method: Cash on Delivery (COD)</p>

        {error && <div className="form-error" data-testid="checkout-error">{error}</div>}

        <button
          type="button"
          className="btn btn-primary mt-6"
          onClick={handlePlaceOrder}
          disabled={placing}
          data-testid="place-order-button"
        >
          {placing ? 'Placing order…' : 'Place order (COD)'}
        </button>
      </div>
    </div>
  );
}
