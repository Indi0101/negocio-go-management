import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './pages/login.jsx';
import Home from './pages/home.jsx';
import Compras from './pages/compras.jsx';
import Ventas from './pages/ventas.jsx';
import MiPerfil from './pages/miPerfil.jsx';
import AppShell from './components/AppShell.jsx';

export default function App() {
  return <BrowserRouter><Routes>
    <Route path="/" element={<Login />} />
    <Route path="/login" element={<Login />} />
    <Route path="/home" element={<Home />} />
    <Route path="/compras" element={<Compras />} />
    <Route path="/ventas" element={<Ventas />} />
    <Route path="/MiPerfil" element={<AppShell titulo="Mi perfil"><p className="mb-5 text-xs text-subtle">Vista previa del perfil · Datos de ejemplo</p><MiPerfil demo /></AppShell>} />
  </Routes></BrowserRouter>;
}
