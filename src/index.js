import express from "express";
import morgan from "morgan";

import moviesRoutes from "./routes/movies.js";
import usersRoutes from "./routes/users.js";

const app = express();
require("../base-ORM/sqlite-init.js")

// settings
app.set("port", process.env.PORT || 4000);

// middlewares
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


// routes
app.use("/api/movies", moviesRoutes);
app.use("/api/users", usersRoutes);

// starting the server
app.listen(app.get("port"), () => {
  console.log(`Server on port ${app.get("port")}`);
});
