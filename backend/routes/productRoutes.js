import express from 'express';
import multer from 'multer';
import { getAllProducts, getProductById, addProduct} from '../controller/productController.js';


const router = express.Router();

//upload image
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './uploads')
    },
    filename: (req, file, cb) => {
      const fileName = Date.now() + '-' + file.originalname;
      cb(null, fileName);
    }
  });
  const upload = multer({ storage: storage });

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
router.route('/').get(getAllProducts).post(upload.single('image'),addProduct);

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
router.route('/:id').get(getProductById);

export default router;