// controller/categoryController.js

import asyncHandler from 'express-async-handler';
import Category from '../models/categoryModel.js';

// @desc    Fetch all categories
// @route   GET /api/categories
// @access  Public
const getAllCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find({});
  res.json(categories);
});

// @desc    Create a category
// @route   POST /api/categories
// @access  Private/Admin
const createCategory = asyncHandler(async (req, res) => {
  const category = new Category({
    name: req.body.name,
  });

  const createdCategory = await category.save();
  res.status(201).json(createdCategory);
});

// @desc    Delete a category
// @route   DELETE /api/categories/:id
// @access  Private/Admin
const deleteCategory = asyncHandler(async (req, res) => {
  const category = await Category.deleteOne({_id: req.params.id});

  if (category) {
    res.json({ message: 'Category removed' });
  } else {
    res.status(404);
    throw new Error('Category not found');
  }
});



export { getAllCategories, createCategory, deleteCategory };

