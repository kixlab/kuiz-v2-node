import { Option } from '../../../db/option'

export interface LoadOptionDetailParams {
  oid: string
}

export interface LoadOptionDetailResults {
  optionDetail: Option
}
