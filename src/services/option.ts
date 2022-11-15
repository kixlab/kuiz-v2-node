import { Types } from 'mongoose'
import { OptionModel } from '../db/option'
import { QStemModel } from '../db/qstem'
import { UserModel } from '../db/user'

class OptionService {
  async create(
    uid: Types.ObjectId,
    qid: Types.ObjectId,
    cid: Types.ObjectId,
    option_text: string,
    is_answer: boolean,
    explanation: string,
    keywords: string[]
  ) {
    const option = OptionModel.createDoc({
      author: uid,
      class: cid,
      option_text,
      is_answer,
      explanation,
      qstem: qid,
      keyWords: keywords,
    })
    await option.save()

    await UserModel.findByIdAndUpdate(uid, { $push: { madeOptions: option.id } })

    await QStemModel.findByIdAndUpdate(qid, {
      $push: { options: option.id },
      $addToSet: { keyword: { $each: keywords } },
    })

    return option
  }
}

export const optionService = new OptionService()
