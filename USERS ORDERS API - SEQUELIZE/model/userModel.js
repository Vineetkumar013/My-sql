const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../config/sqlConnect');
const bcrypt = require('bcrypt');

const UserModel = sequelize.define('userdb', {
  id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
  name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

UserModel.beforeSave(async function (user) {
  if (user) {
    const salt = await bcrypt.genSaltSync(10);
    user.password = await bcrypt.hash(user.password, salt);
  }
})

UserModel.prototype.isPasswordMatched = async function (password) {
  return await bcrypt.compare(password, this.password);
}

sequelize
  .sync()
  .then(() => {
    console.log('Sequelize sync successful!');
  })
  .catch((error) => {
    console.error('Sequelize sync failed:', error);
  })



module.exports = UserModel;








// UserModel.beforeSave(async function (user) {
//   if (user.changed('password')) {
//     const salt = await bcrypt.genSalt(10);
//     user.password = await bcrypt.hash(user.password, salt);
//   }
// });

// UserModel.prototype.isPasswordMatched = async function (enteredPassword) {
//   return await bcrypt.compare(enteredPassword, this.password);
// };

// sequelize
//   .sync()
//   .then(() => {
//     console.log('Sequelize sync successful!');
//   })
//   .catch((error) => {
//     console.error('Sequelize sync failed:', error);
//   });