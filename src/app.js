const express = require("express");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const path = require("path");

const connectDB = require("./config/db");
const authRoutes = require("./routes/auth.routes");
const todoRoutes = require("./routes/todo.routes");
const errorHandler = require("./middleware/error.middleware");

const app = express();
connectDB();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: process.env.MONGO_URI })
}));

app.use("/", authRoutes);
app.use("/todos", todoRoutes);

app.use(errorHandler);

module.exports = app;
