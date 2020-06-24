const db = require("../models");
const BikeCase = db.bikecases;
const PoliceOfficer = db.policeofficers;
const Op = db.Sequelize.Op;

// Create and Save a new BikeCase
exports.create = (req, res) => {
  // Validate request
  if ((!req.body.model) && (!req.body.sn) && (!req.body.color) && (!req.body.place) && (!req.body.owner_name) && (!req.body.theft_dt)) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a BikeCase
  const bikecase = {
    model: req.body.model,
    sn: req.body.sn,
    color: req.body.color,
    place: req.body.place,
    owner_name: req.body.owner_name,
    theft_dt: req.body.theft_dt,
    open_case_dt: open_case_dt,
    close_case_dt: 0,
    policeofficer_id: policeofficer_id,
  };

  // Save BikeCase in the database
  BikeCase.create(bikecase)
    .then(data => {
      if (police_officer !== null) {
        police_officer.bikecase_id = data.id
        police_officer.save()
      }
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the BikeCase."
      });
    });
};

// Retrieve all BikeCases from the database.
exports.findAll = (req, res) => {
  const model = req.query.model;
  var condition = model ? { model: { [Op.iLike]: `%${model}%` } } : null;

  BikeCase.belongsTo(PoliceOfficer, { foreignKey: 'policeofficer_id' })
  BikeCase.findAll({
    where: condition, include: [{
      model: PoliceOfficer
    }]
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving bikecases."
      });
    });
};

// Find a single BikeCase with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  BikeCase.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving BikeCase with id=" + id
      });
    });
};

// Update a BikeCase by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  BikeCase.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "BikeCase was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update BikeCase with id=${id}. Maybe BikeCase was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating BikeCase with id=" + id
      });
    });
};

// Delete a BikeCase with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  BikeCase.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "BikeCase was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete BikeCase with id=${id}. Maybe BikeCase was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete BikeCase with id=" + id
      });
    });
};

// Delete all BikeCases from the database.
exports.deleteAll = (req, res) => {
  BikeCase.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} BikeCases were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all bikecases."
      });
    });
};
