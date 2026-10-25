import { IoIosArrowDown } from "react-icons/io";
import { FiX } from "react-icons/fi";
import { useState,useEffect,useRef } from "react";
import "./compras.css"

const PROVEEDORES_EJEMPLO =[
  "Distribuidora Industrial S.A.",
  "Corporación Textil del Norte",
  "Almacenes Globales",
  "Proveedora Química Central",
  "Suministros Médicos Alfa"
];
function Selec_busqueda(){
    const [busqueda, setBusqueda]=useState("");
    const [isOpen, setIsOpen]=useState(false);
     const buscadorRef = useRef(null);
    //filtrado matematico en tiempo real
    const resultadosFiltrados = PROVEEDORES_EJEMPLO.filter(proveedor=> proveedor.toLowerCase().includes(busqueda.toLowerCase()));
    
    useEffect(()=>{
        function touchFueraLista(evento){
            if(buscadorRef.current && !buscadorRef.current.contains(evento.target))
           { setIsOpen(false);}
            }
            document.addEventListener("mousedown", touchFueraLista);
            document.addEventListener("touchstart", touchFueraLista);
            return()=>{
                document.removeEventListener("mousedown", touchFueraLista);
                document.removeEventListener("touchstart", touchFueraLista);
            };
    },[]);

    return(
    <>
        <div className="buscador-contenedor" ref={buscadorRef}>
            <div className="relative flex items-center">
                <IoIosArrowDown className="icono-arrow-down-busqueda" />
                <input type="text"
                        placeholder="Escribir para buscar..."
                        value={busqueda}
                        onFocus={()=>setIsOpen(true)}
                        onChange={(e)=>{
                            setBusqueda(e.target.value);
                            setIsOpen(true);
                        }}   
                         className="input-busqueda"       
                />
                {busqueda && (
                    <button type="button"
                            onClick={()=>setBusqueda("")}
                            className="boton-fix-busqueda"
                            >
                    <FiX className="w-5 h-5"/>
                    </button>
                )}
            </div>
            {isOpen &&(
                <ul  className="ul-proveedores-busqueda">
                    {resultadosFiltrados.length > 0 ?(
                        resultadosFiltrados.map((item,index)=>(
                            <li key={index}
                                onClick={()=>{
                                    setBusqueda(item);
                                    setIsOpen(false);
                                }}
                            className="li-proveedor-busqueda"
                            >
                                {item}
                            </li>
                        ))):( <li className="li-proveedor-busqueda">No hay resultados</li>
                      
                    )}
                </ul>
            )}
        <hr className="linea-divisoria" /></div>
    </>
);
}
export default Selec_busqueda;