import { Schema, model } from 'mongoose'

interface Project {
  title: string
  description: string
  status: 'To Do' | 'In Progress' | 'Complete' | 'Abandoned'
  priority: 'Low' | 'Medium' | 'High' | 'Should be done'
  dueDate: Date
  userId: string
  createdAt: Date
  updatedAt: Date
}

const ProjectSchema = new Schema<Project>(
  {
    title: { type: String, required: true },
    description: { type: String, required: false },
    status: {
      type: String,
      enum: ['To Do', 'In Progress', 'Complete', 'Abandoned'],
      default: 'To Do',
    },
    priority: {
      type: String,
      enum: ['Low', 'Medium', 'High', 'Should be done'],
      default: 'Low',
    },
    userId: {
      type: String,
      required: true,
    },
    dueDate: Date,
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
)

ProjectSchema.virtual('tasks', {
  ref: 'Task',
  localField: '_id',
  foreignField: 'projectId',
})

ProjectSchema.virtual('comments', {
  ref: 'Comment',
  localField: '_id',
  foreignField: 'parent',
})

export const ProjectModel = model<Project>('Project', ProjectSchema)
