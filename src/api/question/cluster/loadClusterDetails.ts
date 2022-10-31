import { OptionCluster } from '../../../db/optionCluster'

export interface LoadClusterDetailsParams {
  clusters: string[]
}

export interface LoadClusterDetailsResults {
  clusters: OptionCluster[]
}
