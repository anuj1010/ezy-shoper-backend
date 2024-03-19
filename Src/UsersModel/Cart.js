const mongoose = require("mongoose");

const cartSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  items: {
    type: Object,
    required: true,
    default: {},
  },
});

const CartModel = mongoose.model("Cart", cartSchema);

module.exports = CartModel;
