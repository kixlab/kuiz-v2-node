import { Types } from 'mongoose'
import { SubmitReportParams, SubmitReportResults } from '../../api/question/submitReport'
import { ReportModel } from '../../db/report'
import { Post } from '../methods'

export const submitReport = Post<SubmitReportParams, SubmitReportResults>(async ({ sid, comment }) => {
  const report = ReportModel.createDoc({
    sid: new Types.ObjectId(sid),
    comment,
  })
  await report.save()
  return {}
})
