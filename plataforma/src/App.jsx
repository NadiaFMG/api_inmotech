import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import Navigation from './components/common/Navigation';
import AuthForm from './pages/AuthForm';
import Inicio from './pages/Inicio';
import Inmuebles from './pages/Inmuebles';
import InmuebleDetalle from './pages/InmuebleDetalle';
import Buscar from './pages/Buscar';
import Contacto from './pages/Contacto';
import SobreNosotros from './pages/SobreNosotros';
import TerminosCondiciones from './pages/TerminosCondiciones';
import PoliticaPrivacidad from './pages/PoliticaPrivacidad';
import PreguntasFrecuentes from './pages/PreguntasFrecuentes';
import AdminLayout from './components/admin/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import AdminProperties from './pages/admin/AdminProperties';
import CreateProperty from './pages/admin/CreateProperty';
import VenderInmueble from './pages/VenderInmueble';
import EditProperty from './pages/admin/EditProperty';
import Visualizations from './pages/admin/Visualizations';
import Usuarios from './pages/admin/Usuarios';
import CarruselAdmin from './pages/admin/CarruselAdmin';
import PreguntasFrecuentesAdmin from './pages/admin/PreguntasFrecuentesAdmin';
import SobreNosotrosAdmin from './pages/admin/SobreNosotrosAdmin';
import TerminosCondicionesAdmin from './pages/admin/TerminosCondicionesAdmin';
import PorqueElegirnosAdmin from './pages/admin/PorqueElegirnosAdmin';
import PoliticaPrivacidadAdmin from './pages/admin/PoliticaPrivacidadAdmin';
import PerfilAdmin from './pages/Perfil.jsx';
import './styles/Navigation.css';
import './styles/admin.css';
import Footer from './components/common/Footer';
import './styles/Footer.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* Ruta de autenticación (login/registro) */}
        <Route path="/" element={<AuthForm />} />
        <Route path="/inmueble/:id" element={<InmuebleDetalle />} />
        <Route path="/terminoscondiciones" element={<TerminosCondiciones />} />
        <Route path="/politicaprivacidad" element={<PoliticaPrivacidad />} />
        <Route path="/faq" element={<PreguntasFrecuentes />} />

        {/* Public routes with Navigation and Footer */}
        <Route path="/inicio" element={
          <div className="d-flex flex-column min-vh-100">
            <Navigation />
            <main className="flex-grow-1">
              <Outlet />
            </main>
            <Footer />
          </div>
        }>
          <Route path="inicio" element={<Inicio />} />
          <Route path="inmuebles" element={<Inmuebles />} />
          <Route path="buscar" element={<Buscar />} />
          <Route path="venderinmueble" element={<VenderInmueble />} />
          <Route path="contacto" element={<Contacto />} />
          <Route path="sobrenosotros" element={<SobreNosotros />} />
        </Route>

        {/* Admin routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="inmuebles" element={<AdminProperties />} />
          <Route path="/admin/perfil" element={<PerfilAdmin />} />
          <Route path="inmuebles/crear" element={<CreateProperty />} />
          <Route path="inmuebles/editar/:id" element={<EditProperty />} />
          <Route path="visualizaciones" element={<Visualizations />} />
          <Route path="usuarios" element={<Usuarios />} />
          <Route path="carrusel" element={<CarruselAdmin />} />
          <Route path="preguntasfrecuentes" element={<PreguntasFrecuentesAdmin />} />
          <Route path="sobrenosotros" element={<SobreNosotrosAdmin />} />
          <Route path="terminosycondiciones" element={<TerminosCondicionesAdmin />} />
          <Route path="porqueelegirnos" element={<PorqueElegirnosAdmin />} />
          <Route path="politicadeprivacidad" element={<PoliticaPrivacidadAdmin />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;