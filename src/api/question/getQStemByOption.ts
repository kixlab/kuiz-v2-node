import { QStem } from '../../db/qstem'

export interface GetQstemByOptionParams {
  qstems: string[]
}

export interface GetQstemByOptionResults {
  qstems: QStem[]
}
