import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { useCart } from '../context/CartContext.jsx';

export default function Header() {
  const { isAuthenticated, isAdmin, user, logout } = useAuth();
  const { itemCount } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/products');
  };

  return (
    <header className="site-header">
      <div className="site-header-inner">
        <NavLink to="/products" className="brand" data-testid="brand-link">
          ShopFlow
        </NavLink>

        <nav className="site-nav" aria-label="Main">
          <NavLink to="/products" data-testid="nav-products">Products</NavLink>
          {isAuthenticated && (
            <>
              <NavLink to="/cart" className="cart-link" data-testid="nav-cart">
                Cart
                {itemCount > 0 && (
                  <span className="cart-badge" data-testid="cart-count">{itemCount}</span>
                )}
              </NavLink>
              <NavLink to="/orders" data-testid="nav-orders">Orders</NavLink>
            </>
          )}
          {isAdmin && (
            <>
              <NavLink to="/admin/products" data-testid="nav-admin-products">Manage products</NavLink>
              <NavLink to="/admin/orders" data-testid="nav-admin-orders">Manage orders</NavLink>
            </>
          )}
        </nav>

        <div className="nav-spacer" />

        {isAuthenticated ? (
          <div className="user-menu">
            <span className="user-name" data-testid="nav-user-name">{user.name}</span>
            <button
              type="button"
              className="btn btn-secondary btn-small"
              onClick={handleLogout}
              data-testid="logout-button"
            >
              Log out
            </button>
          </div>
        ) : (
          <div className="user-menu">
            <NavLink to="/login" data-testid="nav-login">Log in</NavLink>
            <NavLink to="/register" className="btn btn-primary btn-small" data-testid="nav-register">
              Sign up
            </NavLink>
          </div>
        )}
      </div>
    </header>
  );
}
