import { CommentModel, DatabaseError, TaskModel } from '../models'
import type { NextFunction, Request, Response } from 'express'

export async function getTasks(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const tasks = await TaskModel.find()

    res.json(tasks)
  } catch (e) {
    const error = new DatabaseError(`Failed to retrieve tasks.`, e)

    next(error)
  }
}

export async function getTaskById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const task = await TaskModel.findById(req.params.id).populate('comments')

    res.json(task)
  } catch (e) {
    const error = new DatabaseError(
      `Failed to retrieve task with id. ${req.params.id}.`,
      e
    )
    res
      .status(404)
      .json({ message: `Task with id ${req.params.id} not found.` })

    next(error)
  }
}

export async function createTask(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const task = new TaskModel(req.body)
    await task.save()

    res.status(201).json(task)
  } catch (e) {
    const error = new DatabaseError(`Failed to create task.`, e)

    next(error)
  }
}

export async function updateTask(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const task = await TaskModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })

    res.json(task)
  } catch (e) {
    const error = new DatabaseError(
      `Failed to update task with id ${req.params.id}.`,
      e
    )

    res
      .status(404)
      .json({ message: `Task with id ${req.params.id} not found.` })

    next(error)
  }
}

export async function deleteTask(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    await TaskModel.findByIdAndDelete(req.params.id)

    res.json({ message: `Task with id ${req.params.id} deleted.` })
  } catch (e) {
    const error = new DatabaseError(
      `Failed to delete task with id ${req.params.id}.`,
      e
    )
    res
      .status(404)
      .json({ message: `Task with id ${req.params.id} not found.` })

    next(error)
  }
}

export async function commentTask(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const task = await TaskModel.findById(req.params.id)

    const comment = new CommentModel({
      parentType: 'Task',
      parent: task?.id,
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
