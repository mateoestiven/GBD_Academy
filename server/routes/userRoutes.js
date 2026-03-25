import express from 'express';
import { signup, login, getUserProfile, getAllUsers, getTeachers , getPerfil } from '../controllers/userController.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/profile/:id', getUserProfile);
router.get('/all/users', getAllUsers);
router.get('/teachers/all', getTeachers);
router.get('/perfil', getPerfil)
export default router;
