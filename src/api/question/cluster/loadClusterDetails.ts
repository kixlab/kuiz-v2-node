import { OptionCluster } from '../../../db/optionCluster'
import { Option } from '../../../db/option'

export interface LoadClusterDetailsParams {
  clusters: string[]
}

export interface LoadClusterDetailsResults {
  clusters: (OptionCluster & { ansRep: Option | null; disRep: Option | null })[]
}
