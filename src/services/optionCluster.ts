import { maxBy } from 'lodash'
import { Types } from 'mongoose'
import { OptionModel } from '../db/option'
import { OptionClusterModel } from '../db/optionCluster'

class OptionClusterService {
  async updateRep(isAnswer: boolean, ocid: Types.ObjectId) {
    const optionCluster = await OptionClusterModel.findById(new Types.ObjectId(ocid))

    if (optionCluster) {
      const options = await OptionModel.find({ _id: { $in: optionCluster.disList } })
      const mostLikedOption = maxBy(options, o => o.liked.length - o.disliked.length)
      await OptionClusterModel.findByIdAndUpdate(
        new Types.ObjectId(ocid),
        { $set: { [isAnswer ? 'ansRep' : 'disRep']: mostLikedOption } },
        { new: true }
      )
    } else {
      throw new Error('OptionCluster not found')
    }
  }
}

export const optionClusterService = new OptionClusterService()
