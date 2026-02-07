const bcrypt = require("bcrypt");
const User = require("../models/user.model");

exports.loginPage = (req, res) => res.render("login");
exports.registerPage = (req, res) => res.render("register");

exports.register = async (req, res, next) => {
  try {
    const hashed = await bcrypt.hash(req.body.password, 10);
    await user.create({ username: req.body.username, password: hashed });
    res.redirect("/login");
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const user = await user.findOne({ username: req.body.username });
    if (!user) return res.redirect("/login");

    const valid = await bcrypt.compare(req.body.password, user.password);
    if (!valid) return res.redirect("/login");

    req.session.userId = user._id;
    res.redirect("/todos");
  } catch (err) {
    next(err);
  }
};

exports.logout = (req, res) => {
  req.session.destroy(() => res.redirect("/login"));
};
