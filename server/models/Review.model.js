const mongoose = require("mongoose");
const { Schema, model } = require("mongoose");
mongoose.set('strictQuery', true);


const reviewSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "User" },
    comment: { type: String, maxlength: 200 }
  });

const Review = model("Review", reviewSchema);

module.exports = Review;