export const getTimer = (
  targetDate = '2025-03-14T00:00:00'
): {
  days: number
  hours: number
  minutes: number
  seconds: number
  time_left: number
} => {
  const target = new Date(targetDate).getTime()
  const now = new Date().getTime()
  const diff = target - now

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, time_left: 0 }
  }

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((diff % (1000 * 60)) / 1000),
    time_left: diff,
  }
}
