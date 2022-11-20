import { GetOptionsParams, GetOptionsResults } from '../api/getOptions'
import { Get } from './methods'

export const getOptions = Get<GetOptionsParams, GetOptionsResults>(async () => {
  return {
    answers: ['Memorability'],
    distractors: ['Safety', 'Learnerability', 'Efficiency'],
  }
})
