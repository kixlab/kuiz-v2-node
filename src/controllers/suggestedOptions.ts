import { SuggestedOptionsParams, SuggestedOptionsResults } from '../api/suggestedOptions'
import { optionService } from '../services/option'
import { Post } from './methods'

export const suggestedOptions = Post<SuggestedOptionsParams, SuggestedOptionsResults>(async ({ optionText, qid }) => {
  const options = await optionService.getSimilarOptions(qid, optionText)
  return { options }
})
