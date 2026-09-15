import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import { useToast } from '../context/ToastContext.jsx';
import QuantityStepper from '../components/QuantityStepper.jsx';
import EmptyState from '../components/EmptyState.jsx';

export default function CartPage() {
  const { cart, loading, updateItem, removeItem, clear } = useCart();
  const { show } = useToast();
  const navigate = useNavigate();

  const handleQuantityChange = async (productId, quantity) => {
    try {
      await updateItem(productId, quantity);
    } catch (err) {
      show(err.message, 'error');
    }
  };

  const handleRemove = async (productId, name) => {
    try {
      await removeItem(productId);
      show(`Removed ${name} from your cart.`, 'info');
    } catch (err) {
      show(err.message, 'error');
    }
  };

  const handleClear = async () => {
    try {
      await clear();
      show('Cart cleared.', 'info');
    } catch (err) {
      show(err.message, 'error');
    }
  };

  if (loading && !cart) {
    return <p className="muted">Loading your cart…</p>;
  }

  const items = cart?.items ?? [];

  return (
    <div>
      <div className="page-header">
        <h1>Your cart</h1>
      </div>

      {items.length === 0 ? (
        <EmptyState
          title="Your cart is empty"
          description="Add a few products to get started."
          action={<Link to="/products" className="btn btn-primary" data-testid="empty-cart-browse">Browse products</Link>}
        />
      ) : (
        <>
          <table className="data-table" data-testid="cart-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Subtotal</th>
                <th aria-label="Remove" />
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} data-testid="cart-item" data-product-id={item.productId}>
                  <td data-testid="cart-item-name">{item.productName}</td>
                  <td>${item.price.toFixed(2)}</td>
                  <td>
                    <QuantityStepper
                      value={item.quantity}
                      onChange={(qty) => handleQuantityChange(item.productId, qty)}
                    />
                  </td>
                  <td className="line-total" data-testid="cart-item-subtotal">
                    ${(item.price * item.quantity).toFixed(2)}
                  </td>
                  <td>
                    <button
                      type="button"
                      className="btn-link"
                      onClick={() => handleRemove(item.productId, item.productName)}
                      data-testid="cart-item-remove"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
              <tr className="table-total-row">
                <td colSpan={3}>Total</td>
                <td data-testid="cart-total">${cart.total.toFixed(2)}</td>
                <td />
              </tr>
            </tbody>
          </table>

          <div className="flex-between mt-6">
            <button type="button" className="btn btn-secondary" onClick={handleClear} data-testid="clear-cart-button">
              Clear cart
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => navigate('/checkout')}
              data-testid="checkout-button"
            >
              Proceed to checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}
