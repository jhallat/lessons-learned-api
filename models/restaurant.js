const mongoose = require("mongoose");

const { Schema } = mongoose;

const addressModel = new Schema({
  street: { type: String },
  city: { type: String },
  state: { type: String },
});

const restaurantModel = new Schema({
  name: { type: String },
  address: { type: addressModel },
  description: { type: String },
  favorites: { type: String },
  itemsToAvoid: { type: String },
});

module.exports = mongoose.model("Restaurant", restaurantModel);
