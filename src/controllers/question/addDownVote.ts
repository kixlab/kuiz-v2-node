import { Types } from 'mongoose'
import { AddDownVoteParams, AddDownVoteResults } from '../../api/question/addDownVote'
import { OptionModel } from '../../db/option'
import { optionClusterService } from '../../services/optionCluster'
import { Post } from '../methods'

export const addDownVote = Post<AddDownVoteParams, AddDownVoteResults>(async ({ oid, uid }) => {
  const option = await OptionModel.findById(new Types.ObjectId(oid))

  if (option) {
    for await (const ocid of option.cluster) {
      addUser(option.disliked, new Types.ObjectId(uid))
      await OptionModel.findByIdAndUpdate(
        new Types.ObjectId(oid),
        { $set: { disliked: option.disliked } },
        { new: true }
      )

      optionClusterService.updateRep(option.is_answer, ocid)
    }
    return {}
  } else {
    throw new Error('Option not found')
  }
})

function addUser(users: Types.ObjectId[], user: Types.ObjectId) {
  if (users.every(u => u.id !== user.id)) {
    users.push(user)
  }
}
