import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).populate('category');
  res.json(products);
});

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// Function to handle a POST request
const addProduct = async (req, res) => {
  try {
    const {
      product_name,
      category,
      price,
      description,
      brand,
      countInStock,
    } = req.body;

    // Assuming you have a Product model and you have defined image field in your model
    const product = new Product({
      product_name,
      category,
      price,
      image: req.file.filename, // image path in 'uploads' folder
      description,
      brand,
      countInStock,
    });

    const createdProduct = await product.save();

    if (createdProduct) {
      res.status(201).json(createdProduct);
    } else {
      res.status(400);
      throw new Error('Failed to create product');
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server Error' });
  }
};


export { getAllProducts, getProductById, addProduct };
