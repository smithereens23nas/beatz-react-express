///////////////////////////////
// DEPENDENCIES
////////////////////////////////
// get .env variables
require("dotenv").config();
// pull PORT from .env, give default value of 3000
// pull MONGODB_URL from .env
const { PORT = 3000, MONGODB_URL } = process.env;
// import express
const express = require("express");
// create application object
const app = express();
// import mongoose
const mongoose = require("mongoose");
// import middlware
const cors = require("cors");
const morgan = require("morgan");

///////////////////////////////
// DATABASE CONNECTION
////////////////////////////////
// Establish Connection
mongoose.connect(MONGODB_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
// Connection Events
mongoose.connection
  .on("open", () => console.log("Your are connected to mongoose"))
  .on("close", () => console.log("Your are disconnected from mongoose"))
  .on("error", (error) => console.log(error));

///////////////////////////////
// MODELS
////////////////////////////////
const SongSchema = new mongoose.Schema({
    artist: String,
    image: String,
    song: String,
    album: String
});

const Songs = mongoose.model("Songs", SongSchema);

///////////////////////////////
// MiddleWare
////////////////////////////////
app.use(cors()); // to prevent cors errors, open access to all origins
app.use(morgan("dev")); // logging
app.use(express.json()); // parse json bodies

///////////////////////////////
// ROUTES
////////////////////////////////
// create a test route
app.get("/", (req, res) => {
  res.send("hello world");
});

// PEOPLE INDEX ROUTE
app.get("/songs", async (req, res) => {
  try {
    // send all people
    res.json(await Songs.find({}));
  } catch (error) {
    //send error
    res.status(400).json(error);
  }
});

// PEOPLE CREATE ROUTE
app.post("/songs", async (req, res) => {
  try {
    // send all people
    res.json(await Songs.create(req.body));
  } catch (error) {
    //send error
    res.status(400).json(error);
  }
});

// PEOPLE UPDATE ROUTE
app.put("/songs/:id", async (req, res) => {
  try {
    // send all people
    res.json(
      await Songs.findByIdAndUpdate(req.params.id, req.body, { new: true })
    );
  } catch (error) {
    //send error
    res.status(400).json(error);
  }
});

// PEOPLE DELETE ROUTE
app.delete("/songs/:id", async (req, res) => {
  try {
    // send all people
    res.json(await Songs.findByIdAndRemove(req.params.id));
  } catch (error) {
    //send error
    res.status(400).json(error);
  }
});

///////////////////////////////
// LISTENER
////////////////////////////////
app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));