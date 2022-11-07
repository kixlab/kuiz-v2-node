import { Types } from 'mongoose'
import { CreateQStemParams, CreateQStemResults } from '../../api/question/createQStem'
import { ClassModel } from '../../db/class'
import { QStemModel } from '../../db/qstem'
import { UserModel } from '../../db/user'
import { Post } from '../methods'

export const createQStem = Post<CreateQStemParams, CreateQStemResults>(async ({ qstemObj, cid }) => {
  const qstem = new QStemModel(qstemObj)

  await qstem.save()

  const targetClass = await ClassModel.findById(new Types.ObjectId(cid))

  if (targetClass) {
    await ClassModel.updateOne({ _id: new Types.ObjectId(cid) }, { $push: { qstems: qstem.id } })

    await UserModel.findByIdAndUpdate(qstem.author, { $push: { made: qstem.id } })

    return {
      data: qstem.id,
    }
  }
  throw new Error('Class not found')
})
