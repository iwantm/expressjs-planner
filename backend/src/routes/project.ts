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

projectRouter.get('/:userId', getProjects)
projectRouter.get('/:userId/:id', getProjectById)
projectRouter.post('/:userId', createProject)
projectRouter.post('/:userId/:id/comment', commentProject)
projectRouter.delete('/:userId/:id', deleteProject)
projectRouter.put('/:userId/:id', updateProject)
