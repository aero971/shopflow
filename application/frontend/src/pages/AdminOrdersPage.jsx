import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { useToast } from '../context/ToastContext.jsx';
import * as orderApi from '../api/orderApi.js';
import StatusBadge from '../components/StatusBadge.jsx';

const STATUSES = ['PLACED', 'CONFIRMED', 'SHIPPED', 'DELIVERED', 'CANCELLED'];

export default function AdminOrdersPage() {
  const { token } = useAuth();
  const { show } = useToast();
  const [orders, setOrders] = useState(null);
  const [error, setError] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);

  const loadOrders = () => {
    orderApi.getAllOrdersAdmin(token)
      .then(setOrders)
      .catch((err) => setError(err.message));
  };

  useEffect(loadOrders, [token]);

  const handleStatusChange = async (orderId, status) => {
    setUpdatingId(orderId);
    try {
      await orderApi.updateOrderStatusAdmin(token, orderId, status);
      show(`Order #${orderId} marked ${status.toLowerCase()}.`, 'success');
      loadOrders();
    } catch (err) {
      show(err.message, 'error');
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div>
      <div className="page-header">
        <h1>Manage orders</h1>
      </div>

      {/*
        Known gap: OrderResponse doesn't currently include the customer's
        name/email, so this table can't show who placed each order. Add
        that field to the backend's Order/OrderResponse if that's needed.
      */}
      <p className="muted">Orders are listed without customer details — see note in the project summary.</p>

      {error && <div className="form-error" data-testid="admin-orders-error">{error}</div>}
      {!orders && !error && <p className="muted">Loading orders…</p>}

      {orders && (
        <table className="data-table mt-6" data-testid="admin-orders-table">
          <thead>
            <tr>
              <th>Order</th>
              <th>Placed</th>
              <th>Total</th>
              <th>Status</th>
              <th>Update status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} data-testid="admin-order-row">
                <td>#{order.id}</td>
                <td>{new Date(order.createdAt).toLocaleString()}</td>
                <td className="line-total">${order.total.toFixed(2)}</td>
                <td><StatusBadge status={order.status} /></td>
                <td>
                  <select
                    value={order.status}
                    disabled={updatingId === order.id}
                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                    data-testid="admin-order-status-select"
                  >
                    {STATUSES.map((status) => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
