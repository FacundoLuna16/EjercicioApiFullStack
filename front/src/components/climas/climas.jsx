import React, { useState} from "react";
import moment from "moment";
import ClimasBuscar from "./ClimasBuscar";
import ClimasListado from "./ClimasListado";
import ClimasRegistro from "./ClimasRegistro";
import { climasService } from "../../services/climas.service";

function Climas() {
  const TituloAccionABMC = {
    A: "(Agregar)",
    B: "(Eliminar)",
    M: "(Modificar)",
    C: "(Consultar)",
    L: "(Listado)",
  };
  const [AccionABMC, setAccionABMC] = useState("L");

  const [Lluvia, setLluvia] = useState("");
  

  const [Items, setItems] = useState(null);
  const [Item, setItem] = useState(null); // usado en BuscarporId (Modificar, Consultar)
 

  async function Buscar() {
    const data = await climasService.Buscar(Lluvia);
    console.log(data);
    setItems(data);
  }

  async function BuscarPorId(id, accionABMC) {
    try {
      const data = await climasService.BuscarPorId(id);
      setItem(data);
      setAccionABMC(accionABMC);
    } catch (error) {
      console.error('Ha ocurrido un error al buscar el pronóstico por ID:', error);
    }
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
      IdClima: 0,
      Maxima: 35,
      Minima: 25,
      Fecha: moment(new Date()).format("YYYY-MM-DD"),
      Lluvia: 'SI',
      Humedad: 50,
       });
  }
  async function Eliminar(item) {
     const resp = window.confirm(
       "Esta seguro que quiere ELIMINAR el registro?"
     );
     if (resp) {
         await climasService.Eliminar(item.IdClima);
         Buscar();
     }
  }


  async function Grabar(item) {
    // agregar o modificar
    await climasService.Grabar(item);
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
        Climas <small>{TituloAccionABMC[AccionABMC]}</small>
      </div>

      {AccionABMC === "L" && (
        <ClimasBuscar
          Lluvia={Lluvia}
          setLluvia={setLluvia}
          Buscar={Buscar}
          Agregar={Agregar}
        />
      )}

      {/* Tabla de resutados de busqueda y Paginador */}
      {AccionABMC === "L" && Items?.length > 0 && (
        <ClimasListado
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
        <ClimasRegistro
          {...{ AccionABMC, Item, Grabar, Volver }}
        />
      )}
    </div>
  );
}

export { Climas };
