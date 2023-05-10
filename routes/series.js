const express = require("express");

const router = express.Router();

const db = require("../base-ORM/sequelize-init");

router.get("/", async function (req, res, next) {

  try {
    let data = await db.series.findAll();
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(500).send("Ha ocurrido un error en el servidor.");
  }
});

module.exports = router;
