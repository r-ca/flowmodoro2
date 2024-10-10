import express from 'express';
import { AppDataSource } from "../data-source.js";
import { Task } from "../entity/Task.js";
import { Timer } from "../entity/Timer.js";
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

router.use(authenticateToken);

router.post('/', async (req, res) => {
  try {
    const { name } = req.body;
    const userId = req.user.userId;
    const taskRepository = AppDataSource.getRepository(Task);
    const task = taskRepository.create({ name, user: { id: userId } });
    await taskRepository.save(task);
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: 'Error creating task' });
  }
});

router.get('/', async (req, res) => {
  try {
    const userId = req.user.userId;
    const taskRepository = AppDataSource.getRepository(Task);
    const tasks = await taskRepository.find({ where: { user: { id: userId } } });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching tasks' });
  }
});

router.post('/:id/timer', async (req, res) => {
  try {
    const { id } = req.params;
    const { duration } = req.body;
    const timerRepository = AppDataSource.getRepository(Timer);
    const timer = timerRepository.create({ duration, task: { id: parseInt(id) } });
    await timerRepository.save(timer);
    res.status(201).json(timer);
  } catch (error) {
    res.status(500).json({ error: 'Error creating timer' });
  }
});

export default router;