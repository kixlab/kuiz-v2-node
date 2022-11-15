import { Types } from 'mongoose'
import { MakeOptionParams, MakeOptionResults } from '../../../api/question/option/makeOption'
import { OptionModel } from '../../../db/option'
import { OptionClusterModel } from '../../../db/optionCluster'
import { QStemModel } from '../../../db/qstem'
import { optionService } from '../../../services/option'
import { Post } from '../../methods'

export const makeOption = Post<MakeOptionParams, MakeOptionResults>(async ({ optionData, dependency }) => {
  const option = await optionService.create(
    new Types.ObjectId(optionData.author),
    new Types.ObjectId(optionData.qstem),
    new Types.ObjectId(optionData.class),
    optionData.option_text,
    optionData.is_answer,
    optionData.explanation,
    optionData.keywords
  )

  const newAnsList = option.is_answer ? [option] : []
  const newDisList = option.is_answer ? [] : [option]

  let newAnsRep = null
  let newDisRep = null

  for (let i = 0; i < dependency.length; i++) {
    newAnsList.push(...dependency[i].ansList)
    newDisList.push(...dependency[i].disList)
  }

  if (option.is_answer) {
    newAnsRep = option
    if (newDisList.length !== 0) {
      newDisRep = await OptionModel.findById(new Types.ObjectId(newDisList[0].id))
    }
  } else {
    newDisRep = option
    if (newAnsList.length !== 0) {
      newAnsRep = await OptionModel.findById(new Types.ObjectId(newAnsList[0].id))
    }
  }

  const optionCluster = OptionClusterModel.createDoc({
    ansList: newAnsList.map(l => l.id),
    disList: newDisList.map(l => l.id),
    qstem: option.qstem,
    ansExist: 0 < newAnsList.length,
    disExist: 0 < newDisList.length,
    ansRep: newAnsRep?.id,
    disRep: newDisRep?.id,
  })

  await optionCluster.save()

  const toDelete = dependency.map(c => c.id)
  await OptionClusterModel.deleteMany({ _id: { $in: toDelete } })
  // 새로운 clutser의 option
  const optionList = [...newAnsList, ...newDisList]
  await OptionModel.updateMany({ _id: { $in: optionList } }, { $set: { cluster: optionCluster.id } })

  const qStem = await QStemModel.findById(option.qstem)

  if (qStem) {
    const newClusList = qStem.cluster.concat([optionCluster._id]).filter(clus => !toDelete.includes(clus.toString()))
    await QStemModel.findByIdAndUpdate(option.qstem, { $set: { cluster: newClusList } })
    return {
      option,
    }
  } else {
    throw new Error('qstem not found')
  }
})
