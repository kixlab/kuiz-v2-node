import { Option } from '../../../db/option'

export interface LoadOptionInClusterParams {
  optionList: string[]
}

export interface LoadOptionInClusterResults {
  options: Option[]
}
