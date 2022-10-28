import { Types } from 'mongoose'
import { createFullQuestionParams, createFullQuestionResults } from '../../api/question/createFullQuestion'
import { ClassModel } from '../../db/class'
import { OptionModel } from '../../db/option'
import { QStemModel } from '../../db/qstem'
import { UserModel } from '../../db/user'
import { Post } from '../methods'

export const createFullQuestion = Post<createFullQuestionParams, createFullQuestionResults>(
  async ({ optionList, qinfo, cid, explanation }) => {
    /*
    logic
    - 불러올 것 : option List(어떤 index가 정답인지에 대한 정보), question Info(author, qstem HTML, qstem string, class), 
    - option들을 저장한다
    - option Set에 option id를 정답 option id와 함께 저장한다
    - qstem object를 만들어 qstem에 저장한다
    - class와 user info에 qstem을 push 해준다. 
    */

    const savedOptions = await Promise.all(
      optionList.map(async option => {
        const newOption = new OptionModel(option)
        const data = await newOption.save()
        return data.id
      })
    )

    const newQuestion = new QStemModel({
      authorId: qinfo.authorId,
      options: savedOptions,
      explanation,
    })
    await newQuestion.save()
    await ClassModel.findByIdAndUpdate(new Types.ObjectId(cid), { $push: { qstems: newQuestion.id } })
    await UserModel.findByIdAndUpdate(new Types.ObjectId(qinfo.authorId), { $push: { made: newQuestion.id } })

    return {
      question: newQuestion,
    }
  }
)
