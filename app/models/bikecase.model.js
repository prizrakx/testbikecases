module.exports = (sequelize, Sequelize) => {
  const BikeCase = sequelize.define("bikecase", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    model: {
      type: Sequelize.STRING,
      allowNull: false
    },
    sn: {
      type: Sequelize.STRING
    },
    color: {
      type: Sequelize.STRING,
      allowNull: false
    },
    place: {
      type: Sequelize.STRING,
      allowNull: false
    },
    owner_name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    theft_dt: {
      type: Sequelize.DATE,
      allowNull: false
    },
    open_case_dt: {
      type: Sequelize.DATE
    },
    close_case_dt: {
      type: Sequelize.DATE
    },
    policeofficer_id: {
      type: Sequelize.INTEGER
    }
  });

  return BikeCase;
};
