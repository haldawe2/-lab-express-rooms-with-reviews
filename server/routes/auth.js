const router = require("express").Router();
const User = require("../models/User.model");
const bcrypt = require("bcrypt");
const saltRounds = 6;

// GET signup route
router.get("/signup", function (req, res, next) {
  res.render("auth/signup");
});

//POST signup route
router.post("/signup", async function (req, res, next) {
  const { email, password, fullName } = req.body;
  const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{10,}$/;
  if (!email || !password || !fullName) {
    res.render("auth/signup", { error: "All fields are necessary." });
    return;
  }
  try {
    const userInDB = await User.findOne({ email: email });
    if (userInDB) {
      res.render("auth/signup", {
        error: `There already is a user with email ${email}`,
      });
      return;
    } else if (!passwordRegex.test(password)) {
      res.render("auth/signup", {
        error: `Password must have an uppercase letter, a lowercase letter, a number and at least 10 characters`,
      });
    } else {
      const salt = await bcrypt.genSalt(saltRounds);
      const hashedPassword = await bcrypt.hash(password, salt);
      await User.create({
        email,
        hashedPassword,
        fullName,
      });
      res.redirect("/auth/login");
    }
  } catch (error) {
    next(error);
  }
});

// GET login route
router.get("/login", (req, res, next) => {
  res.render("./auth/login");
});

//POST login route
router.post("/login", async function (req, res, next) {
  const { email, password } = req.body;
  if (!email || !password) {
    res.render("auth/login", {
      error: "Introduce email and password to log in",
    });
    return;
  }
  try {
    const userInDB = await User.findOne({ email: email });
    if (!userInDB) {
      res.render("auth/login", { error: `There are no users by ${email}` });
      return;
    } else {
      const passwordMatch = await bcrypt.compare(
        password,
        userInDB.hashedPassword
      );
      if (passwordMatch) {
        req.session.currentUser = userInDB;
        res.redirect("/");
      } else {
        res.render("auth/login", { error: "Unable to authenticate user" });
        return;
      }
    }
  } catch (error) {
    next(error);
  }
});

//GET logout route
/* GET logout */
router.get("/logout", (req, res, next) => {
  req.session.destroy((err) => {
    if (err) {
      next(err);
    } else {
      res.clearCookie("rooms-app");
      res.redirect("/auth/login");
    }
  });
});

module.exports = router;
