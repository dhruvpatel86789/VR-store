// routes/categoryRoutes.js

import express from 'express';
import { getAllCategories, createCategory,deleteCategory } from '../controller/categoryController.js';

const router = express.Router();

// @desc    Fetch all categories
// @route   GET /api/categories
// @access  Public
router.route('/').get(getAllCategories).post(createCategory);
router.route('/:id').delete(deleteCategory);

export default router;
