import { Model, Document } from 'mongoose'

export interface KuizModel<M, R extends keyof M> extends Model<M> {
  createDoc(args: Required<Pick<M, R>> & Partial<M>): M & Document
}
