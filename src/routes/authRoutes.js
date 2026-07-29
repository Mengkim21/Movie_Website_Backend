import express from 'express';
import { register, login, updateUserProfile, getMyProfile} from '../controllers/authController.js';
import { auth } from '../middleware/authMiddleware.js';
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.patch('/update', auth, updateUserProfile);

router.get('/me', auth, getMyProfile);

export default router;
