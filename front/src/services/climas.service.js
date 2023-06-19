import axios from "axios";

const urlResource = "http://localhost:4000/api/climas";

async function Buscar(Lluvia) {
    try {
      const resp = await axios.get(urlResource, {
        params: { Lluvia },
      });
      console.log(resp.data);
      return resp.data;
    } catch (error) {
      console.log(error);
      throw new Error("Ha ocurrido un error al buscar los pronósticos.");
    }
}
  
async function BuscarPorId(item) {
  try {
    const resp = await axios.get(urlResource + "/" + item.IdClima);
    return resp.data; // No es necesario acceder a resp.data.item
  } catch (error) {
    console.log(error);
    throw new Error("Ha ocurrido un error al buscar el pronóstico por ID.");
  }
}

  
async function Grabar(item) {
    try {
      if (!item.IdClima) {
        const resp = await axios.post(urlResource, item);
        return resp.data;
      } else {
        await axios.put(urlResource + "/" + item.IdClima, item);
      }
    } catch (error) {
      console.log(error);
      throw new Error("Ha ocurrido un error al grabar el pronóstico.");
    }
}
  
async function Eliminar(id) {
    try {
      await axios.delete(urlResource + "/" + id);
    } catch (error) {
      console.log(error);
      throw new Error("Ha ocurrido un error al eliminar el pronóstico.");
    }
}

export const climasService = {
  Buscar,
  BuscarPorId,
  Grabar,
  Eliminar,
};