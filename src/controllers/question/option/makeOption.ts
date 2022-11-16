import { Types } from 'mongoose'
import { MakeOptionParams, MakeOptionResults } from '../../../api/question/option/makeOption'
import { optionService } from '../../../services/option'
import { Post } from '../../methods'

export const makeOption = Post<MakeOptionParams, MakeOptionResults>(async ({ optionData, similarOptions }) => {
  const option = await optionService.create({
    uid: new Types.ObjectId(optionData.author),
    cid: new Types.ObjectId(optionData.class),
    qid: new Types.ObjectId(optionData.qstem),
    isAnswer: optionData.is_answer,
    optionText: optionData.option_text,
    explanation: optionData.explanation,
    keywords: optionData.keywords,
  })

  for await (const similarOption of similarOptions) {
    optionService.unionOption(new Types.ObjectId(similarOption), option.id)
  }

  return {
    option,
  }
})
