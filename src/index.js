const express = require("express");
const morgan = require("morgan");


const peliculasRoutes = require("./routes/peliculas");
const seriesRoutes = require("./routes/series");

const app = express();
app.use(express.json());
require("../base-ORM/sqlite-init.js");

// settings
app.set("port", process.env.PORT || 4000);

// middlewares
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));


// routes
app.use("/api/peliculas", peliculasRoutes);
app.use("/api/series", seriesRoutes);


// starting the server
app.listen(app.get("port"), () => {
  console.log(`Server on port ${app.get("port")}`);
});
