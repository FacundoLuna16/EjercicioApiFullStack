
const { Router }  = require('express');
const db = require("../base-ORM/sequelize-init");
const router = new Router();

router.get("/", async (req, res) => {
  let data = await db.peliculas.findAll();
  res.json(data);
});


router.get("/:id", async (req, res) => {
  let item = await db.peliculas.findOne({
    where: { IdPelicula: req.params.id}
  });
  res.json({item});
});

router.post("/", async (req, res) => {
  try{
    let data = await db.peliculas.create({
      titulo: req.body.titulo,
      director : req.body.director,
      year : req.body.year,
      rating : req.body.rating
    });
    res.status(200).json(data.dataValues); // devolvemos el registro agregado!
  } catch (error){
    throw error;
  }
});

router.put("/:id", async (req, res) => {
  try {
    let data = await db.peliculas.findOne({
      where : { IdPelicula: req.params.id }
    });
    if (!data) { 
      res.status(404).json({ message: "Articulo no encontrado" });
      return;
      }
      data.titulo = req.body.titulo,
      data.director = req.body.director,
      data.year = req.body.year,
      data.rating = req.body.rating
      await data.save();
      res.sendStatus(200);
    } catch (error) {
      throw error;
    }
});

router.delete("/:id", async (req, res) => {
  try {
    let data = await db.peliculas.findOne({
      where : { IdPelicula: req.params.id }
    })
    let filasBorradas = await db.peliculas.destroy({
      where : { IdPelicula: req.params.id }
    });
    if (filasBorradas == 1) res.status(200).json({Borrado : data});
    else res.sendStatus(400)
  } catch(error) {
    throw error;
  }
});

module.exports = router;
