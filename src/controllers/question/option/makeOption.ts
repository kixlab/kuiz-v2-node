import { Types } from 'mongoose'
import { MakeOptionParams, MakeOptionResults } from '../../../api/question/option/makeOption'
import { optionService } from '../../../services/option'
import { Post } from '../../methods'

export const makeOption = Post<MakeOptionParams, MakeOptionResults>(async ({ optionData, dependency }) => {
  const option = await optionService.create(
    new Types.ObjectId(optionData.author),
    new Types.ObjectId(optionData.qstem),
    new Types.ObjectId(optionData.class),
    optionData.option_text,
    optionData.is_answer,
    optionData.explanation,
    optionData.keywords
  )

  return {
    option,
  }
})
