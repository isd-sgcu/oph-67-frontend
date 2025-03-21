export const getWorkshopsBookmarked = (): string[] => {
  if (typeof window === 'undefined') {
    return []
  }

  const workshops = localStorage.getItem('workshops')
  if (!workshops) {
    localStorage.setItem('workshops', JSON.stringify([]))
    return []
  }
  return JSON.parse(workshops) as string[]
}

const setWorkshopsBookmarked = (workshops: string[]): void => {
  if (typeof window === 'undefined') return
  localStorage.setItem('workshops', JSON.stringify(workshops))
}

export const toggleWorkshopBookmark = (workshopId: string): void => {
  const workshops = getWorkshopsBookmarked()
  const index = workshops.findIndex((w) => w === workshopId)

  const newWorkshops =
    index === -1
      ? [...workshops, workshopId]
      : workshops.filter((_, i) => i !== index)
  setWorkshopsBookmarked(newWorkshops)
}

export const isWorkshopBookmarked = (workshopId: string): boolean => {
  const workshops = getWorkshopsBookmarked()
  return workshops.includes(workshopId)
}
