const should = require("should");
const sinon = require("sinon");
const wineController = require("../controllers/wine-controller");

describe("Wine Controller Tests", () => {
  describe("Post", () => {
    it("should not allow empty brand name on post", () => {
      const Wine = function (wine) {
        this.save = () => {};
      };

      const req = {
        body: {
          wineName: "Cabernet",
        },
      };

      const res = {
        status: sinon.spy(),
        send: sinon.spy(),
        json: sinon.spy(),
      };

      const controller = wineController(Wine);
      controller.post(req, res);
      res.status
        .calledWith(400)
        .should.equal(true, `Bad Status ${res.status.args[0][0]}`);
      res.send.calledWith("Brand name is required").should.equal(true);
    });
  });
});
