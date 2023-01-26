// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv").config();
const path = require("path");
const hbs = require("hbs");
const session = require('express-session');
const MongoStore = require('connect-mongo');

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
hbs.registerPartials(__dirname + '/views/partials');

app.set('trust proxy', 1);
app.use(
  session({
    name: 'rooms-app',
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: false,
    cookie: {
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
      maxAge: 2592000000 // 30 days in milliseconds
    },
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URL
    })
  })
)


// 👇 Start handling routes here
const indexRoutes = require("./routes/index");
app.use("/", indexRoutes);

const authRoutes = require("./routes/auth");
app.use("/auth", authRoutes);

const roomRoutes = require("./routes/rooms");
app.use("/rooms", roomRoutes);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
