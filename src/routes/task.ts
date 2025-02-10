import { Router } from 'express'
import {
  getTasks,
  getTaskById,
  createTask,
  deleteTask,
  updateTask,
  commentTask,
} from '../controllers'

export const taskRouter = Router()

taskRouter.get('/', getTasks)
taskRouter.get('/:id', getTaskById)
taskRouter.post('/', createTask)
taskRouter.post('/:id/comment', commentTask)
taskRouter.delete('/:id', deleteTask)
taskRouter.put('/:id', updateTask)
