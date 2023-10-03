const express = require("express");
const cors = require("cors");
const path = require("path");
const db = require("./db");
const sequelize = require("sequelize");

// Using Express Framework
const app = express();
const router = express.Router();

// Using Req Body & JSON Res
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Using Static Routing
app.use(express.static(__dirname + "/static"));
app.use("/", router);

// Routing
// Routing Get Homepage
router.get("/", (req, res, next) => {
  res.redirect("http://localhost:4000/index.html");
});

// Routing Get Data Feedback
router.get("/testimoni", function (req, res, next) {
  db.data
    .findAll()
    .then(function (data) {
      res.json({
        data: data,
      });
    })
    .catch(function (error) {
      console.error("Error:", error);
      res.status(500).json({
        message: "Terjadi kesalahan saat menarik data.",
      });
    });
});

//Routing POST Homepage
router.post("/home", (req, res, next) => {
  if (req.body.rating == "" || req.body.nama == "" || req.body.email == "" || req.body.phone == "" || req.body.message == "") {
    res.status(400).json({
      message: "EMPTY FIELD",
    });
    return;
  }
  db.data
    .create({
      rating: req.body.rating,
      nama: req.body.nama,
      email: req.body.email,
      phone: req.body.phone,
      message: req.body.message,
    })
    .then(function () {
      res.redirect("http://localhost:4000/");
    })
    .catch(function (err) {
      console.log(err);
      res.status(500).json({
        message: err,
      });
    });
});

// Routing Get Checkup Page
router.get("/checkup", function (req, res, next) {
  res.redirect("http://localhost:4000/CheckUp.html");
});

// Routing Get About Us Page
router.get("/aboutus", function (req, res, next) {
  res.redirect("http://localhost:4000/AboutUs.html");
});

// Running Server
const port = 4000;
app.listen(port, function () {
  db.conn
    .authenticate()
    .then(function () {
      console.log("Database terhubung");
    })
    .catch(function (err) {
      console.log("Database gagal terhubung karena:", err);
    });
  console.log("server start on", port);
});
