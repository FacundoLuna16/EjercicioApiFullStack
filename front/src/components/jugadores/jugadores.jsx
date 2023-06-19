import React, { useState } from "react";
import moment from "moment";
import JugadoresBuscar from "./JugadoresBuscar";
import JugadoresListado from "./JugadoresListado";
import JugadoresRegistro from "./JugadoresRegistro";
import { jugadoresService } from "../../services/jugadores.service";



function Jugadores() {
    const TituloAccionABMC = {
      A: "(Agregar)",
      B: "(Eliminar)",
      M: "(Modificar)",
      C: "(Consultar)",
      L: "(Listado)",
    };
    const [AccionABMC, setAccionABMC] = useState("L");
  
    const [nombre, setNombre] = useState("");
    
  
    const [Items, setItems] = useState(null);
    const [Item, setItem] = useState(null); // usado en BuscarporId (Modificar, Consultar)
   
  
    async function Buscar() {
      const data = await jugadoresService.Buscar(nombre);
      console.log(data);
      setItems(data);
    }
  
    async function BuscarPorId(item, accionABMC) {
      const data = await jugadoresService.BuscarPorId(item);
      setItem(data);
      setAccionABMC(accionABMC);
    }
  
    function Consultar(item) {
      BuscarPorId(item, "C"); // paso la accionABMC pq es asincrono la busqueda y luego de ejecutarse quiero cambiar el estado accionABMC
    }
    function Modificar(item) {
      BuscarPorId(item, "M"); // paso la accionABMC pq es asincrono la busqueda y luego de ejecutarse quiero cambiar el estado accionABMC
    }
  
    function Agregar() {
      setAccionABMC("A");
      setItem({
        idJugador: 0,
        nombre: null,
        pais: null,
        fechaNacimiento: moment(new Date()).format("YYYY-MM-DD"),
        eloMax: null,
        fechaEloMax: moment(new Date()).format("YYYY-MM-DD"),
         });
    }
    async function Eliminar(item) {
       const resp = window.confirm(
         "Está seguro de que quiere ELIMINAR el registro?"
       );
       if (resp) {
           await jugadoresService.Eliminar(item.idJugador);
           Buscar();
       }
    }
  
  
    async function Grabar(item) {
      // agregar o modificar
      await jugadoresService.Grabar(item);
      await Buscar();
      Volver();
    }
  
    // Volver/Cancelar desde Agregar/Modificar/Consultar
    function Volver() {
      setAccionABMC("L");
    }
  
    return (
      <div>
        <div className="tituloPagina">
          Jugadores <small>{TituloAccionABMC[AccionABMC]}</small>
        </div>
  
        {AccionABMC === "L" && (
          <JugadoresBuscar
            nombre={nombre}
            setNombre={setNombre}
            Buscar={Buscar}
            Agregar={Agregar}
          />
        )}
  
        {/* Tabla de resultados de busqueda y Paginador */}
        {AccionABMC === "L" && Items?.length > 0 && (
          <JugadoresListado
            {...{
              Items,
              Consultar,
              Eliminar,
              Modificar,
              Buscar,
            }}
          />
        )}
  
        {AccionABMC === "L" && Items?.length === 0 && (
          <div className="alert alert-info mensajesAlert">
            <i className="fa fa-exclamation-sign"></i>
            No se encontraron registros...
          </div>
        )}
  
        {/* Formulario de alta/modificacion/consulta */}
        {AccionABMC !== "L" && (
          <JugadoresRegistro
            {...{ AccionABMC, Item, Grabar, Volver }}
          />
        )}
      </div>
    );
  }
  
  export { Jugadores };