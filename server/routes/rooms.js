const router = require("express").Router();
const User = require("../models/User.model");
const Room = require("../models/Room.model");
const Review = require("../models/Review.model");
const { route } = require(".");

// GET rooms route
router.get("/", (req, res, next) => {
  res.render("./rooms/rooms");
});

//GET create room route
router.get("/create", (req, res, next) => {
  res.render("./rooms/rooms");
});


//POST create room route
router.get("/create", async (req, res, next) => {
  const {name, description, imageURL} = req.body;
  const owner = req.session.user.fullName;
});

module.exports = router;
