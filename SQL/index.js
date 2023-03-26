const express = require("express");
const { Sequelize, DataTypes } = require('sequelize')

const app = express();

const sequelize = new Sequelize("student", "root", "Vineet@@013", {
    host: "localhost",
    dialect : "mysql",
    
})

sequelize.authenticate()
.then(() => console.log("connection successfull"))
.catch ((err) => console.log("connection failed"));


const User = sequelize.define("users", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(32),
        allowNull: false,

    },
    email: {
        type: DataTypes.STRING(32),
        allowNull: false,
        unique: true
    }
})

sequelize.sync().then(() => {
User.bulkCreate([
    // {
    //     name: 'chaitanya',
    //     email: 'chaitanya@gmail.com'
    // },
    // {
    //     name: 'mayank',
    //     email: 'mayank@gmail.com'
    // }
]).then(() => {
    console.log('user created successfully')
})
    User.findAll().then((data) => console.log(data))
})
.catch((err) => console.log('failed to create the table'))

// async function insertUser(user) {
//     await User.create(user)
// }


// app.get("/", (req, res) => {

// })

const PORT = 8484;
app.listen(PORT, () => {
    console.log(`server run on ${PORT}`)
})