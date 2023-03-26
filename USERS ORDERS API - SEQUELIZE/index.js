const mysql2 = require("mysql2");
const express = require("express");
const cookieparser = require("cookie-parser")
const {Sequelize} = require("sequelize");
const app = express();


app.use(express.json());
app.use(cookieparser())

const { sequelize } = require("./config/sqlConnect");
const { userRouter } = require("./routes/userRoute");
const {productRouter } = require("");

app.use("/user", userRouter);
app.use("/product", productRouter)

const PORT = 8081;
app.listen(PORT, () => {
  console.log("Server on port 8081");
});
