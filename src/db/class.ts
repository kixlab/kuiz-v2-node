import { Types, Schema, model } from 'mongoose'

export interface Class {
  code: string
  students: Types.ObjectId[]
  qstems: Types.ObjectId[]
  classType: boolean
}

const ClassSchema = new Schema<Class>({
  code: {
    type: String,
    default: 'test101',
  },
  students: {
    type: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  qstems: {
    type: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Qstem',
      },
    ],
  },
  classType: {
    type: Boolean,
  },
})

export const ClassModel = model('Class', ClassSchema)
