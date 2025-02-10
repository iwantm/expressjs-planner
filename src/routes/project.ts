import { Router } from 'express'
import {
  getProjects,
  getProjectById,
  createProject,
  deleteProject,
  updateProject,
  commentProject,
} from '../controllers'

export const projectRouter = Router()

projectRouter.get('/', getProjects)
projectRouter.get('/:id', getProjectById)
projectRouter.post('/', createProject)
projectRouter.post('/:id/comment', commentProject)
projectRouter.delete('/:id', deleteProject)
projectRouter.put('/:id', updateProject)
