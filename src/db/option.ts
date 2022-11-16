import { model, Schema, Types } from 'mongoose'
import { KuizModel } from '../types/kuizModel'

export interface Option {
  author: Types.ObjectId
  option_text: string
  explanation: string
  is_answer: boolean
  class: Types.ObjectId
  qstem: Types.ObjectId
  suggesetions: {
    author: Types.ObjectId
    suggestion_text: string
    likes: number
  }[]
  includedSet: Types.ObjectId[]
  plausible: {
    similar: any[]
    difference: any[]
  }
  dependency: {
    same: any[]
    contradictory: any[]
  }
  cluster: Types.ObjectId
  liked: Types.ObjectId[]
  disliked: Types.ObjectId[]
  keyWords: string[]
}

interface OptionClass extends KuizModel<Option, 'author' | 'option_text' | 'is_answer'> {}

const optionSchema = new Schema<Option>({
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  option_text: {
    type: String,
    required: true,
    trim: true,
  },
  explanation: {
    type: String,
    trim: true,
  },
  is_answer: {
    type: Boolean,
    required: true,
  },
  class: {
    type: Schema.Types.ObjectId,
    ref: 'Class',
  },
  qstem: {
    type: Schema.Types.ObjectId,
    ref: 'Qstem',
  },
  suggesetions: {
    type: [
      {
        author: {
          type: Schema.Types.ObjectId,
        },
        suggestion_text: {
          type: String,
        },
        likes: {
          type: Number,
        },
      },
    ],
    default: [],
  },
  includedSet: {
    type: [
      {
        type: Schema.Types.ObjectId,
        ref: 'OptionSet',
      },
    ],
    default: [],
  },
  plausible: {
    type: {
      similar: {
        type: [],
      },
      difference: {
        type: [],
      },
    },
    default: {
      similar: [],
      difference: [],
    },
  },
  dependency: {
    type: {
      same: {
        type: [],
      },
      contradictory: {
        type: [],
      },
    },
    default: {
      same: [],
      contradictory: [],
    },
  },
  cluster: { type: Schema.Types.ObjectId },
  liked: {
    type: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    default: [],
  },
  disliked: {
    type: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    default: [],
  },
  keyWords: {
    type: [String],
    default: [],
  },
})
optionSchema.static('createDoc', (args: Option) => {
  return new OptionModel(args)
})

export const OptionModel = model<Option, OptionClass>('Option', optionSchema)
