const express = require("express");
const { genrateToken } = require("../config/jwtToken");
const { genrateRefreshToken } = require("../config/refreshToken");
const userRouter = express.Router();
const  UserModel = require('../model/userModel');



////////////////////////////////////////////// REGISTER /////////////////////////////////////

userRouter.post("/register", async (req, res) => {
  const email = req.body.email;
  const findUser = await UserModel.findOne({where:{ email: email }});
  if (!findUser) {
    //Create New User
    const newUser = await UserModel.create(req.body);
    res.json(newUser);
  } else {
    // User Already Exists
    throw new Error("User Already Exists");
  }
})


////////////////////////////////////////////// LOGIN /////////////////////////////////////
userRouter.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const findUser = await UserModel.findOne({ where: { email: email } });
  if (findUser && (await findUser.isPasswordMatched(password))) {
    const refreshToken = await genrateRefreshToken(findUser?._id);
    await findUser.update({refreshToken});
    const token = genrateToken(findUser?._id);
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 72 * 60 * 60 * 1000,
    }).cookie("Token", token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    }).json({findUser});
  } else {
    res.status(401).json({ message: "Invalid email or password" });
  }
});



module.exports ={
    userRouter
}