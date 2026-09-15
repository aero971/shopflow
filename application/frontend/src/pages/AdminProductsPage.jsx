import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { useToast } from '../context/ToastContext.jsx';
import * as productApi from '../api/productApi.js';

const BLANK_FORM = { name: '', description: '', price: '', stock: '' };

export default function AdminProductsPage() {
  const { token } = useAuth();
  const { show } = useToast();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(BLANK_FORM);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);

  const loadProducts = () => {
    setLoading(true);
    return productApi.getProducts()
      .then(setProducts)
      .finally(() => setLoading(false));
  };

  useEffect(() => { loadProducts(); }, []);

  const startCreate = () => {
    setEditingId(null);
    setForm(BLANK_FORM);
    setError(null);
  };

  const startEdit = (product) => {
    setEditingId(product.id);
    setForm({
      name: product.name,
      description: product.description,
      price: String(product.price),
      stock: String(product.stock),
    });
    setError(null);
  };

  const update = (field) => (event) =>
    setForm((current) => ({ ...current, [field]: event.target.value }));

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    setSaving(true);
    const payload = {
      name: form.name,
      description: form.description,
      price: Number(form.price),
      stock: Number(form.stock),
    };
    try {
      if (editingId) {
        await productApi.updateProduct(token, editingId, payload);
        show('Product updated.', 'success');
      } else {
        await productApi.createProduct(token, payload);
        show('Product created.', 'success');
      }
      startCreate();
      await loadProducts();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (product) => {
    if (!window.confirm(`Delete "${product.name}"? This cannot be undone.`)) return;
    try {
      await productApi.deleteProduct(token, product.id);
      show('Product deleted.', 'info');
      if (editingId === product.id) startCreate();
      await loadProducts();
    } catch (err) {
      show(err.message, 'error');
    }
  };

  return (
    <div>
      <div className="page-header">
        <h1>Manage products</h1>
      </div>

      <div className="card" data-testid="admin-product-form-card">
        <h2 className="section-title">{editingId ? `Edit product #${editingId}` : 'New product'}</h2>
        <form className="form" onSubmit={handleSubmit} data-testid="admin-product-form">
          {error && <div className="form-error" data-testid="admin-product-error">{error}</div>}

          <div className="form-field">
            <label htmlFor="p-name">Name</label>
            <input id="p-name" required value={form.name} onChange={update('name')} data-testid="admin-product-name" />
          </div>

          <div className="form-field">
            <label htmlFor="p-description">Description</label>
            <textarea id="p-description" required rows={3} value={form.description} onChange={update('description')} data-testid="admin-product-description" />
          </div>

          <div className="form-field">
            <label htmlFor="p-price">Price</label>
            <input id="p-price" type="number" step="0.01" min="0.01" required value={form.price} onChange={update('price')} data-testid="admin-product-price" />
          </div>

          <div className="form-field">
            <label htmlFor="p-stock">Stock</label>
            <input id="p-stock" type="number" step="1" min="0" required value={form.stock} onChange={update('stock')} data-testid="admin-product-stock" />
          </div>

          <div className="flex-between">
            <button type="submit" className="btn btn-primary" disabled={saving} data-testid="admin-product-submit">
              {saving ? 'Saving…' : editingId ? 'Save changes' : 'Create product'}
            </button>
            {editingId && (
              <button type="button" className="btn btn-secondary" onClick={startCreate} data-testid="admin-product-cancel">
                Cancel edit
              </button>
            )}
          </div>
        </form>
      </div>

      <h2 className="section-title mt-6">Catalog</h2>
      {loading && <p className="muted">Loading products…</p>}

      {!loading && (
        <table className="data-table" data-testid="admin-product-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Stock</th>
              <th aria-label="Actions" />
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} data-testid="admin-product-row">
                <td>{product.name}</td>
                <td>${product.price.toFixed(2)}</td>
                <td>{product.stock}</td>
                <td>
                  <button type="button" className="btn-link" onClick={() => startEdit(product)} data-testid="admin-product-edit">
                    Edit
                  </button>
                  {' · '}
                  <button
                    type="button"
                    className="btn-link"
                    style={{ color: 'var(--danger)' }}
                    onClick={() => handleDelete(product)}
                    data-testid="admin-product-delete"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
