export interface CreateQStemParams {
  qstemObj: {
    author: string
    stem_text: string
    raw_string: string
    action_verb: string[]
    keyword: string[]
    class: string
    options: string[]
    optionSets: string[]
    learning_objective: string
  }
  cid: string
}

export interface CreateQStemResults {
  data: string
}
