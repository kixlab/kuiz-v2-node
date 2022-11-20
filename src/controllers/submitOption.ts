import { SubmitOptionParams, SubmitOptionResults } from '../api/submitOption'
import { Post } from './methods'

export const submitOption = Post<SubmitOptionParams, SubmitOptionResults>(async () => {
  return {
    success: Math.random() > 0.5,
  }
})
