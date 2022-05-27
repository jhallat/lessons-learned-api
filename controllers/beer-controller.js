const createDTO = (beer) => {
  return {
    // eslint-disable-next-line no-underscore-dangle
    key: beer._id,
    brandName: beer.brandName,
    style: beer.style,
    description: beer.description,
    rating: beer.rating ? beer.rating : 0,
  };
};

const beerController = (Beer) => {
  const post = (req, res) => {
    const beer = new Beer(req.body);
    if (!req.body.brandName) {
      res.status(400);
      return res.send("Brand name is required");
    }
    beer.save();
    res.status(201);
    return res.json(beer);
  };

  const get = (req, res) => {
    const query = {};
    if (req.query.beerName) {
      query.beerName = req.query.beerName;
    }
    Beer.find(query, (err, beers) => {
      if (err) {
        return res.send(err);
      }
      return res.json(beers.map((beer) => createDTO(beer)));
    });
  };
  return { post, get };
};

module.exports = beerController;
