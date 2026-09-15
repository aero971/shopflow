export default function EmptyState({ title, description, action }) {
  return (
    <div className="empty-state" data-testid="empty-state">
      <h3>{title}</h3>
      {description && <p>{description}</p>}
      {action}
    </div>
  );
}
