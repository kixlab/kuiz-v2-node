import { Option } from '../../../db/option'

export interface LoadCreatedOptionParams {
  uid: string
}

export interface LoadCreatedOptionResults {
  madeOption: Option[]
}
