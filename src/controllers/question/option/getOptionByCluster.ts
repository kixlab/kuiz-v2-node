import { Types } from 'mongoose'
import { GetOptionByClusterParams, GetOptionByClusterResult } from '../../../api/question/option/getOptionByCluster'
import { OptionModel } from '../../../db/option'
import { OptionClusterModel } from '../../../db/optionCluster'
import { Get } from '../../methods'

export const getOptionByCluster = Get<GetOptionByClusterParams, GetOptionByClusterResult>(async ({ ocid }) => {
  const optionCluster = await OptionClusterModel.findById(new Types.ObjectId(ocid))

  if (optionCluster) {
    const ansList = await OptionModel.find({ _id: { $in: optionCluster.ansList.map(o => new Types.ObjectId(o)) } })
    const disList = await OptionModel.find({ _id: { $in: optionCluster.disList.map(o => new Types.ObjectId(o)) } })
    return {
      ansList,
      disList,
    }
  } else {
    throw new Error('OptionCluster not found')
  }
})
