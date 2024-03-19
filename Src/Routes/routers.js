const express = require("express");
const {
  signup,
  login,
  getUser,
  setCart,
  getCart,
  logout,
} = require("../Controllers");
const router = express.Router();
const { authenticateToken } = require("../MiddleWares/Auth");

router.route("/signup").post(signup);
router.route("/login").post(login);
router.route("/getuser").get(authenticateToken, getUser);
router.route("/cart").post(setCart);
router.route("/cart/:id").get(getCart);
router.route("/logout").get(logout);

module.exports = router;
