module.exports = app => {
  const policeofficers = require("../controllers/policeofficer.controller.js");

  var router = require("express").Router();

  // Create a new Bike Case
  router.post("/", policeofficers.create);

  // Retrieve all Bike Cases
  router.get("/", policeofficers.findAll);

  // Retrieve a single Bike Case with id
  router.get("/:id", policeofficers.findOne);

  // Update a Bike Case with id
  router.put("/:id", policeofficers.update);

  // Delete a Bike Case with id
  router.delete("/:id", policeofficers.delete);

  // Create a new Bike Case
  router.delete("/", policeofficers.deleteAll);

  app.use("/api/policeofficers", router);
};
