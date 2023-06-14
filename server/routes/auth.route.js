const { Router } = require("express");
const AuthController = require("../controllers/auth.controller");

let router = Router();

router.post("/login", AuthController.login);
router.post("/register", AuthController.register);
router.put("/update", AuthController.update);

module.exports = router;
