import React from 'react';
import { useState } from 'react';
import {DayPicker} from 'react-day-picker';
import {format} from 'date-fns';
import {es} from 'date-fns/locale';///para qyue se muestre en español
import 'react-day-picker/style.css';//estilo base de react-day-picker
import { SlCalender } from "react-icons/sl";
import "./compras.css"

function MiCalendario() {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [isOpen, setIsOpen] = useState(false);
  return (
    <div className ="calendario" >
        
      <button className="boton-calendario" type="button" onClick={()=> setIsOpen(!isOpen)}> 
        <SlCalender className="icono-calendario"/>
      </button>
      <span className="span-fecha-calendario" > 
            {selectedDate &&( <span > {format(selectedDate,'PP', { locale: es })}</span>)}
         </span>
         
        {isOpen && (     
        <div>       
            <DayPicker
                mode="single"
                selected={selectedDate}
                onSelect={(date)=>{
                    setSelectedDate(date);
                    setIsOpen(false);//cierra automaticamnete el calendario
                }}
                locale={es}
            />
        </div>
    )} 
    <hr className="linea-divisoria" /></div>
  );
}   
export default MiCalendario;
