import { Types } from 'mongoose'
import { LoadClusterParams, LoadClusterResults } from '../../../api/question/cluster/loadCluster'
import { optionService } from '../../../services/option'
import { Get } from '../../methods'

export const loadCluster = Get<LoadClusterParams, LoadClusterResults>(async ({ qid }) => {
  const cluster = await optionService.getClusters(new Types.ObjectId(qid))

  return {
    cluster,
  }
})
