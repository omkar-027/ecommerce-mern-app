import express from "express";
import Order from "../models/Order.js";
import authMiddleware from "../middleware/authMiddleware.js";
import Razorpay from "razorpay";

const razorpay = new Razorpay({
  key_id: "rzp_test_SUBKu8wuhlQAKN",
  key_secret: "QiJbsctBtqhnKHOqtA4ht3eR"
});

const router = express.Router();

router.post("/", authMiddleware, async (req, res) => {
  try {
    const { products, totalPrice } = req.body;
    const order = new Order({ user: req.userId, products, totalPrice });
    const savedOrder = await order.save();
    res.json(savedOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/my-orders", authMiddleware, async (req, res) => {
  try {

    const page = Number(req.query.page) || 1;
    const limit = 5;
    const skip = (page - 1) * limit;

    const orders = await Order.find({ user: req.userId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Order.countDocuments({ user: req.userId });

    res.json({
      orders,
      totalPages: Math.ceil(total / limit),
      currentPage: page
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/create-razorpay-order", authMiddleware, async (req, res) => {
  try {
    const { totalPrice } = req.body;
    const options = {
      amount: totalPrice * 100,
      currency: "INR",
      receipt: "receipt_" + Date.now()
    };
    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/:id/status", authMiddleware, async (req, res) => {
  try {

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.status = req.body.status;

    const updatedOrder = await order.save();

    res.json(updatedOrder);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/all", authMiddleware, async (req, res) => {
  try {

    const orders = await Order.find()
      .sort({ createdAt: -1 });

    res.json(orders);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;