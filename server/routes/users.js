import express from 'express';
import auth from '../middleware/auth.js';
import { getUser, getUserPosts, editUserProfile, deleteUserProfile } from '../controllers/users.js';

const router = express.Router();

router.get('/:username', getUser);
router.get('/posts', getUserPosts);
router.patch('/edit', editUserProfile);
router.delete('/delete', deleteUserProfile);

export default router;