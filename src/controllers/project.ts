import { DatabaseError, ProjectModel, TaskModel } from '../models'
import type { NextFunction, Request, Response } from 'express'

export async function getProjects(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const projects = await ProjectModel.find()
    res.json(projects)
  } catch (e) {
    const err = e as Error
    const error = new DatabaseError(
      `Failed to retrieve projects: ${err.message}`,
      err.cause
    )

    next(error)
  }
}

export async function getProjectsById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const project = await ProjectModel.findById(req.params.id)
    res.json(project)
  } catch (e) {
    const err = e as Error
    const error = new DatabaseError(
      `Failed to retrieve project with id. ${req.params.id}, err: ${err.message}`,
      err.cause
    )

    next(error)
  }
}

export async function createProject(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const project = new ProjectModel(req.body)
    await project.save()
    res.status(201).json(project)
  } catch (e) {
    const err = e as Error
    const error = new DatabaseError(
      `Failed to create project: ${err.message}`,
      err.cause
    )

    next(error)
  }
}

export async function updateProject(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const project = await ProjectModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    )

    if (!project)
      res
        .status(404)
        .json({ message: `Project with id ${req.params.id} not found.` })

    res.json(project)
  } catch (e) {
    const err = e as Error
    const error = new DatabaseError(
      `Failed to update project with id ${req.params.id}. err: ${err.message}`,
      err.cause
    )

    next(error)
  }
}

export async function deleteProject(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const project = await ProjectModel.findByIdAndDelete(req.params.id)
    if (!project)
      res
        .status(404)
        .json({ message: `Project with id ${req.params.id} not found.` })

    res.json({ message: `Project with id ${req.params.id} deleted.` })
  } catch (e) {
    const err = e as Error
    const error = new DatabaseError(
      `Failed to delete project with id ${req.params.id}. err: ${err.message}`,
      err.cause
    )

    next(error)
  }
}

export async function listTasksForProject(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const tasks = await TaskModel.find({ projectId: req.params.id })
    res.json(tasks)
    if (!tasks)
      res
        .status(404)
        .json({ message: `Could not find tasks for project ${req.params.id}.` })
  } catch (e) {
    const err = e as Error
    const error = new DatabaseError(
      `Failed to tasks for project with id ${req.params.id}. err: ${err.message}`,
      err.cause
    )

    next(error)
  }
}
