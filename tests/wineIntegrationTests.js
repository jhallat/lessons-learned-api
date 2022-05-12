require("should");

const request = require("supertest");
const mongoose = require("mongoose");

process.env.ENV = "test";

const app = require("../app");
const Wine = mongoose.model("Wine");
const agent = request.agent(app);

describe("Wine Crud Test", () => {
  it("should allow a wine to be posted and return _id", (done) => {
    const winePost = {
      brandName: "Test Wine",
      vintage: 2022,
      wineName: "Merlot",
      rating: 5,
      description: "Testing the wine post",
    };
    agent
      .post("/api/wine")
      .send(winePost)
      .expect(200)
      .end((err, results) => {
        results.body.should.have.property("_id");
        done();
      });
  });

  afterEach((done) => {
    Wine.deleteMany({}).exec();
    done();
  });

  after((done) => {
    mongoose.connection.close();
    app.server.close(done());
  });
});
