import React, { useState } from 'react';
import './mi-perfil.css';

export const PERFIL_EJEMPLO = {
  id: 1, nombre: 'Indira', apellido: 'Martínez', username: 'indi',
  email: 'indira@example.com', dni: '0801-1998-01234',
  direccion: 'Tegucigalpa, Honduras', rol: 'ADMIN',
};
const USUARIOS_EJEMPLO = [PERFIL_EJEMPLO,
  { id: 2, nombre: 'María', apellido: 'López', username: 'maria.lopez', rol: 'USER' },
  { id: 3, nombre: 'Carlos', apellido: 'Reyes', username: 'carlos.reyes', rol: 'USER' },
];
const VACIO = { nombre: '', apellido: '', email: '', dni: '', direccion: '', username: '', password: '', rol: 'USER' };
const nombreRol = rol => ['ADMIN', 'ROLE_ADMIN', 'ADMINISTRADOR'].includes(String(rol).toUpperCase()) ? 'Administrador' : 'Usuario';

// Propuesta visual. En producción, usar demo={false}, datos reales y callbacks autenticados.
export default function MiPerfil({ perfil = PERFIL_EJEMPLO, usuarios = USUARIOS_EJEMPLO,
  demo = true, onBack, onLogout, onUpdateProfile, onCreateUser, onChangePassword }) {
  const [vista, setVista] = useState('perfil');
  const [paso, setPaso] = useState(1);
  const [localPerfil, setLocalPerfil] = useState(null);
  const [edicion, setEdicion] = useState(null);
  const [nuevos, setNuevos] = useState([]);
  const [nuevo, setNuevo] = useState({ ...VACIO });
  const [creado, setCreado] = useState(null);
  const [mostrarClave, setMostrarClave] = useState(false);
  const [error, setError] = useState('');
  const [aviso, setAviso] = useState('');
  const [ocupado, setOcupado] = useState(false);
  const datos = localPerfil || perfil;
  const administrador = nombreRol(perfil.rol) === 'Administrador';
  const lista = [...usuarios, ...nuevos];
  const iniciales = `${datos.nombre?.[0] || ''}${datos.apellido?.[0] || ''}`;
  const nombre = `${datos.nombre || ''} ${datos.apellido || ''}`.trim();
  const puedeCrear = administrador && (demo || Boolean(onCreateUser));
  const ir = destino => { setVista(destino); setError(''); setAviso(''); };
  const abrirNuevo = () => { setNuevo({ ...VACIO }); setPaso(1); setMostrarClave(false); ir('crear'); };
  const cambiarNuevo = e => setNuevo(actual => ({ ...actual, [e.target.name]: e.target.value }));
  const atras = destino => <button className="mp-back cursor-interaction" type="button" disabled={ocupado} onClick={() => ir(destino)}>‹ {destino === 'perfil' ? 'Mi perfil' : 'Usuarios'}</button>;

  async function crear(event) {
    event.preventDefault();
    if (paso === 1) { setPaso(2); setError(''); return; }
    if (!puedeCrear) return;
    const payload = Object.fromEntries(Object.entries(nuevo).map(([k, v]) => [k, k === 'password' ? v : v.trim()]));
    if (lista.some(u => u.username?.toLowerCase() === payload.username.toLowerCase())) { setError('Este nombre de usuario ya está en uso.'); return; }
    setOcupado(true); setError('');
    try {
      const respuesta = demo ? { id: `demo-${Date.now()}` } : await onCreateUser(payload);
      const registro = Object.fromEntries(Object.entries(payload).filter(([k]) => k !== 'password'));
      registro.id = respuesta?.id ?? payload.username;
      setNuevos(actual => [...actual, registro]); setCreado(registro);
      setNuevo({ ...VACIO }); setMostrarClave(false); ir('creado');
    } catch (err) { setError(err.message || 'No se pudo crear el usuario. Inténtalo otra vez.'); }
    finally { setOcupado(false); }
  }
  async function guardarPerfil(event) {
    event.preventDefault(); setOcupado(true); setError('');
    try {
      const cambios = Object.fromEntries(['nombre', 'apellido', 'email', 'direccion'].map(k => [k, edicion[k].trim()]));
      if (!demo && !onUpdateProfile) throw new Error('La actualización del perfil aún no está conectada.');
      if (!demo) await onUpdateProfile(cambios);
      setLocalPerfil({ ...datos, ...cambios }); ir('perfil'); setAviso(demo ? 'Cambios aplicados a la vista previa.' : 'Perfil actualizado.');
    } catch (err) { setError(err.message || 'No se pudieron guardar los cambios.'); }
    finally { setOcupado(false); }
  }
  async function cambiarClave(event) {
    event.preventDefault(); const form = event.currentTarget;
    const campos = new FormData(form);
    if (campos.get('nueva') !== campos.get('confirmacion')) { setError('Las contraseñas nuevas no coinciden.'); return; }
    if (campos.get('actual') === campos.get('nueva')) { setError('La nueva contraseña debe ser diferente de la actual.'); return; }
    setOcupado(true); setError('');
    try {
      if (!demo && !onChangePassword) throw new Error('El cambio de contraseña aún no está conectado.');
      if (!demo) await onChangePassword({ actual: campos.get('actual'), nueva: campos.get('nueva') });
      form.reset(); ir('perfil'); setAviso(demo ? 'Simulación completada. Tu contraseña real no cambió.' : 'Contraseña actualizada.');
    } catch (err) { setError(err.message || 'No se pudo cambiar la contraseña.'); }
    finally { setOcupado(false); }
  }
  return <div className="mp-app"><div className="mp-shell">
    <header className="mp-brand"><span>FIN<span>ANN</span></span><span className="mp-brand-caption">MI CUENTA</span></header>
    <main className="mp-content">
      {vista === 'perfil' && <>
        {onBack && <button type="button" className="mp-back cursor-interaction" onClick={onBack}>‹ Inicio</button>}
        <h1>Mi perfil</h1><p className="mp-subtitle">Tu información y el acceso a tu cuenta.</p>
        <div className="mp-person"><div className="mp-avatar">{iniciales}</div><div><h2>{nombre}</h2><span className="mp-badge">{nombreRol(perfil.rol)}</span></div></div>
        <section className="mp-panel"><div className="mp-between"><h3>Información personal</h3><button className="mp-link cursor-interaction" type="button" onClick={() => { setEdicion({ ...datos }); ir('editar'); }}>Editar</button></div>
          <dl className="mp-details"><div><dt>Usuario</dt><dd>@{datos.username}</dd></div><div><dt>DNI</dt><dd>{datos.dni ? `•••• •••• ${datos.dni.replace(/\D/g, '').slice(-4)}` : 'Sin registrar'}</dd></div><div className="mp-full"><dt>Correo electrónico</dt><dd>{datos.email || 'Sin registrar'}</dd></div><div className="mp-full"><dt>Dirección</dt><dd>{datos.direccion || 'Sin registrar'}</dd></div></dl>
        </section>
        <section className="mp-panel"><h3>Seguridad</h3><button type="button" className="mp-menu-row cursor-interaction" onClick={() => ir('clave')}><span className="mp-icon" aria-hidden="true">●</span><span><strong>Cambiar contraseña</strong><small>Protege el acceso a tu cuenta</small></span><span aria-hidden="true">›</span></button></section>
        {administrador && <section className="mp-panel mp-admin"><div className="mp-between"><h3>Administración</h3><span className="mp-mini-label">Solo administradores</span></div><p className="mp-subtitle">Gestiona las cuentas de tu equipo.</p><button className="mp-menu-row cursor-interaction" type="button" onClick={() => ir('usuarios')}><span className="mp-icon" aria-hidden="true">◎</span><span><strong>Usuarios</strong><small>{lista.length} cuentas registradas</small></span><span aria-hidden="true">›</span></button><button type="button" className="mp-primary cursor-interaction" onClick={abrirNuevo}>＋ Crear usuario</button></section>}
        <button className="mp-logout cursor-interaction" type="button" onClick={() => ir('salir')}>Cerrar sesión</button>
      </>}
      {vista === 'usuarios' && administrador && <>{atras('perfil')}<h1>Usuarios</h1><p className="mp-subtitle">Personas con acceso a FINANN.</p><button className="mp-primary mp-top-space cursor-interaction" type="button" onClick={abrirNuevo}>＋ Crear usuario</button><section className="mp-panel mp-users">{lista.map(u => <div className="mp-user" key={u.id ?? u.username}><div className="mp-avatar mp-avatar-small">{u.nombre?.[0]}{u.apellido?.[0]}</div><div className="mp-user-info"><strong>{u.nombre} {u.apellido}</strong><small>@{u.username}</small></div><span className="mp-role-small">{nombreRol(u.rol)}</span></div>)}</section></>}
      {vista === 'crear' && administrador && <>{atras('usuarios')}<h1>Crear usuario</h1><p className="mp-subtitle">Completa sus datos y define su acceso.</p><div className="mp-steps" aria-label={`Paso ${paso} de 2`}><span className={paso === 1 ? 'mp-current' : ''}>1. Datos personales</span><span className={paso === 2 ? 'mp-current' : ''}>2. Acceso</span></div><form onSubmit={crear}><fieldset disabled={ocupado} className="mp-fieldset">
        {paso === 1 ? <><div className="mp-form-grid"><label>Nombre *<input name="nombre" value={nuevo.nombre} onChange={cambiarNuevo} required pattern=".*\S.*" maxLength={100} autoComplete="given-name" placeholder="Ej. María" /></label><label>Apellido *<input name="apellido" value={nuevo.apellido} onChange={cambiarNuevo} required pattern=".*\S.*" maxLength={100} autoComplete="family-name" placeholder="Ej. López" /></label></div><label>Correo electrónico *<input name="email" type="email" value={nuevo.email} onChange={cambiarNuevo} required maxLength={150} autoComplete="email" placeholder="maria@example.com" /></label><label>DNI *<input name="dni" value={nuevo.dni} onChange={cambiarNuevo} required pattern=".*\S.*" maxLength={100} placeholder="Número de identificación" /></label><label>Dirección *<input name="direccion" value={nuevo.direccion} onChange={cambiarNuevo} required pattern=".*\S.*" maxLength={150} autoComplete="street-address" placeholder="Ciudad y dirección" /></label><p className="mp-help">* Campos obligatorios</p><div className="mp-actions"><button className="mp-secondary cursor-interaction" type="button" onClick={() => ir('usuarios')}>Cancelar</button><button className="mp-primary cursor-interaction" type="submit">Continuar →</button></div></> : <><label>Nombre de usuario *<input name="username" value={nuevo.username} onChange={cambiarNuevo} required pattern="[A-Za-z0-9._\-]{3,50}" title="De 3 a 50 letras, números, puntos, guiones o guiones bajos" autoComplete="off" placeholder="Ej. maria.lopez" /></label><label>Rol *<select name="rol" value={nuevo.rol} onChange={cambiarNuevo}><option value="USER">Usuario</option><option value="ADMIN">Administrador</option></select></label><div className="mp-access-note"><strong>{nombreRol(nuevo.rol) === 'Administrador' ? 'Acceso administrativo' : 'Acceso de usuario'}</strong><p>{nombreRol(nuevo.rol) === 'Administrador' ? 'Puede gestionar usuarios y asignar roles, además de las funciones autorizadas del negocio.' : 'Puede acceder a su perfil y a las funciones del negocio que tenga autorizadas. No puede gestionar usuarios.'}</p></div><label>Contraseña inicial *<input type={mostrarClave ? 'text' : 'password'} name="password" value={nuevo.password} onChange={cambiarNuevo} required minLength={12} autoComplete="new-password" placeholder="Mínimo 12 caracteres" /></label><label className="mp-checkbox"><input type="checkbox" checked={mostrarClave} onChange={e => setMostrarClave(e.target.checked)} />Mostrar contraseña</label>{demo && <p className="mp-help">Usa datos ficticios. Esta vista no crea cuentas reales.</p>}{!puedeCrear && <p className="mp-help">La creación de usuarios aún no está conectada.</p>}<div className="mp-actions"><button type="button" className="mp-secondary cursor-interaction" onClick={() => { setPaso(1); setError(''); }}>← Atrás</button><button type="submit" className="mp-primary cursor-interaction" disabled={!puedeCrear}>{ocupado ? 'Creando…' : 'Crear usuario'}</button></div></>}
      </fieldset></form></>}
      {vista === 'creado' && administrador && creado && <><div className="mp-success"><div className="mp-success-icon">✓</div><h1>Usuario creado</h1><p className="mp-subtitle">{creado.nombre} {creado.apellido} ya aparece en tu equipo.</p></div><section className="mp-panel"><dl className="mp-details"><div><dt>Usuario</dt><dd>@{creado.username}</dd></div><div><dt>Rol</dt><dd>{nombreRol(creado.rol)}</dd></div></dl></section>{demo && <p className="mp-help">Simulación: no se creó una cuenta real.</p>}<button className="mp-primary mp-top-space cursor-interaction" type="button" onClick={() => ir('usuarios')}>Ver usuarios</button><button className="mp-link mp-wide cursor-interaction" type="button" onClick={abrirNuevo}>Crear otro usuario</button></>}
      {vista === 'editar' && edicion && <>{atras('perfil')}<h1>Editar información</h1><p className="mp-subtitle">Mantén tus datos actualizados.</p><form onSubmit={guardarPerfil} className="mp-top-space"><fieldset className="mp-fieldset" disabled={ocupado}><div className="mp-form-grid">{['nombre', 'apellido'].map(k => <label key={k}>{k === 'nombre' ? 'Nombre' : 'Apellido'} *<input value={edicion[k] || ''} required pattern=".*\S.*" maxLength={100} onChange={e => setEdicion({ ...edicion, [k]: e.target.value })} /></label>)}</div><label>Correo electrónico *<input type="email" value={edicion.email || ''} required maxLength={150} onChange={e => setEdicion({ ...edicion, email: e.target.value })} /></label><label>Dirección *<input value={edicion.direccion || ''} required pattern=".*\S.*" maxLength={150} onChange={e => setEdicion({ ...edicion, direccion: e.target.value })} /></label><label>Usuario<input value={datos.username} readOnly /></label><p className="mp-help">El DNI y el rol no se modifican desde esta pantalla.</p><div className="mp-actions"><button type="button" className="mp-secondary cursor-interaction" onClick={() => ir('perfil')}>Cancelar</button><button className="mp-primary cursor-interaction" type="submit">{ocupado ? 'Guardando…' : 'Guardar cambios'}</button></div></fieldset></form></>}
      {vista === 'clave' && <>{atras('perfil')}<h1>Cambiar contraseña</h1><p className="mp-subtitle">Elige una contraseña que no uses en otra cuenta.</p><form className="mp-top-space" onSubmit={cambiarClave}><fieldset className="mp-fieldset" disabled={ocupado}><label>Contraseña actual<input name="actual" type="password" autoComplete="current-password" required /></label><label>Nueva contraseña<input name="nueva" type="password" autoComplete="new-password" required minLength={12} /></label><label>Confirmar nueva contraseña<input name="confirmacion" type="password" autoComplete="new-password" required minLength={12} /></label><p className="mp-help">Mínimo 12 caracteres.{demo ? ' En esta vista previa no se modifica tu contraseña real.' : ''}</p><div className="mp-actions"><button type="button" className="mp-secondary cursor-interaction" onClick={() => ir('perfil')}>Cancelar</button><button className="mp-primary cursor-interaction" type="submit">{ocupado ? 'Actualizando…' : 'Actualizar'}</button></div></fieldset></form></>}
      {vista === 'salir' && <><div className="mp-success"><div className="mp-success-icon">↗</div><h1>¿Cerrar sesión?</h1><p className="mp-subtitle">Tendrás que iniciar sesión para volver a tu cuenta.</p></div><button type="button" className="mp-primary cursor-interaction" disabled={ocupado || (!demo && !onLogout)} onClick={async () => { setOcupado(true); try { if (!demo) await onLogout(); ir('fuera'); } catch (err) { setError(err.message || 'No se pudo cerrar la sesión.'); } finally { setOcupado(false); } }}>Cerrar sesión</button><button type="button" disabled={ocupado} className="mp-secondary mp-top-space cursor-interaction" onClick={() => ir('perfil')}>Volver a mi perfil</button></>}
      {vista === 'fuera' && <div className="mp-success"><div className="mp-success-icon">✓</div><h1>Sesión cerrada</h1>{demo && <><p className="mp-subtitle">Así termina el recorrido de salida.</p><button className="mp-primary mp-top-space cursor-interaction" onClick={() => ir('perfil')}>Volver a la vista previa</button></>}</div>}
      {error && <p className="mp-error" role="alert">{error}</p>}{aviso && <p className="mp-notice" role="status">{aviso}</p>}
    </main><footer className="mp-footer">FINANN <span>·</span> Tu negocio, en orden.</footer>
  </div></div>;
}


