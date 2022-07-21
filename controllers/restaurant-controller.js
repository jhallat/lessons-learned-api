const createDTO = (restaurant) => {
  return {
    key: restaurant._id,
    name: restaurant.name,
    address: restaurant.address,
  };
};

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
