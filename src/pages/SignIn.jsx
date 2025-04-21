import React, { useState } from 'react';
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import jwtDecode from 'jwt-decode';

const SignIn = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const { setAuth } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/user/login', credentials);

      const { token, role } = res.data;
      const userRole = Array.isArray(role) ? role[0] : role;

      const decoded = jwtDecode(token);
      const userId = decoded.sub;
      const clientId = decoded.client_id;

      localStorage.setItem('token', token);
      localStorage.setItem('role', userRole);
      localStorage.setItem('userId', userId);
      localStorage.setItem('clientId', clientId);

      setAuth({
        token,
        role: userRole,
        isAuthenticated: true,
        loading: false
      });

      navigate('/admin/projects');
    } catch (err) {
      console.error("Login failed", err);
      setError("Fel användarnamn eller lösenord");
    }
  };

  return (
    <div className="centered-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Logga in</h2>
        <input
          type="email"
          name="email"
          placeholder="E-post"
          value={credentials.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Lösenord"
          value={credentials.password}
          onChange={handleChange}
          required
        />
        {error && <div className="field-validation-error">{error}</div>}
        <button type="submit" className="btn btn-submit">Logga in</button>
      </form>
    </div>
  );
};

export default SignIn;

