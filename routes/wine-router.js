/* eslint-disable no-param-reassign */
const express = require("express");
const wineController = require("../controllers/wine-controller");

const createDTO = (wine) => {
  return {
    key: wine["_id"],
    brandName: wine.brandName,
    vintage: wine.vintage,
    wineName: wine.wineName,
    description: wine.description,
    rating: wine.rating ? wine.rating : 0,
  };
};

const routes = (Wine) => {
  const wineRouter = express.Router();
  const controller = wineController(Wine);
  wineRouter.route("/wine").post(controller.post).get(controller.get);
  wineRouter.use("/wine/:wineId", (req, res, next) => {
    Wine.findById(req.params.wineId, (err, wine) => {
      if (err) {
        return res.send(err);
      }
      if (wine) {
        req.wine = wine;
        return next();
      }
      return res.sendStatus(404);
    });
  });
  wineRouter
    .route("/wine/:wineId")
    .get((req, res) => res.json(createDTO(req.wine)))
    .put((req, res) => {
      const { wine } = req;
      wine.brandName = req.body.brandName;
      wine.vintage = req.body.vintage;
      wine.wineName = req.body.wineName;
      wine.description = req.body.description;
      wine.rating = req.body.rating;
      wine.save((saveErr, savedWine) => res.json(createDTO(savedWine)));
    })
    .delete((req, res) => {
      req.wine.remove((err) => {
        if (err) {
          return res.send(err);
        }
        return res.sendStatus(204);
      });
    });

  return wineRouter;
};

module.exports = routes;
