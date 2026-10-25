import { useState } from "react";
function Selec_cantidad(){
    const [cantidad, setCantidad] = useState(1);

    return(<>
     
        <div className="contenedor-botones-cantidad">
            <button type="button" 
                    onClick={()=>setCantidad(Math.max(1 ,cantidad - 1))}
                    className="botones-cantidad"
                    >-</button>

            <input type="number" value={cantidad}
                    onChange={
                        (e)=> setCantidad(Math.max(1, parseInt(e.target.value || 1)))}
                    className="input-cantidad"
                    />
            <button type="button"
            onClick={()=>setCantidad(cantidad+1)}
            className="botones-cantidad"
            >
                +
            </button>
            
        </div>
      

    </>);
}
export default Selec_cantidad;