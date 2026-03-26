import express from 'express';
import { authMiddleware } from '../../middlewares/authMiddleware.js';
import { getClasses, createClass, getClassById, updateClass, deleteClass , getUserClasses } from '../controllers/classController.js';

const router = express.Router();

router.get('/', getClasses);
router.post('/', createClass);
router.get("/mis-clases", authMiddleware, getUserClasses);
router.put('/:id', updateClass);
router.delete('/:id', deleteClass);

export default router;
