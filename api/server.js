require("dotenv").config();
const path = require("path");
const express = require("express");
const userRouter = require("./users/users-router");

const server = express();

process.env.API_KEY || "Francis";

server.use(express.static(path.join(__dirname, "../client/build")));
server.use(express.json());

server.use("/api/users", userRouter);

server.get("/api/*", (req, res) => {
  res.send(`<h1>Unknown path, please check address</h1>`);
});

server.use("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});

module.exports = server;
