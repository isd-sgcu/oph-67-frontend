import { z } from 'zod'

import { FacultyId, facultyMap } from './faculties'
import { workshopJson } from './workshop-json'

// Define the Zod schema for a workshop
const WorkshopSchema = z
  .object({
    id: z.string().min(1, 'ID is required'),
    facultyId: z.enum([...(Object.values(FacultyId) as [string, ...string[]])]),
    faculty: z.string().optional(),
    name: z.string().min(1, 'Name is required'),
    description: z.string().min(1, 'Description is required'),
    major: z.string().optional(),
    thumbnail: z.string().optional(),
    registerUrl: z.string().optional(),
    organizer: z.string().optional(),
    location: z.string().optional(),
    numberOfRounds: z.string().optional(),
    time: z.string().optional(),
    participantsPerRound: z.string().optional(),
    instagram: z.string().optional(),
    facebook: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    // Update the faculty field based on facultyId
    if (Object.hasOwn(facultyMap, data.facultyId)) {
      data.faculty = facultyMap[data.facultyId].th
    } else {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `Faculty ID ${data.facultyId} is not found in the faculty map`,
      })
    }
    return data
  })

// TypeScript type inferred from the schema
export type Workshop = z.infer<typeof WorkshopSchema>

// Ensure all workshops have unique IDs across faculties
const _allWorkshops: Workshop[] = ((): Workshop[] => {
  try {
    const jsonData: unknown = JSON.parse(workshopJson)

    const workshops = z.array(WorkshopSchema).parse(jsonData)

    return workshops
  } catch (err) {
    console.error(err)
    throw new Error('Error reading workshops.json')
  }
})()

// Validate workshops with unique ID constraint
const _workshops = z.array(WorkshopSchema).superRefine((workshops, ctx) => {
  const ids = new Set<string>()
  for (const workshop of workshops) {
    if (ids.has(workshop.id)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `Duplicate workshop ID found: ${workshop.id}`,
      })
    }
    ids.add(workshop.id)
  }
})

export const allWorkshops = _workshops.parse(_allWorkshops)

// Map from faculty ID to workshops
export const workshops: Partial<Record<FacultyId, Workshop[]>> = (() => {
  const _map: Partial<Record<FacultyId, Workshop[]>> = {}

  // Validate and map the workshops
  allWorkshops.forEach((workshop) => {
    const facultyEnumValue = Object.values(FacultyId).find(
      (val) => val.toString() === workshop.facultyId
    )

    if (facultyEnumValue) {
      _map[facultyEnumValue] = _map[facultyEnumValue] ?? []
      _map[facultyEnumValue].push(workshop)
    }
  })

  return _map
})()
