import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AuthForm from './pages/AuthForm';
import Home from './pages/Home';
import Inicio from './pages/Inicio';
import Inmuebles from './pages/Inmuebles';


// Componente para proteger rutas
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/" replace />;
  }
  return children;
};

function AppRouter() {
  return (
    <Routes>
      {/* Ruta pública para autenticación */}
      <Route path="/" element={<AuthForm />} />
      
      {/* Nueva ruta para Inicio */}
      <Route path="/inicio" element={<Inicio />} />
      <Route path="/inmuebles" element={<Inmuebles />} />
      <Route path="/home" element={<Home />} />
      
    </Routes>
  );
}

export default AppRouter;