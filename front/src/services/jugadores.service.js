import axios from "axios";

const urlResource = "http://localhost:4000/api/jugadores";

async function Buscar(nombre) {
    try {
      const resp = await axios.get(urlResource, {
        params: { nombre },
      });
      console.log(resp.data);
      return resp.data;
    } catch (error) {
      console.log(error);
      throw new Error("Ha ocurrido un error al buscar los jugadores.");
    }
}
  
async function BuscarPorId(item) {
    try {
      const resp = await axios.get(urlResource + "/" + item.idJugador);
      return resp.data.item;
    } catch (error) {
      console.log(error);
      throw new Error("Ha ocurrido un error al buscar al jugador por ID.");
    }
}
  
async function Grabar(item) {
    try {
      if (!item.IdSerie) {
        const resp = await axios.post(urlResource, item);
        return resp.data;
      } else {
        await axios.put(urlResource + "/" + item.idJugador, item);
      }
    } catch (error) {
      console.log(error);
      throw new Error("Ha ocurrido un error al grabar al jugador.");
    }
}
  
async function Eliminar(id) {
    try {
      await axios.delete(urlResource + "/" + id);
    } catch (error) {
      console.log(error);
      throw new Error("Ha ocurrido un error al eliminar al jugador.");
    }
}

export const jugadoresService = {
  Buscar,
  BuscarPorId,
  Grabar,
  Eliminar,
};