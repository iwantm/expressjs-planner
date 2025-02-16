import { CommentModel, DatabaseError, ProjectModel } from '../models'
import type { NextFunction, Request, Response } from 'express'

export async function getProjects(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const projects = await ProjectModel.find({ userId: req.params.userId })

    res.json(projects)
  } catch (e) {
    const error = new DatabaseError(`Failed to retrieve projects.`, e)

    next(error)
  }
}

export async function getProjectById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const project = await ProjectModel.findOne({
      userId: req.params.userId,
      _id: req.params.id,
    })
      .populate('tasks')
      .populate('comments')

    res.json(project)
  } catch (e) {
    const error = new DatabaseError(
      `Failed to retrieve project with id. ${req.params.id}`,
      e
    )
    res
      .status(404)
      .json({ message: `Project with id ${req.params.id} not found.` })

    next(error)
  }
}

export async function createProject(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const project = new ProjectModel({ userId: req.params.userId, ...req.body })
    await project.save()

    res.status(201).json(project)
  } catch (e) {
    const error = new DatabaseError(`Failed to create project`, e)

    next(error)
  }
}

export async function updateProject(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const project = await ProjectModel.findOneAndUpdate(
      { _id: req.params.id, userId: req.params.userId },
      req.body,
      {
        new: true,
      }
    )

    res.json(project)
  } catch (e) {
    const error = new DatabaseError(
      `Failed to update project with id ${req.params.id}.`,
      e
    )

    res
      .status(404)
      .json({ message: `Project with id ${req.params.id} not found.` })

    next(error)
  }
}

export async function deleteProject(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    await ProjectModel.findOneAndDelete({
      _id: req.params.id,
      userId: req.params.userId,
    })

    res.json({ message: `Project with id ${req.params.id} deleted.` })
  } catch (e) {
    const error = new DatabaseError(
      `Failed to delete project with id ${req.params.id}.`,
      e
    )

    res
      .status(404)
      .json({ message: `Project with id ${req.params.id} not found.` })

    next(error)
  }
}

export async function commentProject(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const project = await ProjectModel.findOne({
      _id: req.params.id,
      userId: req.params.userId,
    })

    const comment = new CommentModel({
      parentType: 'Project',
      parent: project?.id,
      ...req.body,
    })

    await comment.save()
    res.status(201)

    res.json({ message: `Comment made on project: ${req.params.id}` })
  } catch (e) {
    const error = new DatabaseError(
      `Failed to comment on task with id ${req.params.id}.`,
      e
    )

    next(error)
  }
}
