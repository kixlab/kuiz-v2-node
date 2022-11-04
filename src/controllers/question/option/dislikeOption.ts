import { Types } from 'mongoose'
import { DislikeOptionParams, DislikeOptionResults } from '../../../api/question/option/dislikeOption'
import { OptionModel } from '../../../db/option'
import { OptionClusterModel } from '../../../db/optionCluster'
import { Post } from '../../methods'

export const dislikeOption = Post<DislikeOptionParams, DislikeOptionResults>(async ({ oid, uid, isAns }) => {
  const removeValue = (arr: Types.ObjectId[], elem: Types.ObjectId) => {
    if (arr.includes(elem)) {
      arr.splice(arr.indexOf(elem), 1)
    }
    return arr
  }
  const option = await OptionModel.findById(new Types.ObjectId(oid))

  if (option) {
    const ocid = option.cluster[0]
    const newLiked = removeValue(option.liked, new Types.ObjectId(uid))
    await OptionModel.findByIdAndUpdate(new Types.ObjectId(oid), { $set: { liked: newLiked } }, { new: true })

    if (isAns) {
      const data2 = await OptionClusterModel.findById(new Types.ObjectId(ocid))

      if (data2) {
        const options = await OptionModel.find({ _id: { $in: data2.disList } })
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
          throw new Error('Error updating option cluster')
        }
      } else {
        throw new Error('OptionCluster not found')
      }
    } else {
      const data2 = await OptionClusterModel.findById(new Types.ObjectId(ocid))

      if (data2) {
        const data3 = await OptionModel.find({ _id: { $in: data2.disList } })
        const options = data3
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
          throw new Error('Error updating option cluster')
        }
      } else {
        throw new Error('OptionCluster not found')
      }
    }
  } else {
    throw new Error('Option not found')
  }
})
