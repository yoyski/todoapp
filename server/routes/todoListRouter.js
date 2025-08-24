import { Router } from 'express';

import {addTodoList, getAllTodoList, deleteTodoList, updateTodoList} from '../controller/todoListController.js';

const router = Router();


// CREATE & READ
router.route('/')
  .post(addTodoList) // CREATE - Add a new todo
  .get(getAllTodoList);// READ - Get all todos

// UPDATE & DELETE todo by ID
router.route('/:id')
  .put(updateTodoList)
  .delete(deleteTodoList);

export default router;
