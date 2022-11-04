import { QStem } from '../../db/qstem'

export interface createFullQuestionParams {
  optionList: {
    option_text: string
    is_answer: boolean
  }[]
  qinfo: {
    authorId: string
  }
  cid: string
  explanation: string
}

export interface createFullQuestionResults {
  question: QStem
}
