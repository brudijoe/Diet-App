require("dotenv").config();
const express  = require("express");
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
 
// ROUTE TO GET WEIGHT DATA
app.get("/api/weight", (req, res) => {

})
 
// ROUTE TO ADD WEIGHT
app.post("/api/weight/add", (req, res) => {

});


// production/heroku
// Before app.listen, send index.html to client
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
 
app.listen(PORT, function() {
  console.log("Server started on port: " + PORT);
});