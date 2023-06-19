import React from "react";
import moment from "moment";


export default function ArticulosListado({
  Items,
  Consultar,
  Eliminar,
  Modificar,
  Buscar
}) {
  
  return (
    <div className="table-responsive">
      <table className="table table-hover table-sm table-bordered table-striped">
        <thead>
          <tr>
            <th className="text-center">Nombre</th>
            <th className="text-center">País</th>
            <th className="text-center">Fecha de Nacimiento</th>
            <th className="text-center">Elo Máximo</th>
            <th className="text-center">Fecha de Elo Máximo</th>
            <th className="text-center text-nowrap">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {Items &&
            Items.map((Item) => (
              <tr key={Item.idJugador}>
                <td className="text-end" >{Item.nombre}</td>
                <td className="text-end" >{Item.pais}</td>
                <td className="text-end" >{moment(Item.fechaNacimiento).format("DD/MM/YYYY")}</td>
                <td className="text-end" >{Item.eloMax}</td>
                <td className="text-end" >{moment(Item.fechaEloMax).format("DD/MM/YYYY")}</td>
                <td className="text-center text-nowrap" >
                  <button
                    className="btn btn-sm btn-outline-primary"
                    title="Consultar"
                    onClick={() => Consultar(Item)}
                  >
                    <i className="fa fa-eye"></i>
                  </button>
                  <button
                    className="btn btn-sm btn-outline-primary"
                    title="Modificar"
                    onClick={() => Modificar(Item)}
                  >
                    <i className="fa fa-pencil "></i>
                  </button>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    title="Eliminar"
                    onClick={() => Eliminar(Item)}
                  >
                    <i className="fas fa-trash-alt"></i>
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>  
    </div>
  );
}
