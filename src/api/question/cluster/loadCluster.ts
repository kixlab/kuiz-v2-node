import { OptionCluster } from '../../../db/optionCluster'

export interface LoadClusterParams {
  qid: string
}

export interface LoadClusterResults {
  cluster: OptionCluster[]
}
