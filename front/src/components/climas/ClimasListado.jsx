import React from "react";
import moment from "moment";

export default function ClimasListado({
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
            <th className="text-center">Maxima</th>
            <th className="text-center">Minima</th>
            <th className="text-center">Fecha</th>
            <th className="text-center">Lluvia</th>
            <th className="text-center">Humedad</th>
            <th className="text-center text-nowrap">Acciones</th>
          </tr>
        </thead>
        <tbody>
        {Items &&
        Items.map((Item) => (
          <tr key={Item.IdClima}>
            <td className="text-end">{Item.Maxima}</td>
            <td className="text-end">{Item.Minima}</td>
            <td className="text-end">{moment(Item.Fecha).format("DD/MM/YYYY")}</td>
            <td className="text-end">{Item.Lluvia}</td>
            <td className="text-end">{Item.Humedad}</td>
            <td className="text-center text-nowrap">
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
