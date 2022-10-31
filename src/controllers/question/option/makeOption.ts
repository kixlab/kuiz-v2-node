import { Types } from 'mongoose'
import { MakeOptionParams, MakeOptionResults } from '../../../api/question/option/makeOption'
import { OptionModel } from '../../../db/option'
import { OptionClusterModel } from '../../../db/optionCluster'
import { QStemModel } from '../../../db/qstem'
import { UserModel } from '../../../db/user'
import { Post } from '../../methods'

export const makeOption = Post<MakeOptionParams, MakeOptionResults>(async ({ optionData, dependency }) => {
  const option = new OptionModel(optionData)

  // 1. save new option to option collection
  // 2. make new OptionCluster
  // 3. if required, delete previous OptionCluster
  // 4. update OptionCluster id of relevant dataset
  // 4.1 option
  // update previous optionCluster
  // 4.2 qstem
  // 5. update option list for qstem data
  // 6. update made option list for user data

  await option.save()
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
      newAnsRep = await OptionModel.findOne({ _id: new Types.ObjectId(newAnsList[0].id) })
    }
  }

  const optionCluster = new OptionClusterModel({
    ansList: newAnsList,
    disList: newDisList,
    qstem: option.qstem,
    ansExist: newAnsList.length !== 0,
    disExist: newDisList.length !== 0,
    ansRep: newAnsRep,
    disRep: newDisRep,
  })

  await optionCluster.save()

  const toDelete = dependency.map(c => c.id)
  await OptionClusterModel.deleteMany({ _id: { $in: toDelete } })
  // 새로운 clutser의 option
  const optionList = [...newAnsList, ...newDisList]
  await OptionModel.updateMany({ _id: { $in: optionList } }, { $set: { cluster: optionCluster.id } })

  const qStem = await QStemModel.findByIdAndUpdate(option.qstem, {
    $push: { options: option.id, cluster: [optionCluster.id] },
  })

  if (qStem) {
    const newClusList = qStem.cluster.concat([optionCluster._id]).filter(clus => !toDelete.includes(clus.toString()))
    await QStemModel.findByIdAndUpdate(option.qstem, { $set: { cluster: newClusList } })
    await UserModel.findByIdAndUpdate(option.author, { $push: { madeOptions: option } })
    return {
      option,
    }
  } else {
    throw new Error('qstem not found')
  }
})
