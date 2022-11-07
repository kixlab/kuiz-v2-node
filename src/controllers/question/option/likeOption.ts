import { Types } from 'mongoose'
import { LikeOptionParams, LikeOptionResults } from '../../../api/question/option/likeOption'
import { OptionModel } from '../../../db/option'
import { OptionClusterModel } from '../../../db/optionCluster'
import { Post } from '../../methods'

export const likeOption = Post<LikeOptionParams, LikeOptionResults>(async ({ oid, isAns, uid }) => {
  const addValue = (arr: Types.ObjectId[], elem: Types.ObjectId) => {
    return [...new Set(arr.concat([elem]).map(a => a.toString()))].map(a => new Types.ObjectId(a))
  }
  const option = await OptionModel.findById(new Types.ObjectId(oid))

  if (option) {
    const ocid = option.cluster[0]
    const newLiked = addValue(option.liked, new Types.ObjectId(uid))
    await OptionModel.findByIdAndUpdate(new Types.ObjectId(oid), { $set: { liked: newLiked } }, { new: true })
    if (isAns) {
      const optionCluster = await OptionClusterModel.findById(new Types.ObjectId(ocid))
      if (optionCluster) {
        const options = await OptionModel.find({ _id: { $in: optionCluster.ansList } })
        const likes = options.map(o => o.liked.length)
        const maxOpt = options[likes.indexOf(Math.max(...likes))]
        const newRep = await OptionClusterModel.findByIdAndUpdate(
          new Types.ObjectId(ocid),
          { $set: { ansRep: maxOpt._id } },
          { new: true }
        )
        if (newRep) {
          return { newRep }
        } else {
          throw new Error('Error in updating option cluster')
        }
      } else {
        throw new Error('No option cluster found')
      }
    } else {
      const optionCluster = await OptionClusterModel.findById(new Types.ObjectId(ocid))
      if (optionCluster) {
        const options = await OptionModel.find({ _id: { $in: optionCluster.disList } })
        const likes = options.map(o => o.liked.length)
        const maxOpt = options[likes.indexOf(Math.max(...likes))]
        const newRep = await OptionClusterModel.findByIdAndUpdate(
          new Types.ObjectId(ocid),
          { $set: { disRep: maxOpt } },
          { new: true }
        )
        if (newRep) {
          return { newRep }
        } else {
          throw new Error('Error in updating option cluster')
        }
      } else {
        throw new Error('No option cluster found')
      }
    }
  } else {
    throw new Error('Option not found')
  }
})
