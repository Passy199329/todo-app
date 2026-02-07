const router = require("express").Router();
const auth = require("../controllers/auth.controller");

router.get("/login", auth.loginPage);
router.post("/login", auth.login);
router.get("/register", auth.registerPage);
router.post("/register", auth.register);
router.get("/logout", auth.logout);

module.exports = router;
