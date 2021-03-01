require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();

// Change port for Heroku
const PORT = process.env.PORT || 9000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Establish DB connection
const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_KEY = process.env.DB_KEY;
const mongoAtlas =
  "mongodb+srv://" + DB_USER + ":" + DB_KEY + "@" + DB_HOST + "/dietDB";
const mongoLocal = "mongodb://localhost:27017/dietDB";

mongoose.connect(/*mongoAtlas ||*/ mongoLocal, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  connectTimeoutMS: 10000,
});

// CREATE DIET SCHEMA
const dietSchema = new mongoose.Schema(
  {
    userID: {
      type: String,
    },
    weight: {
      type: Number,
      required: [true, "Bitte Gewicht angeben"],
      minlength: 1,
      maxlength: 3,
      trim: true,
    },
    date: {
      type: String
    },
  },
  { collection: "weightData" }
);

// CREATE SINGLE MODEL
const Weight = mongoose.model("Weight", dietSchema);

// ROUTE TO GET WEIGHT DATA
app.get("/api/weightData/:userID", (req, res) => {
  // USE CURRENT USER ID
  Weight.find({ userID: req.params.userID }, function (err, dietDB) {
    if (err) {
      res.status(400).json({ error: err });
    } else {
      res.json(dietDB);
    }
  });
});

// ROUTE TO ADD WEIGHT
app.post("/api/weightData/:userID", (req, res) => {
  const newWeight = new Weight(req.body);

  newWeight.save((err) => {
    if (err) {
      res.status(400).json({ error: err });
    } else {
      res.status(200).json("Weight saved successfully.");
    }
  });
});

// PRODUCTION/HEROKU
// Before app.listen, send index.html to client
if (process.env.NODE_ENV === "production") {
  
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(PORT, function () {
  console.log("Server started on port: " + PORT);
});
