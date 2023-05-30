const { Router }  = require('express');
const db = require("../base-ORM/sequelize-init");
const router = new Router();

router.get("/", async (req, res) => {
  let data = await db.jugadores.findAll();
  res.json(data);
});


router.get("/:id", async (req, res) => {
  let item = await db.jugadores.findOne({
    where: { idJugador: req.params.id}
  });
  res.json({item});
});

router.post("/", async (req, res) => {
  try{
    let data = await db.jugadores.create({
        nombre: req.body.nombre,
        pais : req.body.pais,
        fechaNacimiento : req.body.fechaNacimiento,
        eloMax : req.body.eloMax,
        fechaEloMax : req.body.fechaEloMax
    });
    res.status(200).json(data.dataValues); // devolvemos el registro agregado!
  } catch (error){
    throw error;
  }
});

router.put("/:id", async (req, res) => {
  try {
    let data = await db.jugadores.findOne({
      where : { idJugador: req.params.id }
    });
    if (!data) { 
      res.status(404).json({ message: "Jugador no encontrado" });
      return;
      }
      data.nombre = req.body.nombre,
      data.pais = req.body.pais,
      data.fechaNacimiento = req.body.fechaNacimiento,
      data.eloMax = req.body.eloMax,
      data.fechaNacimiento = req.body.fechaEloMax
      await data.save();
      res.sendStatus(200);
    } catch (error) {
      throw error;
    }
});

// Con el método DELETE, borramos un registro de la tabla
router.delete("/:id", async (req, res) => {
  try {
    let data = await db.jugadores.findOne({
      where : { idJugador: req.params.id }
    })
    let filasBorradas = await db.jugadores.destroy({
      where : { idJugador: req.params.id }
    });
    if (filasBorradas == 1) res.status(200).json({Borrado : data});
    else res.sendStatus(400)
  } catch(error) {
    throw error;
  }
});

module.exports = router;