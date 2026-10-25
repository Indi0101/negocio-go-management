import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiEye, FiEyeOff, FiArrowRight, FiShield, FiShoppingCart, FiBox, FiBarChart2 } from 'react-icons/fi';
import { authApi } from '../api-conexion/index';
import MiLogo from '../assets/logo-login.svg';
import '../styles/finann.css';

 function Login() {
  const [datos, setDatos] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);
  const [mostrar, setMostrar] = useState(false);
  const [ayuda, setAyuda] = useState(false);
  const navigate = useNavigate();

  async function entrar(event) {
    event.preventDefault(); 
    if (cargando) return;
    setError(''); 
    setCargando(true);
    try {
      const respuesta = await authApi.login({ username: datos.username.trim(), password: datos.password });
      if (respuesta.id == null || !respuesta.nombre) { 
        throw new Error('No se recibieron los datos del usuario.');
      }
      localStorage.setItem('usuarioId', String(respuesta.id));
      localStorage.setItem('usuarioName', respuesta.nombre);
      navigate('/home', { replace: true });

    } catch (err) 
    { setError(err.message || 'No pudimos iniciar sesión. Inténtalo de nuevo.'); }
    finally { 
      setCargando(false);
     }
  }
  return <main className="finann-ui grid min-h-dvh bg-canvas lg:grid-cols-2">
    <section className="hidden flex-col justify-between bg-brand-900 p-12 text-white lg:flex xl:p-16" aria-label="Bienvenido a FINANN">
      <div className="flex items-center gap-3">
        <span className="grid size-12 place-items-center rounded-2xl bg-white">
          <img src={MiLogo} alt="" className="size-10" />
        </span>
        <span className="text-xl font-semibold tracking-[0.18em]">FINANN</span>
        </div>
      <div className="my-12 max-w-lg">
          <p className="mb-5 text-xs font-medium tracking-[0.2em] text-brand-200 uppercase">
            Menos vueltas. Más claridad.</p>
          <h1 className="text-4xl leading-tight font-semibold tracking-tight xl:text-5xl">
            Tu negocio,<br />
            <span className="text-brand-200">en orden.</span>
          </h1>
          <p className="mt-6 max-w-sm text-base leading-7 text-brand-100">
            Un mismo espacio para organizar tus operaciones y dedicarle tiempo a lo que importa.
          </p>
          <div className="mt-10 grid gap-4">
            {[
              { Icono: FiShoppingCart, titulo: 'Compras y ventas', texto: 'Las operaciones de tu día a día.' }
              , { Icono: FiBox, titulo: 'Inventario', texto: 'Tus productos, siempre a la vista.' }
              , { Icono: FiBarChart2, titulo: 'Reportes', texto: 'Información para decidir mejor.' }
            ].map(({ Icono, titulo, texto }) => 
                  <div key={titulo} className="flex items-center gap-4">
                    <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-white/15 bg-white/5">
                      <Icono className="size-5" aria-hidden="true" />
                    </span>
                    <div>
                      <p className="text-sm font-medium">{titulo}</p>
                      <p className="mt-1 text-xs text-brand-100">{texto}</p>
                    </div>
                  </div>)}
          </div>
       </div>
      <p className="text-xs text-brand-100">FINANN · Gestión simple, todos los días.</p>
    </section>
    
    <section className="flex flex-col items-center justify-center px-4 py-10 sm:px-10 lg:px-12">
      <div className="mb-7 flex items-center gap-2 lg:hidden"><img src={MiLogo} alt="" className="size-11" /><span className="text-lg font-bold tracking-[0.15em]">FIN<span className="text-brand-700">ANN</span></span></div>
      <div className="fn-panel w-full max-w-md p-6 sm:p-9 lg:border-0 lg:bg-transparent lg:p-0">
        <span className="mb-5 inline-flex rounded-full bg-brand-50 px-3 py-1.5 text-xs font-medium text-brand-800">Bienvenido a FINANN</span><h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">Inicia sesión</h2><p className="fn-caption mt-3">Ingresa tus datos para continuar a tu espacio de trabajo.</p>
        <form className="mt-8 space-y-5" onSubmit={entrar} aria-busy={cargando}>
          <div><label htmlFor="login-usuario" className="fn-label">Usuario</label><input id="login-usuario" name="username" className="fn-field" autoComplete="username" required maxLength={50} value={datos.username} onChange={e => setDatos({ ...datos, username: e.target.value })} placeholder="Escribe tu usuario" disabled={cargando} /></div>
          <div><label htmlFor="login-clave" className="fn-label">Contraseña</label><div className="relative"><input id="login-clave" name="password" type={mostrar ? 'text' : 'password'} className="fn-field pr-14" autoComplete="current-password" required value={datos.password} onChange={e => setDatos({ ...datos, password: e.target.value })} placeholder="Escribe tu contraseña" disabled={cargando} /><button type="button" className="absolute top-1 right-1 grid size-10 place-items-center rounded-lg text-subtle hover:bg-brand-50" onClick={() => setMostrar(!mostrar)} aria-label={mostrar ? 'Ocultar contraseña' : 'Mostrar contraseña'} aria-pressed={mostrar}>{mostrar ? <FiEyeOff className="size-5" /> : <FiEye className="size-5" />}</button></div></div>
          {error && <p role="alert" className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-800">{error}</p>}
          <button className="fn-primary w-full" type="submit" disabled={cargando}>{cargando ? 'Iniciando sesión…' : 'Entrar'}{!cargando && <FiArrowRight className="size-4" aria-hidden="true" />}</button>
        </form>
        <div className="mt-4 text-center"><button type="button" className="min-h-11 text-sm font-medium text-brand-800 underline-offset-4 hover:underline" onClick={() => setAyuda(!ayuda)} aria-expanded={ayuda} aria-controls="ayuda-acceso">¿Olvidaste tu contraseña?</button>{ayuda && <p id="ayuda-acceso" className="fn-caption mt-2">Contacta al administrador de tu cuenta para recuperar el acceso.</p>}</div>
        <p className="mt-7 flex items-center justify-center gap-2 border-t border-stroke pt-6 text-xs text-subtle"><FiShield className="size-4" aria-hidden="true" />Acceso a tu cuenta de trabajo</p>
      </div><p className="mt-8 text-xs text-subtle lg:hidden">Tu negocio, en orden.</p>
    </section>
  </main>;
}
export default Login;