import { Option } from '../../db/option'
import { QStem } from '../../db/qstem'

export interface LoadProblemDetailParams {
  qid: string
}

export interface LoadProblemDetailResults {
  qinfo: QStem
  options: Option[]
}
