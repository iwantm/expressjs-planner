import { Types, Schema, model } from 'mongoose'

interface Comment {
  parentType: string
  parent: Types.ObjectId
  body: string
  createdAt: Date
  updatedAt: Date
}

const CommentSchema = new Schema<Comment>(
  {
    parentType: {
      type: String,
      enum: ['Project', 'Task'],
      required: true,
    },
    parent: {
      type: Schema.Types.ObjectId,
      ref: function () {
        return this.parentType
      },
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
)

export const CommentModel = model<Comment>('Comment', CommentSchema)
