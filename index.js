const express = require("express");
const morgan = require("morgan");

// ~Rutas importadas.
const peliculasRoutes = require("./routes/peliculas");
const seriesRoutes = require("./routes/series");

const app = express();
require("./base-ORM/sqlite-init.js");

// settings
app.set("port", process.env.PORT || 4000);

// middlewares
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// routes
app.use("/api/peliculas", peliculasRoutes);
app.use("/api/series", seriesRoutes);


// starting the server
app.listen(app.get("port"), () => {
  console.log(`Server on port ${app.get("port")}`);
});
