import { Schema, model, Types } from 'mongoose'

interface Task {
  projectId: Types.ObjectId
  title: string
  description: string
  status: 'To Do' | 'In Progress' | 'Complete' | 'Abandoned'
  priority: 'Low' | 'Medium' | 'High' | 'Should be done'
  dueDate: Date
  createdAt: Date
  updatedAt: Date
}

const TaskSchema = new Schema<Task>(
  {
    projectId: {
      type: Schema.Types.ObjectId,
      ref: 'Project',
      required: false,
    },
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

export const TaskModel = model<Task>('Task', TaskSchema)
