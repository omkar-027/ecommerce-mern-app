import User from "../models/User.js";

const adminMiddleware = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);

    //  Check user exists
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    //  Check admin role
    if (user.role !== "admin") {
      return res.status(403).json({ message: "Admin access only" });
    }

    next();

  } catch (error) {
    console.error("Admin Middleware Error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

export default adminMiddleware;