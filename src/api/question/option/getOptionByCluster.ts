import { Option } from '../../../db/option'

export interface GetOptionByClusterParams {
  ocid: string
}

export interface GetOptionByClusterResult {
  ansList: Option[]
  disList: Option[]
}
