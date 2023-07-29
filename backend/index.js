import express from "express";
import dotenv from 'dotenv';
import cors from "cors";
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import dashboardRoutes from './routes/dashboardRoutes.js';
import userRoutes from './routes/userRoutes.js';

// Load environment variables
dotenv.config();

// Connect to the database
connectDB();

const app = express();

// Middleware
app.use(cors({origin:'*'}));
app.use(express.json()); // Parses incoming requests with JSON payloads
app.use('/uploads', express.static('uploads')); // Configuration of upload folder

// Routes
app.use('/api/products', productRoutes);  // use the productRoutes
app.use('/api/categories', categoryRoutes); // use the categoryRoutes
app.use('/api/dashboard', dashboardRoutes); // use the dashboardRoutes
app.use('/api/users', userRoutes);// use the userRoutes



// Start server
const port = 5000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
