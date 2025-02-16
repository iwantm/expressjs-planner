import { Schema, model, Types } from 'mongoose'

interface Task {
  projectId: Types.ObjectId
  title: string
  description: string
  status: 'To Do' | 'In Progress' | 'Complete' | 'Abandoned'
  priority: 'Low' | 'Medium' | 'High' | 'Should be done'
  dueDate: Date
  userId: string
  createdAt: Date
  updatedAt: Date
}

const TaskSchema = new Schema<Task>(
  {
    projectId: {
      type: Schema.Types.ObjectId,
      ref: 'Project',
      required: true,
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

TaskSchema.virtual('comments', {
  ref: 'Comment',
  localField: '_id',
  foreignField: 'parent',
})

export const TaskModel = model<Task>('Task', TaskSchema)
