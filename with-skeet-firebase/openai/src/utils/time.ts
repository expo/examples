import { format } from 'date-fns'
import { utcToZonedTime } from 'date-fns-tz'

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export const getTimestamp = async () => {
  const now = new Date()
  const timeZone = 'UTC'
  const nowUtc = utcToZonedTime(now, timeZone)
  const timestamp = format(nowUtc, 'yyyy-MM-dd:HH:mm:ss')
  return timestamp
}
