import { QStem } from '../../db/qstem'

export interface CreateFullQuestionParams {
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

export interface CreateFullQuestionResults {
  question: QStem
}
