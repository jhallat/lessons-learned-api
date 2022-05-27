const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
if (process.env.ENV === "test") {
  console.log("Connecting to test database");
  const db = mongoose.connect("mongodb://localhost/wine_test");
} else {
  console.log("Connection to production database");
  const db = mongoose.connect("mongodb://localhost/wine");
}

const bodyParser = require("body-parser");
const Wine = require("./models/wine");
const Beer = require("./models/beer");
const wineRouter = require("./routes/wine-router")(Wine);
const beerRouter = require("./routes/beer-router")(Beer);

const port = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api", wineRouter);
app.use("/api", beerRouter);
app.get("/", (req, res) => {
  res.send("Inner Critic API");
});

app.server = app.listen(port, () => {
  console.log(`Running on port ${port}`);
});

module.exports = app;
