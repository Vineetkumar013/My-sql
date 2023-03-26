const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("sequelizeapp", "root", "Vineet@@013",{
  host: "localhost",
  dialect: "mysql",
});

sequelize
  .authenticate()
  .then(() => console.log("Connected to mysql Database"))
  .catch((error) => console.log("failed to mysql Database"));

module.exports = {
  sequelize,
};
