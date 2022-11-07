import { format } from 'date-fns'
import { StatusCheckParams, StatusCheckResults } from '../api/statusCheck'
import { Get } from './methods'
import { utcToZonedTime } from 'date-fns-tz'

const startTime = utcToZonedTime(Date.now(), 'Asia/Seoul')

export const statusCheck = Get<StatusCheckParams, StatusCheckResults>(async () => {
  return {
    success: true,
    startTime: format(startTime, 'yyyy-MM-dd HH:mm:ss'),
  }
})
