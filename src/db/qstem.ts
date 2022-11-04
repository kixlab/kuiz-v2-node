import { model, Schema, Types } from 'mongoose'

export interface QStem {
  author: Types.ObjectId
  stem_text: string
  raw_string: string
  action_verb: string[]
  keyword: string[]
  learning_objective: string
  material: string
  class: Types.ObjectId
  options: Types.ObjectId[]
  optionSets: Types.ObjectId[]
  explanation: string
  contributor: Types.ObjectId[]
  cluster: Types.ObjectId[]
}

const QstemSchema = new Schema<QStem>(
  {
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    stem_text: {
      type: String,
      required: true,
    },
    raw_string: {
      type: String,
      required: true,
    },
    action_verb: {
      type: [String],
      default: [],
    },
    keyword: {
      type: [String],
      default: [],
    },
    learning_objective: {
      type: String,
      default: '',
    },
    material: {
      type: String,
    },
    class: {
      type: Schema.Types.ObjectId,
      ref: 'Class',
    },
    options: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Option',
        },
      ],
    },
    optionSets: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: 'OptionSet',
        },
      ],
    },
    explanation: {
      type: String,
      default: '',
    },
    contributor: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: 'User',
        },
      ],
      default: [],
    },
    cluster: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: 'OptionCluster',
        },
      ],
      default: [],
    },
  },
  {
    timestamps: true,
  }
)

export const QStemModel = model<QStem>('Qstem', QstemSchema)
