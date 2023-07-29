import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";

export const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).populate("category");
  if (products) {
    res.json(products);
  } else {
    res.status(404);
    throw new Error("Products not found");
  }
});

export async function deleteProduct(req, res) {
  const productId = req.params.id;

  try {
    await Product.findByIdAndRemove(productId);
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export const editProduct = async (req, res) => {
    let product = await Product.findById(req.params.id).populate('category');
  
    // Respond with the product data
    res.json({ product: product });
  };
  

export const updateProduct = async (req, res) => {
    let product = await Product.findById(req.params.id);
  
    if (req.body.product_name !== undefined) {
      product.product_name = req.body.product_name;
    }
    if (req.body.category !== undefined) {
      product.category = req.body.category;
    }
    if (req.body.price !== undefined) {
      product.price = req.body.price;
    }
    if (req.body.image !== undefined) {
      product.image = req.body.image;
    }
    if (req.body.description !== undefined) {
      product.description = req.body.description;
    }
    if (req.body.brand !== undefined) {
      product.brand = req.body.brand;
    }
    if (req.body.countInStock !== undefined) {
      product.countInStock = req.body.countInStock;
    }
  
    await product.save();
  
    res.json("Product updated successfully");
  };
  