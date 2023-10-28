const AuthRouter=require("express").Router();
const UserModel = require("../models/users.model");
const { comparePasswords } =require("../authentication/auth.js");
var mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const saltRounds = 10;




AuthRouter.post('/forgotpassword', async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });

    if (user) {
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      user.password = hashedPassword;
      const result = await user.save();

      if (result && result._id) {
        return res.status(200).json({
          message: "Password updated successfully!",
          success:true,
          data: result,
        });
      } else {
        return res.status(401).json({
          message: "Alas! Error updating the password.",
          success:false
        });
      }
    } else {
      return res.status(404).json({
        message: "User not found with the provided email.",
        success:false
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: err,
    });
  }
});

module.exports = AuthRouter;



AuthRouter.post("/signin", async (req, res, next) => {
    const { email, password } = req.body;
    UserModel.findOne({ email: email })
      .then(async (cursor) => {
        if (cursor && cursor._id) {
          const isMatching = await comparePasswords(password, cursor.password);
          if (isMatching) {
            
            return res.status(200).json({
              success: true,
            
              message: "Login Successful!!",
            });
          } else {
            return res.status(200).json({
              success: false,
              message: "Email or Password is wrong, Try Again!!",
            });
          }
        } else {
          return res.status(200).json({
            success: true,
            message:
              "Account Does not Exists, Please create your account to continue!!",
          });
        }
      })
      .catch((err) => {
        return res.status(401).json({
          success: false,
          message: "Error Fetching Users Data!!!",
          error: err,
        });
      });
  });






AuthRouter.post("/signup", (req, res, next) => {
    const data = req.body;
    bcrypt.hash(req.body.password, saltRounds).then(function (hash) 
    {
      if (hash) {
        const User = new UserModel({ ...data, password: hash });
        User.save()
          .then((result) => {
            if (result && result._id) {
              return res.status(200).json({
                message: "User Created Successfully!!",
                data: result,
              });
            }
          })
          .catch((err) => {
            return res.status(401).json({
              message: "Alas! Error Creating User!!",
              error: err,
            });
          });
      } else {
        return res.status(400).json({
          message: "Password is not in required format",
        });
      }
    });
  });
  
  module.exports=AuthRouter;