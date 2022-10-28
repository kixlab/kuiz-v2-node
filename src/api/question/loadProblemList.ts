import { QStem } from '../../db/qstem'

export interface LoadProblemListParams {
  cid: string
}

export interface LoadProblemListResults {
  problemList: QStem[]
}
