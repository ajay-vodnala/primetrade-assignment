import express from 'express';
import { addTask,deleteTask,getAllTasksOfUser,getTask,markAsComplete,markAsIncomplete,editTask } from '../controllers/taskController.js';
import { verifyToken } from '../middlewares/verifyToken.js';

const router=express.Router();

router.post('/add-new',verifyToken,addTask);
router.get('/get-all',verifyToken,getAllTasksOfUser);
router.get('/get-task/:task_id',verifyToken,getTask);
router.delete('/delete/:task_id',verifyToken,deleteTask);
router.put('/complete/:task_id',verifyToken,markAsComplete);
router.put('/update/:task_id',verifyToken,editTask);
router.put('/incomplete/:task_id',verifyToken,markAsIncomplete);

export default router;