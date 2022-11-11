import { Schema, model, Types, Model, Document } from 'mongoose'

export interface Report {
  sid: Types.ObjectId
  comment: string
}

interface ReportClass extends Model<Report> {
  createDoc(args: Report): Document & Report
}

const ReportSchema = new Schema<Report, ReportClass>({
  sid: {
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
