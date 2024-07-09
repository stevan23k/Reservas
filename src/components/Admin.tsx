import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Funciones/AuthContext'; 

export const Admin = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(`https://reservasbackend-production.up.railway.app/login`, { 
        username,
        password,
      });
      const { token } = response.data;
      localStorage.setItem('token', token);
      login();
      navigate('/list');
    } catch (error) {
      console.error('Error de inicio de sesión:', error);
      setError('Usuario o Contraseña Incorrectos');
    }
  };

  return (
    <div className="d-flex justify-content-center">
      <div>
        <h1 className="d-flex mb-5">Inicie sesión</h1>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="form-control mb-3"
            placeholder="Nombre de usuario"
          />
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-control"
            placeholder="Contraseña"
          />
          <button
            type="submit"
            className="btn btn-primary mt-3"
            disabled={username.length === 0 || !password}
          >
            Iniciar sesión
          </button>
          {error && <p className="mt-3 text-danger">{error}</p>}
        </form>
      </div>
    </div>
  );
};