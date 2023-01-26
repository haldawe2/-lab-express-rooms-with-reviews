const mongoose = require("mongoose");
const { Schema, model } = require("mongoose");
mongoose.set('strictQuery', true);


const roomSchema = new Schema({
    name: { type: String },
    description: { type: String },
    imageUrl: { type: String },
    owner: { type: Schema.Types.ObjectId, ref: "User" },
    reviews: []
  });

const Room = model("Room", roomSchema);

module.exports = Room;