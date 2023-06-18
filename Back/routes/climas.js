const { Router } = require('express');
const db = require("../base-ORM/sequelize-init");
const router = new Router();
const { Op } = require("sequelize");

router.get("/", async (req, res) => {
  try {
    let where = {};
    // Si se envía el parámetro "Lluvia" en la query string, filtramos por ese valor
    if (req.query.Lluvia) {
      where.Lluvia = {
        [Op.like]: "%" + req.query.Lluvia + "%",
      };
    }
    let data = await db.climas.findAndCountAll({
      order: [["IdClima", "ASC"]],
      where,
    });
    res.json(data.rows);
  }  catch (err) {
    console.log(err);
    res.status(500).send("Ha ocurrido un error.");
  }
});

router.get("/:id", async (req, res) => {
  let item = await db.climas.findOne({
    where: { IdClima: req.params.id }
  });
  res.json(item);
});

router.post("/", async (req, res) => {
  try {
    let data = await db.climas.create({
      Maxima: req.body.Maxima,
      Minima: req.body.Minima,
      Fecha: req.body.Fecha,
      Lluvia: req.body.Lluvia,
      Humedad: req.body.Humedad
    });
    res.status(200).json(data.dataValues); // devolvemos el registro agregado!
  } catch (error) {
    throw error;
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    let data = await db.climas.findOne({
      where: { IdClima: req.params.id }
    });
    if (!data) {
      res.status(404).json({ message: "Pronostico no encontrado" });
      return;
    }
    data.Maxima = req.body.Maxima;
    data.Minima = req.body.Minima;
    data.Fecha = req.body.Fecha;
    data.Lluvia = req.body.Lluvia;
    data.Humedad = req.body.Humedad;
    await data.save();
    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async function (req, res, next) {
  try {
    let data = await db.climas.findOne({
      where: { IdClima: req.params.id }
    });
    if (!data) {
      res.status(404).json({ message: "Pronostico no encontrado" });
      return;
    }
    await data.destroy();
    res.sendStatus(200);
  } catch (error) {
    throw error;
  }
});


module.exports = router;
