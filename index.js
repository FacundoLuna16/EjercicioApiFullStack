const express = require("express");
const morgan = require("morgan");

// routes import
const peliculasRoutes = require("./routes/peliculas");
const seriesRoutes = require("./routes/series");
const climaRoutes = require("./routes/clima");

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
app.use("/api/clima", climaRoutes);


// starting the server
app.listen(app.get("port"), () => {
  console.log(`Server on port ${app.get("port")}`);
});

// q: como pruebo que funciona?
// a: con postman, o con insomnia, o con curl