import { Option } from '../../../db/option'
import { ID } from '../../../types/common'

export interface MakeOptionParams {
  optionData: {
    author: ID
    option_text: string
    is_answer: boolean
    explanation: string
    class: ID
    qstem: ID
    keywords: string[]
  }
  similarOptions: ID[]
}

export interface MakeOptionResults {
  option: Option
}
