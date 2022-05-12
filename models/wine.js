const mongoose = require('mongoose');

const {Schema} = mongoose;

const wineModel = new Schema(
  {
    brandName: {type:String},
    wineName: {type:String},
    vintage: {type:Number},
    description: {type:String},
    rating: {type:Number}
  }
);

module.exports = mongoose.model('Wine', wineModel);