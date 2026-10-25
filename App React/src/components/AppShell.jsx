import { NavLink, Navigate, useNavigate } from 'react-router-dom';
import { FiGrid, FiShoppingBag, FiShoppingCart, FiUser, FiLogOut, FiArrowUpRight } from 'react-icons/fi';
import { authApi } from '../api-conexion/index';
import MiLogo from '../assets/logo-login.svg';
import '../styles/finann.css';

const enlaces = [
  { ruta: '/home', texto: 'Inicio', Icono: FiGrid },
  { ruta: '/compras', texto: 'Compras', Icono: FiShoppingCart },
  { ruta: '/ventas', texto: 'Ventas', Icono: FiShoppingBag },
  { ruta: '/MiPerfil', texto: 'Mi perfil', Icono: FiUser },
];
export default function AppShell({ children, titulo = 'Mi espacio' }) {
  const navigate = useNavigate();
  const nombre = localStorage.getItem('usuarioName');
  const id = localStorage.getItem('usuarioId');
  if (!nombre || !id) return <Navigate to="/login" replace />;
  function cerrarSesion() {
    authApi.cerrarSesion();
    localStorage.removeItem('usuarioId');
    localStorage.removeItem('usuarioName');
    navigate('/login', { replace: true });
  }
  return <div className="finann-ui min-h-dvh bg-canvas">
    <a href="#contenido-principal" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-xl focus:bg-white focus:p-3">Saltar al contenido</a>
    <aside className="fixed inset-y-0 left-0 z-20 hidden w-60 flex-col border-r border-stroke bg-white px-5 py-7 lg:flex" aria-label="Navegación principal">
      <NavLink to="/home" className="mb-10 flex items-center gap-2 px-2" aria-label="FINANN · Inicio"><img src={MiLogo} alt="" className="size-11 object-contain" /><span className="text-lg font-bold tracking-[0.15em] text-ink">FIN<span className="text-brand-700">ANN</span></span></NavLink>
      <p className="px-3 text-[11px] font-semibold tracking-widest text-subtle uppercase">Mi negocio</p>
      <nav className="mt-3 grid gap-2">{enlaces.map(({ ruta, texto, Icono }) => <NavLink key={ruta} to={ruta} className="fn-nav-link"><Icono className="size-5 shrink-0" aria-hidden="true" />{texto}</NavLink>)}</nav>
      <div className="mt-auto border-t border-stroke pt-5"><p className="px-3 text-xs leading-5 text-subtle">Tu negocio,<br />en orden.</p><button type="button" onClick={cerrarSesion} className="fn-nav-link mt-4 w-full"><FiLogOut className="size-5" aria-hidden="true" />Cerrar sesión</button></div>
    </aside>
    <div className="lg:pl-60">
      <header className="border-b border-stroke bg-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-4 sm:px-8 lg:px-10">
          <div><p className="text-[11px] font-semibold tracking-[0.16em] text-brand-800 uppercase lg:hidden">FINANN</p><p className="text-sm font-medium text-subtle">{titulo}</p></div>
          <NavLink to="/MiPerfil" className="flex max-w-full min-w-0 items-center gap-2 rounded-xl text-sm" aria-label={`Abrir el perfil de ${nombre}`}><span className="max-w-40 truncate font-medium sm:max-w-60">{nombre}</span><span className="grid size-9 shrink-0 place-items-center rounded-xl bg-brand-50 text-xs font-semibold text-brand-800">{nombre.trim().slice(0, 2).toUpperCase()}</span><FiArrowUpRight className="hidden size-4 text-subtle sm:block" aria-hidden="true" /></NavLink>
        </div>
        <nav className="flex gap-1 overflow-x-auto border-t border-stroke px-3 py-2 lg:hidden" aria-label="Navegación principal">{enlaces.map(({ ruta, texto, Icono }) => <NavLink key={ruta} to={ruta} className={({ isActive }) => `flex min-h-11 flex-1 items-center justify-center gap-1.5 rounded-lg px-2 text-xs whitespace-nowrap ${isActive ? 'bg-brand-50 font-semibold text-brand-800' : 'text-subtle'}`}><Icono className="size-4 shrink-0" aria-hidden="true" />{texto}</NavLink>)}</nav>
      </header>
      <main id="contenido-principal" className="mx-auto w-full max-w-7xl px-4 py-7 sm:px-8 sm:py-9 lg:px-10">{children}</main>
      <footer className="mx-auto max-w-7xl px-4 pb-6 text-center text-xs text-subtle sm:px-8 lg:text-left">FINANN · Tu negocio, en orden.<button type="button" onClick={cerrarSesion} className="ml-3 inline-flex min-h-11 items-center text-xs font-medium text-brand-800 underline underline-offset-4 lg:hidden">Cerrar sesión</button></footer>
    </div>
  </div>;
}
