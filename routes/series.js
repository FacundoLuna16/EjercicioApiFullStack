const express = require("express");

const router = express.Router();

const db = require("../base-ORM/sequelize-init");

router.get("/", async function (req, res, next) {
  try {
    let data = await db.series.findAll();
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(500).send("Ha ocurrido un error.");
  }
});

//metodo get para obtener un registro por id
router.get("/:id", async function (req, res, next) {
  try {
    //buscamos el registro por id
    let item = await db.series.findOne({
      where: { IdSerie: req.params.id }
    });
    //mostramos el registro
    res.json({ item });
    //si no lo encuentra, mostramos un mensaje de error
  } catch (err) {
    console.log(err);
    res.status(500).send("Ha ocurrido un error.");
  }
});

//metodo post para agregar un registro de las series
router.post("/", async function (req, res, next) {
  try {
    let data = await db.series.create({
      titulo: req.body.Titulo,
      director: req.body.Director,
      year: req.body.Year,
      cantTemporadas: req.body.CantTemporadas,
      episodios: req.body.Episodios
    });
    res.status(200).json(data.dataValues); // devolvemos el registro agregado!
  } catch (error) {
    throw error;
  }
});

//metodo put para actualizar un registro de las series
router.put("/:id", async function (req, res, next) {
  try {
    let data = await db.series.findOne({
      where: { IdSerie: req.params.id }
    });
    if (!data) {
      res.status(404).json({ message: "Articulo no encontrado" });
      return;
    }
    data.titulo = req.body.titulo,
    data.director = req.body.director,
    data.year = req.body.year,
    data.cantTemporadas = req.body.cantTemporadas,
    data.episodios = req.body.episodios
    await data.save();
    res.sendStatus(200);
  } catch (error) {
    throw error;
  }
});

//metodo delete para eliminar un registro de las series
router.delete("/:id", async function (req, res, next) {
  try {
    let data = await db.series.findOne({
      where: { IdSerie: req.params.id }
    })
    let filasBorradas = await db.series.destroy({
      where: { IdSerie: req.params.id }
    });
    res.sendStatus(200);
  } catch (error) {
    throw error;
  }
});

module.exports = router;
