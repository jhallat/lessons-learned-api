const createDTO = (wine) => {
  return {
    // eslint-disable-next-line no-underscore-dangle
    key: wine._id,
    brandName: wine.brandName,
    vintage: wine.vintage,
    wineName: wine.wineName,
    description: wine.description,
    rating: wine.rating ? wine.rating : 0,
  };
};

const wineController = (Wine) => {
  const post = (req, res) => {
    const wine = new Wine(req.body);
    if (!req.body.brandName) {
      res.status(400);
      return res.send("Brand name is required");
    }
    wine.save();
    res.status(201);
    return res.json(wine);
  };

  const get = (req, res) => {
    const query = {};
    if (req.query.wineName) {
      query.wineName = req.query.wineName;
    }
    Wine.find(query, (err, wines) => {
      if (err) {
        return res.send(err);
      }
      return res.json(wines.map((wine) => createDTO(wine)));
    });
  };
  return { post, get };
};

module.exports = wineController;
