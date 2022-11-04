import { model, Schema, Types } from 'mongoose'

export interface OptionCluster {
  ansList: Types.ObjectId[]
  disList: Types.ObjectId[]
  ansExist: boolean
  disExist: boolean
  qstem: Types.ObjectId
  ansRep: Types.ObjectId | null
  disRep: Types.ObjectId | null
}

const OptionClusterSchema = new Schema<OptionCluster>({
  ansList: {
    type: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Option',
      },
    ],
  },
  disList: {
    type: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Option',
      },
    ],
  },
  ansExist: {
    type: Boolean,
    default: false,
  },
  disExist: {
    type: Boolean,
    default: false,
  },
  qstem: {
    type: Schema.Types.ObjectId,
    ref: 'Qstem',
  },
  ansRep: {
    type: Schema.Types.ObjectId,
    ref: 'Option',
  },
  disRep: {
    type: Schema.Types.ObjectId,
    ref: 'Option',
  },
})

export const OptionClusterModel = model('OptionCluster', OptionClusterSchema)
