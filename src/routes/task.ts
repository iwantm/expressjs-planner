import { Router } from 'express'
import {
  getTasks,
  getTasksById,
  createTask,
  deleteTask,
  updateTask,
} from '../controllers'

export const taskRouter = Router()

taskRouter.get('/', getTasks)
taskRouter.get('/:id', getTasksById)
taskRouter.post('/', createTask)
taskRouter.delete('/:id', deleteTask)
taskRouter.put('/:id', updateTask)
