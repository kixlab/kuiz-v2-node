import { QStem } from '../../db/qstem'

export interface loadCreatedStemDataParams {
  uid: string
}

export interface loadCreatedStemDataResults {
  madeStem: QStem[]
}
