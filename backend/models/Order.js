import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  products: [
    {
      name: String,
      price: Number,
      quantity: Number
    }
  ],

  totalPrice: Number,

  paymentId: {
    type: String,
    default: ""
  },

  status: {
    type: String,
    default: "Pending"
  }

}, { timestamps: true });

const Order = mongoose.model("Order", orderSchema);

export default Order;