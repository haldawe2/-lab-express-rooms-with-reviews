const mongoose = require("mongoose");
const { Schema, model } = require("mongoose");
mongoose.set('strictQuery', true);


const userSchema = new Schema(
  {
    email: String,
    hashedPassword: String,
    fullName: String
  },
  {
    timestamps: true
  }
);

const User = model("User", userSchema);

module.exports = User;
