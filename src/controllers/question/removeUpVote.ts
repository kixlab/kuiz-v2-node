import { Types } from 'mongoose'
import { RemoveUpVoteParams, RemoveUpVoteResults } from '../../api/question/removeUpVote'
import { OptionModel } from '../../db/option'
import { optionClusterService } from '../../services/optionCluster'
import { Post } from '../methods'

export const removeUpVote = Post<RemoveUpVoteParams, RemoveUpVoteResults>(async ({ oid, uid }) => {
  const option = await OptionModel.findById(new Types.ObjectId(oid))

  if (option) {
    for await (const ocid of option.cluster) {
      removeUser(option.liked, new Types.ObjectId(uid))
      await OptionModel.findByIdAndUpdate(new Types.ObjectId(oid), { $set: { liked: option.liked } }, { new: true })

      await optionClusterService.updateRep(option.is_answer, ocid)
    }
    return {}
  } else {
    throw new Error('Option not found')
  }
})

function removeUser(users: Types.ObjectId[], user: Types.ObjectId) {
  if (users.includes(user)) {
    users.splice(users.indexOf(user), 1)
  }
}
