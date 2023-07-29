import express from 'express';
import { registerUser, authUser,createAdminUser } from '../controller/userController.js';

const router = express.Router();

router.route('/register').post(registerUser);
router.route('/login').post(authUser);
router.route("/createAdmin").post(createAdminUser);

export default router;
