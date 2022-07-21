const express = require("express");
const beerController = require("../controllers/beer-controller");

const createDTO = (beer) => {
  return {
    // eslint-disable-next-line no-underscore-dangle
    key: beer._id,
    brewer: beer.brewer,
    brandName: beer.brandName,
    style: beer.style,
    description: beer.description,
    rating: beer.rating ? beer.rating : 0,
  };
};

const routes = (Beer) => {
  const beerRouter = express.Router();
  const controller = beerController(Beer);
  beerRouter.route("/beer").post(controller.post).get(controller.get);
  beerRouter.use("/beer/:beerId", (req, res, next) => {
    Beer.findById(req.params.beerId, (err, beer) => {
      if (err) {
        return res.send(err);
      }
      if (beer) {
        req.beer = beer;
        return next();
      }
      return res.sendStatus(404);
    });
  });
  beerRouter
    .route("/beer/:beerId")
    .get((req, res) => res.json(createDTO(req.beer)))
    .put((req, res) => {
      const { beer } = req;
      beer.brewer = req.body.brewer;
      beer.brandName = req.body.brandName;
      beer.style = req.body.style;
      beer.description = req.body.description;
      beer.rating = req.body.rating;
      beer.save((saveErr, savedBeer) => res.json(createDTO(savedBeer)));
    })
    .delete((req, res) => {
      req.beer.remove((err) => {
        if (err) {
          return res.send(err);
        }
        return res.sendStatus(204);
      });
    });

  return beerRouter;
};

module.exports = routes;
