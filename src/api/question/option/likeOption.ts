import { OptionCluster } from '../../../db/optionCluster'

export interface LikeOptionParams {
  oid: string
  isAns: boolean
  uid: string
}

export interface LikeOptionResults {
  newRep: OptionCluster
}
