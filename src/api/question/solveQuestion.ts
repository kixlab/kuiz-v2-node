export interface SolveQuestionParams {
  uid: string
  initAns: string
  qid: string
  optionSet: string[]
  isCorrect: boolean
}

export interface SolveQuestionResults {
  success: boolean
}
