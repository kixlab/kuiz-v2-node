import { Option } from '../../../db/option'

export interface MakeOptionParams {
  optionData: {
    author: string
    option_text: string
    is_answer: boolean
    explanation: string
    class: string
    qstem: string
    plausible: {
      similar: string[]
      difference: string[]
    }
    cluster: any[]
  }
  dependency: any[]
}

export interface MakeOptionResults {
  option: Option
}
