import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import * as orderApi from '../api/orderApi.js';
import StatusBadge from '../components/StatusBadge.jsx';

export default function OrderDetailPage() {
  const { id } = useParams();
  const { token } = useAuth();
  const [order, setOrder] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    setOrder(null);
    setError(null);
    orderApi.getOrder(token, id)
      .then(setOrder)
      .catch((err) => setError(err.message));
  }, [token, id]);

  if (error) {
    return (
      <div>
        <div className="form-error" data-testid="order-detail-error">{error}</div>
        <p className="mt-6"><Link to="/orders">Back to your orders</Link></p>
      </div>
    );
  }

  if (!order) {
    return <p className="muted">Loading order…</p>;
  }

  return (
    <div>
      <div className="page-header">
        <h1>Order #{order.id}</h1>
        <StatusBadge status={order.status} />
      </div>

      <div className="card" data-testid="order-detail">
        <p className="muted">
          Placed {new Date(order.createdAt).toLocaleString()} · Payment: {order.paymentMethod}
        </p>

        <table className="data-table mt-6">
          <thead>
            <tr>
              <th>Product</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {order.items.map((item) => (
              <tr key={item.id} data-testid="order-item-row">
                <td>{item.productName}</td>
                <td>{item.quantity}</td>
                <td>${item.price.toFixed(2)}</td>
                <td className="line-total">${(item.price * item.quantity).toFixed(2)}</td>
              </tr>
            ))}
            <tr className="table-total-row">
              <td colSpan={3}>Total</td>
              <td data-testid="order-detail-total">${order.total.toFixed(2)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
