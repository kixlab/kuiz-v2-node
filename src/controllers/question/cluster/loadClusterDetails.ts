import { LoadClusterDetailsParams, LoadClusterDetailsResults } from '../../../api/question/cluster/loadClusterDetails'
import { OptionClusterModel } from '../../../db/optionCluster'
import { Post } from '../../methods'

export const loadClusterDetails = Post<LoadClusterDetailsParams, LoadClusterDetailsResults>(async ({ clusters }) => {
  const cluster = await OptionClusterModel.find({ _id: { $in: clusters } })
  return { clusters: cluster }
})
