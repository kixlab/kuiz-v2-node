import { Option } from '../../../db/option'

export interface LoadClusterParams {
  qid: string
}

export interface LoadClusterResults {
  cluster: [Option, Option[]][]
}
