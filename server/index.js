import express from 'express';
import cors from 'cors';
import todoListRouter from './routes/todoListRouter.js';
import db from './model/todoList.model.js';

const app = express();

app.use(cors());
app.use(express.json())


app.use('/TodoList', todoListRouter);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));