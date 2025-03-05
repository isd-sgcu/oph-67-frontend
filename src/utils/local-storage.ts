export const getWorkshopsBookmarked = (): string[] => {
  const workshops = localStorage.getItem('workshops')
  if (!workshops) {
    localStorage.setItem('workshops', JSON.stringify([]))
    return []
  }
  return JSON.parse(workshops) as string[]
}

const setWorkshopsBookmarked = (workshops: string[]): void => {
  localStorage.setItem('workshops', JSON.stringify(workshops))
}

export const isWorkshopBookmarked = (workshopId: string): boolean => {
  const workshops = getWorkshopsBookmarked()
  return workshops.some((workshop) => workshop === workshopId)
}

export const toggleWorkshopBookmark = (workshopId: string): void => {
  const workshops = getWorkshopsBookmarked()
  const index = workshops.findIndex((w) => w === workshopId)
  if (index === -1) {
    workshops.push(workshopId)
  } else {
    workshops.splice(index, 1)
  }
  setWorkshopsBookmarked(workshops)
}
