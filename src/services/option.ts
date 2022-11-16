import { Document, Types } from 'mongoose'
import { Option, OptionModel } from '../db/option'
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
    option.cluster = option.id
    await option.save()

    await UserModel.findByIdAndUpdate(uid, { $push: { madeOptions: option.id } })

    await QStemModel.findByIdAndUpdate(qid, {
      $push: { options: option.id },
      $addToSet: { keyword: { $each: keywords } },
    })

    return option
  }

  async getClusters(qid: Types.ObjectId): Promise<[Option, Option[]][]> {
    const options = await OptionModel.find({ qstem: new Types.ObjectId(qid) })
    const clusters = new Map<Types.ObjectId, [Option, Option[]]>()

    for (const option of options) {
      const cluster = await this.findOption(option.id)
      if (!clusters.has(cluster.id)) {
        clusters.set(cluster.id, [cluster, [cluster]])
      }
      const [representative, members] = clusters.get(cluster.id)!
      const repScore = representative.liked.length - representative.disliked.length
      const optionScore = option.liked.length - option.disliked.length
      if (repScore < optionScore) {
        clusters.get(cluster.id)![0] = option
      }
      members.push(option)
    }

    return [...clusters.values()]
  }

  async findOption(oid: Types.ObjectId): Promise<Document<unknown, any, Option> & Option> {
    const option = await OptionModel.findById(oid)

    if (option) {
      if (option.cluster === option.id) {
        return option
      } else {
        const cluster = await this.findOption(option.cluster)
        option.cluster = cluster.id
        await option.save()
        return cluster
      }
    } else {
      throw new Error('Option not found')
    }
  }

  async unionOption(oid1: Types.ObjectId, oid2: Types.ObjectId): Promise<void> {
    const cluster1 = await this.findOption(oid1)
    const cluster2 = await this.findOption(oid2)

    if (cluster1.id < cluster2.id) {
      await OptionModel.findByIdAndUpdate(oid1, { cluster: cluster2 })
    } else if (cluster2.id < cluster1.id) {
      await OptionModel.findByIdAndUpdate(oid2, { cluster: cluster1 })
    }
  }

  async addVote(type: 'liked' | 'disliked', oid: Types.ObjectId, uid: Types.ObjectId): Promise<void> {
    const option = await OptionModel.findById(oid)

    if (option) {
      const i = option[type].findIndex(u => u.id === uid.id)
      if (i < 0) {
        option[type].push(uid)
        await OptionModel.findByIdAndUpdate(new Types.ObjectId(oid), { $set: { [type]: option[type] } })
      }
    } else {
      throw new Error('Option not found')
    }
  }

  async removeVote(type: 'liked' | 'disliked', oid: Types.ObjectId, uid: Types.ObjectId): Promise<void> {
    const option = await OptionModel.findById(oid)

    if (option) {
      const i = option[type].findIndex(u => u.id === uid.id)
      if (0 <= i) {
        option[type].splice(i, 1)
        await OptionModel.findByIdAndUpdate(new Types.ObjectId(oid), { $set: { [type]: option[type] } })
      }
    } else {
      throw new Error('Option not found')
    }
  }
}

export const optionService = new OptionService()
