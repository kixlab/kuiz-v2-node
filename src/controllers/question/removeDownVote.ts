import { Types } from 'mongoose'
import { RemoveDownVoteParams, RemoveDownVoteResults } from '../../api/question/removeDownVote'
import {} from '../../api/question/removeUpVote'
import { OptionModel } from '../../db/option'
import { optionClusterService } from '../../services/optionCluster'
import { Post } from '../methods'

export const removeDownVote = Post<RemoveDownVoteParams, RemoveDownVoteResults>(async ({ oid, uid }) => {
  const option = await OptionModel.findById(new Types.ObjectId(oid))

  if (option) {
    for await (const ocid of option.cluster) {
      removeUser(option.disliked, new Types.ObjectId(uid))
      await OptionModel.findByIdAndUpdate(
        new Types.ObjectId(oid),
        { $set: { disliked: option.disliked } },
        { new: true }
      )

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
