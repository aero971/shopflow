import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="empty-state" data-testid="not-found-page">
      <h3>Page not found</h3>
      <p>There's nothing at this address.</p>
      <Link to="/products" className="btn btn-primary">Back to products</Link>
    </div>
  );
}
