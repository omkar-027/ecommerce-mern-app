import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB Connected ✅"))
  .catch(err => { console.log(err); process.exit(1); });

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String,
  category: String,
  image: String,
  stock: Number,
  rating: Number,
  numReviews: Number,
});

const Product = mongoose.model('Product', productSchema);

const products = [
  {
    name: "Wireless Bluetooth Headphones",
    price: 1999,
    description: "Premium sound quality with 30hr battery life and active noise cancellation.",
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
    stock: 50,
    rating: 4.5,
    numReviews: 120,
  },
  {
    name: "Mechanical Gaming Keyboard",
    price: 2499,
    description: "RGB backlit mechanical keyboard with tactile switches for fast response.",
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400",
    stock: 30,
    rating: 4.7,
    numReviews: 85,
  },
  {
    name: "Running Sports Shoes",
    price: 1499,
    description: "Lightweight and breathable running shoes with cushioned sole.",
    category: "Footwear",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400",
    stock: 100,
    rating: 4.3,
    numReviews: 200,
  },
  {
    name: "Slim Fit Casual T-Shirt",
    price: 499,
    description: "100% cotton premium slim fit t-shirt available in multiple colors.",
    category: "Clothing",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400",
    stock: 200,
    rating: 4.1,
    numReviews: 310,
  },
  {
    name: "Smart Watch Pro",
    price: 3999,
    description: "Health tracking smartwatch with heart rate monitor, GPS and 7-day battery.",
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400",
    stock: 40,
    rating: 4.6,
    numReviews: 95,
  },
  {
    name: "Stainless Steel Water Bottle",
    price: 699,
    description: "Double-walled insulated bottle keeps drinks cold 24hrs and hot 12hrs.",
    category: "Kitchen",
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400",
    stock: 150,
    rating: 4.4,
    numReviews: 180,
  },
  {
    name: "Laptop Backpack 30L",
    price: 1299,
    description: "Water-resistant backpack with USB charging port and padded laptop sleeve.",
    category: "Bags",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400",
    stock: 75,
    rating: 4.2,
    numReviews: 140,
  },
  {
    name: "Wireless Phone Charger",
    price: 899,
    description: "15W fast wireless charging pad compatible with all Qi-enabled devices.",
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1608751819407-8c8672b6e8f4?w=400",
    stock: 90,
    rating: 4.0,
    numReviews: 60,
  },
];

const seedDB = async () => {
  try {
    await Product.deleteMany({});
    console.log("Old products cleared");
    await Product.insertMany(products);
    console.log(`${products.length} products added ✅`);
    process.exit(0);
  } catch (err) {
    console.log("Seed error:", err);
    process.exit(1);
  }
};

seedDB();