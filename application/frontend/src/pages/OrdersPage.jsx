import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import * as orderApi from '../api/orderApi.js';
import StatusBadge from '../components/StatusBadge.jsx';
import EmptyState from '../components/EmptyState.jsx';

export default function OrdersPage() {
  const { token } = useAuth();
  const [orders, setOrders] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    orderApi.getOrders(token)
      .then(setOrders)
      .catch((err) => setError(err.message));
  }, [token]);

  return (
    <div>
      <div className="page-header">
        <h1>Your orders</h1>
      </div>

      {error && <div className="form-error" data-testid="orders-error">{error}</div>}
      {!orders && !error && <p className="muted">Loading orders…</p>}

      {orders && orders.length === 0 && (
        <EmptyState
          title="No orders yet"
          description="Orders you place will show up here."
          action={<Link to="/products" className="btn btn-primary">Browse products</Link>}
        />
      )}

      {orders && orders.length > 0 && (
        <table className="data-table" data-testid="orders-table">
          <thead>
            <tr>
              <th>Order</th>
              <th>Placed</th>
              <th>Status</th>
              <th>Items</th>
              <th>Total</th>
              <th aria-label="View" />
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} data-testid="order-row">
                <td>#{order.id}</td>
                <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                <td><StatusBadge status={order.status} /></td>
                <td>{order.items.reduce((sum, i) => sum + i.quantity, 0)}</td>
                <td className="line-total">${order.total.toFixed(2)}</td>
                <td>
                  <Link to={`/orders/${order.id}`} data-testid="view-order-link">View</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
