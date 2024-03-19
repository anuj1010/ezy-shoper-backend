const bcrypt = require("bcrypt");
const { createAndSetToken } = require("./MiddleWares/Auth");
const CartModel = require("./UsersModel/Cart");
const UserModel = require("./UsersModel/UserModel");

const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).send("Email already registered");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new UserModel({
      username,
      email,
      password: hashedPassword, // Save hashed password
    });
    await newUser.save();
    createAndSetToken(username, newUser._id, res);
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).send("Internal Server Error");
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email: email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    createAndSetToken(user.username, user._id, res);
    // console.log("cookiee generate");

    res.json({ message: "Login successful" });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getUser = async (req, res) => {
  const reqData = await req.user;
  res.send(reqData);
};

const setCart = async (req, res) => {
  try {
    const { id, cart } = req.body;

    // Check if the user already has a cart
    let userCart = await CartModel.findOne({ userId: id });

    // If user doesn't have a cart, create a new one
    if (!userCart) {
      userCart = new CartModel({
        userId: id,
        items: cart,
      });
    } else {
      // If user already has a cart, update it with the new cart items
      userCart.items = cart;
    }
    await userCart.save();
    res.status(201).send("Cart set successfully");
  } catch (error) {
    console.error("Error setting cart:", error);
    res.status(500).send("Internal Server Error");
  }
};

const getCart = async (req, res) => {
  try {
    const { id } = req.params;

    let emptyCart = {};
    for (var i = 0; i < 40; i++) {
      emptyCart[i] = 0;
    }

    // Check if the user already has a cart
    let userCart = await CartModel.findOne({ userId: id });

    // If user doesn't have a cart, create an empty one
    if (!userCart) {
      userCart = new CartModel({
        userId: id,
        items: emptyCart, // Empty cart
      });
      await userCart.save();
    }

    res.json(userCart);
  } catch (error) {
    console.error("Error getting cart:", error);
    res.status(500).send("Internal Server Error");
  }
};

const logout = async (req, res) => {
  res.cookie("token", "");
  res.status(200).send("logout successfull");
};

module.exports = { signup, login, getUser, setCart, getCart, logout };
