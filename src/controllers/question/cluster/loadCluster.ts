import { Types } from 'mongoose'
import { LoadClusterParams, LoadClusterResults } from '../../../api/question/cluster/loadCluster'
import { OptionModel } from '../../../db/option'
import { OptionClusterModel } from '../../../db/optionCluster'
import { Get } from '../../methods'

export const loadCluster = Get<LoadClusterParams, LoadClusterResults>(async ({ qid }) => {
  const cluster = await OptionClusterModel.find({ qstem: new Types.ObjectId(qid) })
  await OptionModel.find({ _id: { $in: cluster } })

  return {
    cluster,
  }
})
