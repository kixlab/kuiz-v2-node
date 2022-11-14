import { model, Schema, Types } from 'mongoose'
import { KuizModel } from '../types/kuizModel'

export interface Report {
  uid: Types.ObjectId
  comment: string
}

interface ReportClass extends KuizModel<Report> {}

const ReportSchema = new Schema<Report, ReportClass>({
  uid: {
    type: Schema.Types.ObjectId,
  },
  comment: {
    type: String,
  },
})
ReportSchema.static('createDoc', (args: Report) => {
  return new ReportModel(args)
})

export const ReportModel = model<Report, ReportClass>('Test', ReportSchema)
