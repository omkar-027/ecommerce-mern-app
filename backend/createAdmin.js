import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB Connected ✅"))
  .catch(err => { console.log(err); process.exit(1); });

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: String,
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

const createAdmin = async () => {
  try {
    const existing = await User.findOne({ email: "admin@shop.com" });
    if (existing) {
      console.log("Admin already exists ✅");
      console.log("Email:    admin@shop.com");
      console.log("Password: Admin123456");
      process.exit(0);
    }

    const hashed = await bcrypt.hash("Admin123456", 10);

    await User.create({
      name: "Admin",
      email: "admin@shop.com",
      password: hashed,
      role: "admin"
    });

    console.log("Admin created ✅");
    console.log("Email:    admin@shop.com");
    console.log("Password: Admin123456");
    process.exit(0);
  } catch (err) {
    console.log("Error:", err);
    process.exit(1);
  }
};

createAdmin();