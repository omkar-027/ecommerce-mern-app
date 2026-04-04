import express from "express";
import Product from "../models/Product.js";
import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";


const router = express.Router();


// Get all products (with search)
// Get all products
// This MUST match the Frontend call exactly
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    // This catches "CastError" if the ID is not a valid MongoDB ObjectId format
    res.status(400).json({ message: "Invalid ID format" });
  }
});

// Admin Add Product
router.post(
  "/add",
  authMiddleware,
  adminMiddleware,
  async (req, res) => {

    const { name, price, image, description } = req.body;

    const product = new Product({
      name,
      price,
      image,
      description
    });

    const savedProduct = await product.save();

    res.json(savedProduct);

});

router.delete(
"/:id",
authMiddleware,
adminMiddleware,
async (req,res)=>{

try{

await Product.findByIdAndDelete(req.params.id);

res.json({message:"Product deleted"});

}catch(error){
res.status(500).json({message:error.message});
}

});

router.put("/:id", authMiddleware, adminMiddleware, async (req,res)=>{

const { name,price,description } = req.body;

const product = await Product.findByIdAndUpdate(

req.params.id,
{ name,price,description },
{ new:true }

);

res.json(product);

});

// Get single product
router.get("/", async (req, res) => {
  try {

    const search = req.query.search || "";

    const products = await Product.find({
      $or: [
        { name: { $regex: search, $options: "i" } },
        { category: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } }
      ]
    });

    res.json(products);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
export default router;