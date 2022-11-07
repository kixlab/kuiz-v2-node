import { LoadClusterDetailsParams, LoadClusterDetailsResults } from '../../../api/question/cluster/loadClusterDetails'
import { Option } from '../../../db/option'
import { OptionCluster, OptionClusterModel } from '../../../db/optionCluster'
import { Post } from '../../methods'

export const loadClusterDetails = Post<LoadClusterDetailsParams, LoadClusterDetailsResults>(async ({ clusters }) => {
  const cluster = (await OptionClusterModel.find({ _id: { $in: clusters } })
    .populate('ansRep')
    .populate('disRep')) as (OptionCluster & {
    ansRep: Option | null
    disRep: Option | null
  })[]

  return { clusters: cluster }
})
