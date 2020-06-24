module.exports = (sequelize, Sequelize) => {
  const PoliceOfficer = sequelize.define("policeofficer", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    bikecase_id: {
      type: Sequelize.INTEGER
    }
  });

  return PoliceOfficer;
};
