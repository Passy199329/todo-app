const bcrypt = require("bcrypt");
const User = require("../models/user.model");

exports.loginPage = (req, res) => {
  res.render("login");
};

exports.registerPage = (req, res) => {
  res.render("register");
};

exports.register = async (req, res) => {
  try {
    const { username, password } = req.body;

    const hashed = await bcrypt.hash(password, 10);

    await User.create({
      username,
      password: hashed,
    });

    res.redirect("/login");
  } catch (err) {
    if (err.code === 11000) {
      return res.render("register", {
        error: "User already exists",
      });
    }

    res.render("register", {
      error: "Registration failed",
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.render("login", {
        error: "Invalid username or password",
      });
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.render("login", {
        error: "Invalid username or password",
      });
    }

    req.session.userId = user._id;
    res.redirect("/todos");
  } catch (err) {
    res.render("login", {
      error: "Something went wrong",
    });
  }
};

exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/login");
  });
};
