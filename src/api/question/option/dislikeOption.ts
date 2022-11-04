import { OptionCluster } from '../../../db/optionCluster'

export interface DislikeOptionParams {
  oid: string
  isAns: boolean
  uid: string
}

export interface DislikeOptionResults {
  newRep: OptionCluster
}
