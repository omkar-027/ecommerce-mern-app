import express from "express";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();


// REGISTER USER
router.post("/register", async (req, res) => {

  try {

    const { name, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword
    });

    const savedUser = await user.save();

    res.json(savedUser);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }

});


// LOGIN USER
router.post("/login", async (req, res) => {

  try {

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.json({ message: "Invalid password" });
    }
     // generate token
    const SECRET = "mysecretkey123";
    const token = jwt.sign(
      { id: user._id },
      "mysecretkey123",
      { expiresIn: "1d" }
    );

    res.json({
      message: "Login successful",
      token,
      user
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }

});


// GET ALL USERS
router.get("/", authMiddleware, async (req, res) => {

  const users = await User.find();

  res.json(users);

});


// UPDATE USER
router.put("/:id", async (req, res) => {

  const updatedUser = await User.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.json(updatedUser);

});


// DELETE USER
router.delete("/:id", async (req, res) => {

  await User.findByIdAndDelete(req.params.id);

  res.json({ message: "User deleted" });

});

export default router;