import "reflect-metadata";
import express from 'express';
import cors from 'cors';
import { AppDataSource } from "./data-source";
import authRoutes from './routes/auth';
import taskRoutes from './routes/tasks';

const app = express();

AppDataSource.initialize()
  .then(() => {
    console.log("Connected to database");
  })
  .catch(error => console.log(error));

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});