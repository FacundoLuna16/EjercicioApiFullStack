const { Router }  = require('express');
const db = require("../base-ORM/sequelize-init");
const router = new Router();

router.get("/", async (req, res) => {
  let data = await db.climas.findAll();
  res.json(data);
});


router.get("/:id", async (req, res) => {
  let item = await db.climas.findOne({
    where: { IdClima: req.params.id}
  });
  res.json({item});
});

router.post("/", async (req, res) => {
  try{
    let data = await db.climas.create({
        Maxima: req.body.Maxima,
        Minima : req.body.Minima,
        Fecha : req.body.Fecha,
        Lluvia : req.body.Lluvia,
        Humedad : req.body.Humedad
    });
    res.status(200).json(data.dataValues); // devolvemos el registro agregado!
  } catch (error){
    throw error;
  }
});

router.put("/:id", async (req, res) => {
  try {
    let data = await db.climas.findOne({
      where : { IdClima: req.params.id }
    });
    if (!data) { 
      res.status(404).json({ message: "Pronostico no encontrado" });
      return;
      }
      data.Maxima = req.body.Maxima,
      data.Minima = req.body.Minima,
      data.Fecha = req.body.Fecha,
      data.Lluvia = req.body.Lluvia,
      data.Humedad = req.body.Humedad
      await data.save();
      res.sendStatus(200);
    } catch (error) {
      throw error;
    }
});

// Con el método DELETE, borramos un registro de la tabla
router.delete("/:id", async (req, res) => {
  try {
    let data = await db.climas.findOne({
      where : { IdClima: req.params.id }
    })
    let filasBorradas = await db.climas.destroy({
      where : { IdClima: req.params.id }
    });
    if (filasBorradas == 1) res.status(200).json({Borrado : data});
    else res.sendStatus(400)
  } catch(error) {
    throw error;
  }
});

module.exports = router;