const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const carsRouter = require("./cars/carsRouter");

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());
server.use("/api/cars", carsRouter);

module.exports = server;
