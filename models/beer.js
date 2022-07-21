const mongoose = require("mongoose");

const { Schema } = mongoose;

const beerModel = new Schema({
  brewer: { type: String },
  brandName: { type: String },
  style: { type: String },
  description: { type: String },
  rating: { type: Number },
});

module.exports = mongoose.model("Beer", beerModel);
