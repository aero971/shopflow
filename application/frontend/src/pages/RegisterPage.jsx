import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { useToast } from '../context/ToastContext.jsx';

export default function RegisterPage() {
  const { register } = useAuth();
  const { show } = useToast();
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: '', email: '', password: '', address: '' });
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const update = (field) => (event) =>
    setForm((current) => ({ ...current, [field]: event.target.value }));

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await register(form.name, form.email, form.password, form.address);
      // Registration returns a UserResponse, not a token - the backend
      // never logs a newly registered user in, so send them to /login.
      show('Account created — log in to continue.', 'success');
      navigate('/login');
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <div className="page-header">
        <h1>Create your account</h1>
      </div>

      <form className="form" onSubmit={handleSubmit} data-testid="register-form">
        {error && <div className="form-error" data-testid="register-error">{error}</div>}

        <div className="form-field">
          <label htmlFor="name">Full name</label>
          <input id="name" required value={form.name} onChange={update('name')} data-testid="register-name" />
        </div>

        <div className="form-field">
          <label htmlFor="reg-email">Email</label>
          <input
            id="reg-email"
            type="email"
            required
            value={form.email}
            onChange={update('email')}
            data-testid="register-email"
          />
        </div>

        <div className="form-field">
          <label htmlFor="reg-password">Password</label>
          <input
            id="reg-password"
            type="password"
            required
            value={form.password}
            onChange={update('password')}
            data-testid="register-password"
          />
        </div>

        <div className="form-field">
          <label htmlFor="address">Address</label>
          <input id="address" required value={form.address} onChange={update('address')} data-testid="register-address" />
        </div>

        <button
          type="submit"
          className="btn btn-primary btn-block"
          disabled={submitting}
          data-testid="register-submit"
        >
          {submitting ? 'Creating account…' : 'Create account'}
        </button>

        <p className="form-footnote">
          Already have an account? <Link to="/login" data-testid="go-to-login">Log in</Link>
        </p>
      </form>
    </div>
  );
}
