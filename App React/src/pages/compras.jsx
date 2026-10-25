import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiBox, FiMinus, FiPlus, FiShoppingCart, FiInfo, FiCheck } from 'react-icons/fi';
import AppShell from '../components/AppShell';

const PROVEEDORES = ['Distribuidora Industrial S.A.', 'Corporación Textil del Norte', 'Almacenes Globales', 'Proveedora Química Central', 'Suministros Médicos Alfa'];
const moneda = centavos => new Intl.NumberFormat('es-HN', { style: 'currency', currency: 'HNL' }).format(centavos / 100);
const fechaLocal = () => { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`; };
const centavos = valor => Math.round(Number(valor || 0) * 100);

// El catálogo sigue siendo de ejemplo. onGuardar se conecta cuando exista un DTO real.
function Compras({ onGuardar }) {
  const navigate = useNavigate();
  const [fecha, setFecha] = useState(fechaLocal);
  const [proveedor, setProveedor] = useState('');
  const [pago, setPago] = useState('');
  const [cantidad, setCantidad] = useState(3);
  const [envio, setEnvio] = useState('0');
  const [impuestos, setImpuestos] = useState('0');
  const [ocupado, setOcupado] = useState(false);
  const [aviso, setAviso] = useState('');
  const [error, setError] = useState('');
  const subtotal = cantidad * 10000;
  const total = subtotal + centavos(envio) + centavos(impuestos);
  const disponible = typeof onGuardar === 'function';

  function resetear() {
    setFecha(fechaLocal()); 
    setProveedor(''); 
    setPago(''); 
    setCantidad(3); 
    setEnvio('0'); 
    setImpuestos('0'); 
    setAviso(''); 
    setError('');
  }
  async function guardar(event) {
    event.preventDefault(); 
    if (!disponible || ocupado) return;

    setOcupado(true); 
    setAviso(''); 
    setError('');

    try {
      await onGuardar({ fecha, proveedor, formaPago: pago, detalle: [{ nombre: 'Harina de trigo', cantidad, precioUnitario: 100 }], envio: centavos(envio) / 100, impuestos: centavos(impuestos) / 100, total: total / 100 });
      setAviso('La compra se guardó correctamente.');
    } catch (err) { 
      setError(err.message || 'No se pudo guardar la compra. Inténtalo de nuevo.'); 
    }
      finally { setOcupado(false); }
  }
  return <AppShell titulo="Compras">
    <button type="button" className="mb-5 inline-flex min-h-11 items-center gap-2 text-sm text-subtle hover:text-brand-800" onClick={() => navigate('/home')}>
      <FiArrowLeft className="size-4" aria-hidden="true" />Volver al inicio</button>

    <div className="mb-7 flex flex-wrap items-start justify-between gap-3">
      <div>
        <h1 className="fn-page-title">Nueva compra</h1>
        <p className="fn-caption mt-2">Completa la información y revisa el total.</p>
      </div>
      <span className="rounded-full border border-stroke bg-white px-3 py-1.5 text-xs font-medium text-subtle">
        {disponible ? 'Nueva operación' : 'Vista de ejemplo'}
      </span>
    </div>
    <form onSubmit={guardar} aria-busy={ocupado} className="grid items-start gap-5 xl:grid-cols-[minmax(0,1fr)_320px]">
      <div className="min-w-0 space-y-5">
        <section className="fn-panel p-5 sm:p-6" aria-labelledby="datos-compra">
          <div className="mb-6 flex items-center gap-3">
            <span className="grid size-9 place-items-center rounded-xl bg-brand-50 text-sm font-semibold text-brand-800">
              1
            </span>
              <div>
                <h2 id="datos-compra" className="text-base font-semibold">Datos de la compra</h2>
                <p className="mt-1 text-xs text-subtle">Fecha, proveedor y forma de pago.</p>
              </div>
          </div>
          <fieldset disabled={ocupado} className="grid min-w-0 gap-5 sm:grid-cols-2 border-1 border-pink-400">
          <div>
            <label htmlFor="compra-fecha" className="fn-label">Fecha *</label>
            <input id="compra-fecha" type="date" className="fn-field" value={fecha} onChange={e => setFecha(e.target.value)} required /> 
          </div>
          <div>
            <label htmlFor="compra-pago" className="fn-label">Forma de pago *</label>
            <select id="compra-pago" className="fn-field" value={pago} onChange={e => setPago(e.target.value)} required>
              <option value="">Selecciona una opción</option>
              <option>Efectivo</option>
              <option>Transferencia</option>
              <option>Tarjeta</option>
            </select>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="compra-proveedor" className="fn-label">Proveedor *</label>
            <input id="compra-proveedor" className="fn-field" list="proveedores-compra" value={proveedor} onChange={e => setProveedor(e.target.value)} required placeholder="Busca o escribe un proveedor" />
            <datalist id="proveedores-compra">
              {PROVEEDORES.map(p => <option key={p} value={p} />)}
            </datalist>
              <p className="mt-2 text-xs text-subtle">* Campos obligatorios</p></div>
        </fieldset>
        </section>

        <section className="fn-panel p-5 sm:p-6" aria-labelledby="productos-compra">
          <div className="mb-6 flex items-center gap-3">
            <span className="grid size-9 place-items-center rounded-xl bg-brand-50 text-sm font-semibold text-brand-800">
              2
            </span>
              <div>
                <h2 id="productos-compra" className="text-base font-semibold">Producto</h2>
                <p className="mt-1 text-xs text-subtle">Revisa la cantidad que vas a comprar.</p>
              </div>
          </div>
          <div className="flex items-start gap-3 rounded-xl bg-canvas p-4">
            <span className="grid size-12 shrink-0 place-items-center rounded-xl border border-stroke bg-white text-brand-700">
              <FiBox className="size-6" aria-hidden="true" />
              </span>
            <div className="min-w-0">
                <h3 className="text-sm font-semibold">Harina de trigo</h3>
                <p className="mt-1 text-xs text-subtle">Producto de ejemplo</p>
                <p className="mt-2 text-sm font-medium">{moneda(10000)} 
                  <span className="text-xs font-normal text-subtle">/ unidad</span>
                </p>
            </div>
          </div>
          <div className="mt-5 flex flex-wrap items-end justify-between gap-5">
            <div>
              <label htmlFor="compra-cantidad" className="fn-label">Cantidad</label>
              <div className="flex items-center gap-2">
                <button type="button" className="fn-icon-button" aria-label="Disminuir cantidad" disabled={cantidad <= 1 || ocupado} onClick={() => setCantidad(n => n - 1)}>
                  <FiMinus aria-hidden="true" /></button>
                  <input id="compra-cantidad" className="fn-field w-20 px-2 text-center tabular-nums" type="number" inputMode="numeric" min="1" max="9999" step="1" value={cantidad} onChange={e => { const n = Number(e.target.value); setCantidad(Number.isInteger(n) && n > 0 ? Math.min(n, 9999) : 1); }} disabled={ocupado} required />
                  <button type="button" className="fn-icon-button" aria-label="Aumentar cantidad" disabled={cantidad >= 9999 || ocupado} onClick={() => setCantidad(n => n + 1)}>
                    <FiPlus aria-hidden="true" />
                  </button>
              </div>
            </div>
            <div className="text-right"><p className="text-xs text-subtle">Importe del producto</p>
              <p className="mt-1 text-xl font-semibold tabular-nums">{moneda(subtotal)}</p>
            </div>
         </div>
        </section>
        <section className="fn-panel p-5 sm:p-6" aria-labelledby="otros-importes">
          <h2 id="otros-importes" className="mb-5 text-base font-semibold">Otros importes</h2>
          <fieldset disabled={ocupado} className="grid min-w-0 gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="compra-envio" className="fn-label">Envío (L)</label>
              <input id="compra-envio" className="fn-field" type="number" min="0" max="9999999" step="0.01" inputMode="decimal" value={envio} onChange={e => setEnvio(e.target.value)} />
            </div>
            <div>
              <label htmlFor="compra-impuestos" className="fn-label">Impuestos (L)</label>
              <input id="compra-impuestos" className="fn-field" type="number" min="0" max="9999999" step="0.01" inputMode="decimal" value={impuestos} onChange={e => setImpuestos(e.target.value)} />
            </div>
          </fieldset>
              <p className="mt-3 text-xs leading-5 text-subtle">Ingresa el importe de impuestos aplicable a esta compra.</p>
        </section>
      </div>

      <aside className="fn-panel p-5 sm:p-6 xl:sticky xl:top-6" aria-labelledby="resumen-compra">
        <div className="mb-6 flex items-center gap-2">
          <FiShoppingCart className="size-5 text-brand-700" aria-hidden="true" />
          <h2 id="resumen-compra" className="text-base font-semibold">Resumen de compra</h2>
        </div>
        <dl className="space-y-4 text-sm">
          <div className="flex justify-between gap-3">
            <dt className="text-subtle">Subtotal</dt>
            <dd className="font-medium tabular-nums">{moneda(subtotal)}</dd>
          </div>
          <div className="flex justify-between gap-3">
            <dt className="text-subtle">Envío</dt>
            <dd className="font-medium tabular-nums">{moneda(centavos(envio))}</dd>
          </div>
          <div className="flex justify-between gap-3">
            <dt className="text-subtle">Impuestos</dt>
            <dd className="font-medium tabular-nums">{moneda(centavos(impuestos))}</dd>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-2 border-t border-stroke pt-5">
            <dt className="font-semibold">Total</dt>
            <dd className="text-2xl font-semibold text-brand-800 tabular-nums" aria-live="polite" aria-atomic="true">{moneda(total)}</dd>
          </div>
        </dl>
        {!disponible && <p id="compra-modo" className="mt-5 flex items-start gap-2 rounded-xl bg-brand-50 p-3 text-xs leading-5 text-brand-900">
          <FiInfo className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
          Esta es una vista de ejemplo. Las compras aún no se pueden guardar.
          </p>
        }
        <button className="fn-primary mt-6 w-full" type="submit" disabled={!disponible || ocupado} aria-describedby={!disponible ? 'compra-modo' : undefined}>
          <FiCheck className="size-4" aria-hidden="true" />
          {ocupado ? 'Guardando…' : 'Guardar compra'}
        </button>
        <button type="button" className="fn-secondary mt-3 w-full" disabled={ocupado} onClick={resetear}>
            Limpiar formulario
        </button>
        {error && <p role="alert" className="mt-4 text-sm text-red-800">{error}</p>}
        {aviso && <p role="status" className="mt-4 text-sm text-brand-800">{aviso}</p>}
      </aside>
    </form>
  </AppShell>;
}
export default Compras;