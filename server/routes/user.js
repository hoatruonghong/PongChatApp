const express = require("express");
const {register, login, findUser} = require("../controllers/userController");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/find/:userId", findUser);

module.exports = router;
