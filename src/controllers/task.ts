import { DatabaseError, TaskModel } from '../models'
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
    const err = e as Error
    const error = new DatabaseError(
      `Failed to retrieve tasks: ${err.message}`,
      err.cause
    )

    next(error)
  }
}

export async function getTasksById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const task = await TaskModel.findById(req.params.id)
    res.json(task)
  } catch (e) {
    const err = e as Error
    const error = new DatabaseError(
      `Failed to retrieve task with id. ${req.params.id}, err: ${err.message}`,
      err.cause
    )

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
    const err = e as Error
    const error = new DatabaseError(
      `Failed to create task: ${err.message}`,
      err.cause
    )

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

    if (!task)
      res
        .status(404)
        .json({ message: `Task with id ${req.params.id} not found.` })

    res.json(task)
  } catch (e) {
    const err = e as Error
    const error = new DatabaseError(
      `Failed to update task with id ${req.params.id}. err: ${err.message}`,
      err.cause
    )

    next(error)
  }
}

export async function deleteTask(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const task = await TaskModel.findByIdAndDelete(req.params.id)
    if (!task)
      res
        .status(404)
        .json({ message: `Task with id ${req.params.id} not found.` })

    res.json({ message: `Task with id ${req.params.id} deleted.` })
  } catch (e) {
    const err = e as Error
    const error = new DatabaseError(
      `Failed to delete task with id ${req.params.id}. err: ${err.message}`,
      err.cause
    )

    next(error)
  }
}
