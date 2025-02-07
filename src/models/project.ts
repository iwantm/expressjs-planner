import { Schema, model, Types } from 'mongoose'

interface Project {
  projectId: Types.ObjectId
  title: string
  description: string
  status: 'To Do' | 'In Progress' | 'Complete' | 'Abandoned'
  priority: 'Low' | 'Medium' | 'High' | 'Should be done'
  dueDate: Date
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
    dueDate: Date,
  },
  { timestamps: true }
)

export const ProjectModel = model<Project>('Project', ProjectSchema)
