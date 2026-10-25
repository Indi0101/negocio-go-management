import { MdArrowBackIos } from "react-icons/md";
import MiCalendario from './calendario.jsx';
import Selec_cantidad from "./selec_cantidad.jsx";
import Selec_busqueda from "./selec_busqueda.jsx";
import { useNavigate } from "react-router-dom";
import "./compras.css"
import { useEffect, useState } from "react";
import AppShell from "../components/AppShell.jsx"; 

function Ventas()
{
  const [usuario, setUsuario] = useState({username:"", userid:""});
  const navigate =useNavigate();
  

  const atras=()=>{
    navigate('/home');
  }
  return (
    <AppShell>
    <div className="compras">
     <div className="card-compras">   
      <form action="">
      <div className="compras-col-1"><button className="btn-back" onClick={atras}><MdArrowBackIos /></button> </div>
      <div className="compras-col-2"><h1>Ventas</h1> </div>  
      
      <div className="compras-col-1"><span>Fecha: </span> </div>
      <div className="compras-col-2"><MiCalendario/> </div>

      <div className="compras-col-1"><span>Cliente: </span></div>
      <div className="compras-col-2"><Selec_busqueda/></div>

      <div className="compras-col-1"><span>Producto: </span></div>
      <div className="compras-col-2"><Selec_busqueda/></div>
    
      <div className="compras-col-1"><span>Detalles de prdocuto</span></div>
      <div className="compras-col-2">
        <div className="detalles-contenedor">
              <div className="contenedor-img-compras">
                  <img src="null" alt="null" className="img-producto-compras"/>
                
              </div>
              <div className="contenedor-detalles-compras">
                
                 <h3><span>Harina de de trigo con centrada</span></h3>
                 <h3>Precio: <span>L 100.00</span> </h3>
                 <h3>Cantidad: <span>3</span></h3>
                 <h3>Total: <span>L 300.00</span></h3>
              </div>
                <Selec_cantidad />
        </div>
      </div><hr className="linea-divisoria" />

      <div className="compras-col-1"><span>Detalles de compra</span></div>
      <div className="compras-col-2">
        <div className="detalles-montos-compras">
          <div className="titulos-montos-compras">
            <h3>SubTotal</h3>
            <h3>Total de envio</h3>
            <h3>Impuestos</h3>
            <h3>Total</h3>
          </div>
          <div className="valores-montos-compras">
            <h3><span>0.0</span></h3>
            <h3><span>0.0</span></h3>
            <h3><span>0.0</span></h3>
            <h3><span>0.0</span></h3>
          </div>
        </div>
      </div>
      <hr className="linea-divisoria" />
      <br/><br/>
      
      <div className="contenedor-btn-compras">
        <button className="btn-guardar-compras" type="submit">Completar venta</button></div>
      <br/>
      </form>
      
      </div>
      
    </div>
    </AppShell>
  )
}
export default Ventas;