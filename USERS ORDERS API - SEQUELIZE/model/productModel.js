const {Sequelize,DataTypes} =  require("sequelize")
const {sequelize} = require("../config/sqlConnect")


const Productmodel = sequelize.define("ordertb",{
    productname:{
        type:DataTypes.STRING,
        allownull:false
    },
    productprice:{
        type:DataTypes.STRING,
        allownull:false
    }
})
sequelize.sync().then(()=>console.log("Product Sync Success !"))
.catch((error)=> console.log("Failed to Product Sync !"))

module.exports ={
    Productmodel
}
