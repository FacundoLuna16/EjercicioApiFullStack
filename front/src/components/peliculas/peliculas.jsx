import React, { useState} from "react";
import moment from "moment";
import PeliculasBuscar from "./PeliculasBuscar";
import PeliculasListado from "./PeliculasListado";
import PeliculasRegistro from "./PeliculasRegistro";
import { peliculasService } from "../../services/peliculas.service";



function Peliculas() {
  const TituloAccionABMC = {
    A: "(Agregar)",
    B: "(Eliminar)",
    M: "(Modificar)",
    C: "(Consultar)",
    L: "(Listado)",
  };
  const [AccionABMC, setAccionABMC] = useState("L");

  const [Titulo, setTitulo] = useState("");
  

  const [Items, setItems] = useState(null);
  const [Item, setItem] = useState(null); // usado en BuscarporId (Modificar, Consultar)
 

  async function Buscar() {
    const data = await peliculasService.Buscar(Titulo);
    console.log(data);
    setItems(data);
  }

  async function BuscarPorId(item, accionABMC) {
    const data = await peliculasService.BuscarPorId(item);
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
      IdPelicula: 0,
      titulo: null,
      director: null,
      year: moment(new Date()).format("YYYY-MM-DD"),
      rating: null,
       });
  }
  async function Eliminar(item) {
     const resp = window.confirm(
       "Esta seguro que quiere ELIMINAR el registro?"
     );
     if (resp) {
         await peliculasService.Eliminar(item.IdPelicula);
         Buscar();
     }
  }


  async function Grabar(item) {
    // agregar o modificar
    await peliculasService.Grabar(item);
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
        Peliculas <small>{TituloAccionABMC[AccionABMC]}</small>
      </div>

      {AccionABMC === "L" && (
        <PeliculasBuscar
          Titulo={Titulo}
          setTitulo={setTitulo}
          Buscar={Buscar}
          Agregar={Agregar}
        />
      )}

      {/* Tabla de resutados de busqueda y Paginador */}
      {AccionABMC === "L" && Items?.length > 0 && (
        <PeliculasListado
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
        <PeliculasRegistro
          {...{ AccionABMC, Item, Grabar, Volver }}
        />
      )}
    </div>
  );
}

export { Peliculas };
