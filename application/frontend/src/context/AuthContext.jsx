import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import * as authApi from '../api/authApi.js';

const AuthContext = createContext(null);
const STORAGE_KEY = 'shopflow_auth';

function loadStoredAuth() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(loadStoredAuth);

  const persist = useCallback((value) => {
    setAuth(value);
    if (value) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  // LoginResponse from the backend: { token, userId, name, email, role }
  const login = useCallback(async (email, password) => {
    const response = await authApi.login({ email, password });
    const nextAuth = {
      token: response.token,
      user: {
        id: response.userId,
        name: response.name,
        email: response.email,
        role: response.role,
      },
    };
    persist(nextAuth);
    return nextAuth;
  }, [persist]);

  // Registration does not log the user in - it returns a UserResponse,
  // not a token - so the caller is expected to route to /login after.
  const register = useCallback((name, email, password, address) => {
    return authApi.register({ name, email, password, address });
  }, []);

  const logout = useCallback(() => {
    persist(null);
  }, [persist]);

  const value = useMemo(() => ({
    token: auth?.token ?? null,
    user: auth?.user ?? null,
    isAuthenticated: Boolean(auth?.token),
    isAdmin: auth?.user?.role === 'ADMIN',
    login,
    register,
    logout,
  }), [auth, login, register, logout]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
