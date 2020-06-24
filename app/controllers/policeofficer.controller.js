const db = require("../models");
const PoliceOfficer = db.policeofficers;
const BikeCase = db.bikecases;
const Op = db.Sequelize.Op;

// Create and Save a new PoliceOfficer
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a PoliceOfficer
  const policeofficer = {
    name: req.body.name,
    bikecase_id: 0
  };

  // Save PoliceOfficer in the database
  PoliceOfficer.create(policeofficer)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the PoliceOfficer."
      });
    });
};

// Retrieve all PoliceOfficers from the database.
exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { [Op.iLike]: `%${name}%` } } : null;

  PoliceOfficer.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving policeofficers."
      });
    });
};

// Find a single PoliceOfficer with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  PoliceOfficer.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving PoliceOfficer with id=" + id
      });
    });
};

// Update a PoliceOfficer by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  PoliceOfficer.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "PoliceOfficer was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update PoliceOfficer with id=${id}. Maybe PoliceOfficer was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating PoliceOfficer with id=" + id
      });
    });
};

// Delete a PoliceOfficer with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  PoliceOfficer.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "PoliceOfficer was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete PoliceOfficer with id=${id}. Maybe PoliceOfficer was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete PoliceOfficer with id=" + id
      });
    });
};

// Delete all PoliceOfficers from the database.
exports.deleteAll = (req, res) => {
  PoliceOfficer.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} PoliceOfficers were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all policeofficers."
      });
    });
};

// Close current Bike Case
exports.closeBikeCase = (req, res) => {
  const id = req.body.id;
  if (!req.body.id) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  PoliceOfficer.findByPk(id)
    .then(data => {
      const po = data;
      if (data.bikecase_id === 0) {
        res.status(500).send({
          message: "Error close current Bike Case PoliceOfficer with id=" + id
        });
        return;
      }

      // Find and close Bike Case
      BikeCase.findByPk(po.bikecase_id)
        .then(data => {
          data.close_case_dt = Date.now();
          data.save();
        })
        .catch(err => {
        });
      
      // Find free Bike Case
      BikeCase.findOne({ where: { policeofficer_id: { [Op.eq]: 0 } } }).then(data => {
        if (data !== null) {
          po.bikecase_id = data.id;
          data.policeofficer_id = po.id;
          data.open_case_dt = Date.now();
          data.save();
        } else {
          po.bikecase_id = 0;
        }
        po.save().then(data => {
          res.send(data);
        });
      })
      .catch(err => {
        res.status(500).send({
          message: "Error close current Bike Case PoliceOfficer with id=" + id
        });
      });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error close current Bike Case PoliceOfficer with id=" + id
      });
    });
};
