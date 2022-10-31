import { QStem } from '../../../db/qstem'
import { Option } from '../../../db/option'

export interface LoadOptionsParams {
  qid: string
}

export interface LoadOptionsResults {
  options: Option[]
  qinfo: QStem
}
