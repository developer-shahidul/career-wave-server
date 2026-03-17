require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();
const routes = require("./routes");
const jwtRoutes = require("./utils/jwt");

//middleware
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  }),
);
app.use(cookieParser());
app.use(express.json());
app.use("/", routes);
app.use("/", jwtRoutes);
module.exports = app;
