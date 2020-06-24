module.exports = app => {
  const bikecases = require("../controllers/bikecase.controller.js");

  var router = require("express").Router();

  // Create a new Bike Case
  router.post("/", bikecases.create);

  // Retrieve all Bike Cases
  router.get("/", bikecases.findAll);

  // Retrieve a single Bike Case with id
  router.get("/:id", bikecases.findOne);

  // Update a Bike Case with id
  router.put("/:id", bikecases.update);

  // Delete a Bike Case with id
  router.delete("/:id", bikecases.delete);

  // Create a new Bike Case
  router.delete("/", bikecases.deleteAll);

  app.use("/api/bikecases", router);
};
