const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send({ status: 1, msg: "Ok" });
});

app.get("/download/:filename", (req, res) => {
  const { pass } = req.query;
  if (pass !== "1234") {
    res.send({ status: 0, msg: "password not matching" });
    return;
  }
  res.setHeader("Content-Type", "application/txt");
  res.setHeader("Content-Disposition", "attachment; filename=app.txt");
  res.sendFile(path.join(__dirname, "./public", "app.txt"));
});

app.listen(4080, () => console.log("Server Okay"));
