import { Option } from '../db/option'
import { ID } from '../types/common'

export interface SuggestedOptionsParams {
  qid: ID
  optionText: string
}

export interface SuggestedOptionsResults {
  options: Option[]
}
