import { Types } from 'mongoose'
import { AddUpVoteParams, AddUpVoteResults } from '../../api/question/addUpVote'
import { OptionModel } from '../../db/option'
import { optionClusterService } from '../../services/optionCluster'
import { Post } from '../methods'

export const addUpVote = Post<AddUpVoteParams, AddUpVoteResults>(async ({ oid, uid }) => {
  const option = await OptionModel.findById(new Types.ObjectId(oid))

  if (option) {
    for await (const ocid of option.cluster) {
      addUser(option.liked, new Types.ObjectId(uid))
      await OptionModel.findByIdAndUpdate(new Types.ObjectId(oid), { $set: { liked: option.liked } })

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
