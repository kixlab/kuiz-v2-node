import { QStem } from '../../db/qstem'

export interface createFullQuestionParams {
  optionList: string[]
  qinfo: {
    authorId: string
  }
  cid: string
  explanation: string
}

export interface createFullQuestionResults {
  question: QStem
}
