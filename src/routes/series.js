const express = require("express");

const router = express.Router();

const db = require("../../base-ORM/sequelize-init");

router.get("/", async function (req, res, next) {
  let data = await db.series.findAll({
    attributes: ["IdSerie", "Titulo"],
  });
  res.json(data);
});

module.exports = router;
