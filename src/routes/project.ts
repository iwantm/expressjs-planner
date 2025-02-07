import { Router } from 'express'
import {
  getProjects,
  getProjectsById,
  createProject,
  deleteProject,
  updateProject,
} from '../controllers'

export const projectRouter = Router()

projectRouter.get('/', getProjects)
projectRouter.get('/:id', getProjectsById)
projectRouter.post('/', createProject)
projectRouter.delete('/:id', deleteProject)
projectRouter.put('/:id', updateProject)
