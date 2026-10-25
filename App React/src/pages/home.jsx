import { useNavigate } from 'react-router-dom';
import { FiShoppingCart, FiUsers, FiShoppingBag, FiFileText, FiCreditCard, FiBox, FiBookOpen, FiBarChart2, FiArrowUpRight, FiUser } from 'react-icons/fi';
import AppShell from '../components/AppShell';

const modulos = [
  { titulo: 'Compras', detalle: 'Registra tus compras y proveedores.', Icono: FiShoppingCart, ruta: '/compras' },
  { titulo: 'Ventas', detalle: 'Organiza tus ventas del día.', Icono: FiShoppingBag, ruta: '/ventas' },
  { titulo: 'Clientes', detalle: 'La información de tus clientes.', Icono: FiUsers },
  { titulo: 'Inventario', detalle: 'Consulta y organiza tus productos.', Icono: FiBox },
  { titulo: 'Facturas', detalle: 'Tus documentos en un solo lugar.', Icono: FiFileText },
  { titulo: 'Cobros', detalle: 'Da seguimiento a tus pagos.', Icono: FiCreditCard },
  { titulo: 'Planilla', detalle: 'Organiza la información de tu equipo.', Icono: FiBookOpen },
  { titulo: 'Reportes', detalle: 'Una visión más clara de tu negocio.', Icono: FiBarChart2 },
];
 function Home() {
  const navigate = useNavigate();
  const nombre = localStorage.getItem('usuarioName') || '';
  return <AppShell titulo="Inicio">
    <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
      <div>
        <p className="mb-2 text-xs font-semibold tracking-widest text-brand-800 uppercase">Tu espacio de trabajo</p>
        <h1 className="fn-page-title break-words">Hola, {nombre}</h1>
        <p className="fn-caption mt-2">¿Qué quieres gestionar hoy?</p>
      </div>
      <button type="button" onClick={() => navigate('/MiPerfil')} className="fn-secondary">
        <FiUser className="size-4" aria-hidden="true" />Mi perfil</button>
    </div>

    <section aria-labelledby="modulos-titulo" >
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2 ">
        <h2 id="modulos-titulo" className="text-sm font-semibold">Gestiona tu negocio</h2>
        <span className="text-xs text-subtle">Todo comienza aquí</span>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4">
          {modulos.map(({ titulo, detalle, Icono, ruta }) => 
          <button key={titulo} className="fn-module group" 
                  disabled={!ruta} onClick={() => ruta && navigate(ruta)} 
                  type="button" aria-label={`${titulo}${ruta ? '' : ', próximamente'}`}>
              <div className="mb-5 flex w-full items-start justify-between gap-2 ">
                  <span className={`grid size-11 place-items-center rounded-xl ${ruta ? 'bg-brand-50 text-brand-800' : 'bg-canvas text-subtle'}`}>
                    <Icono className="size-5" aria-hidden="true" />
                  </span>
                  {ruta ? <FiArrowUpRight className="size-4 text-subtle" aria-hidden="true" /> : <span className="pt-1 text-[10px] text-subtle sm:text-[11px]">Próximamente</span>}
              </div>
              <h3 className="text-sm font-semibold sm:text-base">{titulo}</h3>
              <p className="mt-1.5 text-xs leading-5 text-subtle">{detalle}</p>
          </button>)}
      </div>
     </section>
    <section className="mt-7 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-brand-200 bg-brand-50 px-5 py-5 sm:px-6">
      <div>
        <h2 className="text-sm font-semibold text-brand-900">Tu cuenta, siempre a mano</h2>
        <p className="mt-1 text-sm text-brand-800">Consulta tu información y las opciones de tu perfil.</p>
        </div>
        <button type="button" onClick={() => navigate('/MiPerfil')} 
                className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-brand-800">
                  Ir a mi perfil
                  <FiArrowUpRight className="size-4" aria-hidden="true" />
        </button>
    </section>
  </AppShell>;
}
export default Home;
