
const { Router }  = require('express');
const db = require("../base-ORM/sequelize-init");
const router = new Router();

router.get("/", async (req, res) => {
  let data = await db.peliculas.findAll();
  res.json(data);
});


router.get("/:id", async (req, res) => {
  res.json({});
});

router.post("/", (req, res) => {
  res.json({});
});

router.put("/:id", (req, res) => {
  res.json({});
});

router.delete("/:id", (req, res) => {
  res.json({});
});

module.exports = router;
