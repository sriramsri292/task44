const mongoose = require("mongoose");
const { Schema } = mongoose;


const UserSchema = new Schema({
  firstName: {
    type: String,
    require:true,
  },
  lastName: String,
  name: String,
  dob: Date,
  email: String,
  phoneNumber: String,
  gender: String,
  age: Number,
  password: {
    type: String,
    require:true,
  },
  addressDetails: {
    addressLine1: String,
    addressLine2: String,
    city: String,
    state: String,
    pinCode: Number,
  },
  createdAt: {
    type: Date,
    default: new Date().toString(),
  },
  updatedAt: {
    type: Date,
    default: new Date().toString(),
  },
});

module.exports = mongoose.model("users", UserSchema);