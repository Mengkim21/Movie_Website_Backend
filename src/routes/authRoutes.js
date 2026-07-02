import express from 'express';
import { register, login, updateUserProfile} from '../controllers/authController.js';
import { auth } from '../middleware/authMiddleware.js';
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.patch('/update', auth, updateUserProfile);

router.get('/me', auth, (req, res) => {
  res.status(200).json({
    message: "You are authorized!",
    user: req.user
  });
});

export default router;
