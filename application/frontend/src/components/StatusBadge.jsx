const LABELS = {
  PLACED: 'Placed',
  CONFIRMED: 'Confirmed',
  SHIPPED: 'Shipped',
  DELIVERED: 'Delivered',
  CANCELLED: 'Cancelled',
};

export default function StatusBadge({ status }) {
  const className = `badge badge-${status?.toLowerCase()}`;
  return (
    <span className={className} data-testid="order-status-badge">
      {LABELS[status] ?? status}
    </span>
  );
}
