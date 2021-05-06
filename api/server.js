require("dotenv").config();
const express = require("express");
const userRouter = require("./users/users-router");

const server = express();

process.env.API_KEY || "Francis";

server.use(express.json());

server.use("/api/users", userRouter);

server.get("*", (req, res) => {
  res.send(`<h1>Unknown path, please check address</h1>`);
});

module.exports = server;
