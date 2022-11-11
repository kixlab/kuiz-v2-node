import { Types } from 'mongoose'
import { SubmitReportParams, SubmitReportResults } from '../../api/question/submitReport'
import { ReportModel } from '../../db/report'
import { Post } from '../methods'

export const submitReport = Post<SubmitReportParams, SubmitReportResults>(async ({ uid, comment }) => {
  const report = ReportModel.createDoc({
    uid: new Types.ObjectId(uid),
    comment,
  })
  await report.save()
  return {}
})
