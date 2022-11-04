import { setTimeout } from 'timers/promises'
import { StatusCheckParams, StatusCheckResults } from '../api/statusCheck'
import { Get } from './methods'

export const statusCheck = Get<StatusCheckParams, StatusCheckResults>(async () => {
  await setTimeout(3000)
  return {
    success: true,
  }
})
