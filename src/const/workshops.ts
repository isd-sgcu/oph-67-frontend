import { z } from 'zod'

import { FacultyId, facultyMap } from './faculties'

// Define the Zod schema for a workshop
const WorkshopSchema = z.object({
  id: z.string().min(1, 'ID is required'),
  facultyId: z.enum([...(Object.values(FacultyId) as [string, ...string[]])]),
  faculty: z.string().min(1, 'Faculty is required'),
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(1, 'Description is required'),
  major: z.string().min(1, 'Major is required'),
  thumbnail: z.string().min(1, 'Thumbnail is required'),
  registerUrl: z.string().min(1, 'registerUrl is required'),
})

// TypeScript type inferred from the schema
export type Workshop = z.infer<typeof WorkshopSchema>

// Ensure all workshops have unique IDs across faculties
const _allWorkshops: Workshop[] = [
  {
    id: 'workshop-1',
    facultyId: FacultyId.Arts,
    faculty: facultyMap[FacultyId.Arts].th,
    name: 'Workshop 1',
    description:
      'Lorem ipsum dolor sit amet consectetur. Ultrices tortor egestas viverra placerat volutpat vulputate ',
    major: 'เอกภาษาเกาหลี',
    thumbnail: '/assets/workshop/workshop.png',
    registerUrl: '/register1',
  },
  {
    id: 'workshop-2',
    facultyId: FacultyId.Arts,
    faculty: facultyMap[FacultyId.Arts].th,
    name: 'Workshop 2',
    description:
      'Lorem ipsum dolor sit amet consectetur. Ultrices tortor egestas viverra placerat volutpat vulputate ',
    major: 'เอกภาษาญี่ปุ่น',
    thumbnail: '/assets/workshop/workshop.png',
    registerUrl: '/register2',
  },
  {
    id: 'workshop-3',
    facultyId: FacultyId.Arts,
    faculty: facultyMap[FacultyId.Arts].th,
    name: 'Workshop 3',
    description:
      'Lorem ipsum dolor sit amet consectetur. Ultrices tortor egestas viverra placerat volutpat vulputate ',
    major: 'เอกภาษาจีน',
    thumbnail: '/assets/workshop/workshop.png',
    registerUrl: '/register3',
  },
  {
    id: 'workshop-4',
    facultyId: FacultyId.Arts,
    faculty: facultyMap[FacultyId.Arts].th,
    name: 'Workshop 4',
    description:
      'Lorem ipsum dolor sit amet consectetur. Ultrices tortor egestas viverra placerat volutpat vulputate ',
    major: 'เอกภาษาอังกฤษ',
    thumbnail: '/assets/workshop/workshop.png',
    registerUrl: '/register4',
  },
  {
    id: 'workshop-5',
    facultyId: FacultyId.Arts,
    faculty: facultyMap[FacultyId.Arts].th,
    name: 'Workshop 5',
    description:
      'Lorem ipsum dolor sit amet consectetur. Ultrices tortor egestas viverra placerat volutpat vulputate ',
    major: 'เอกภาษาฝรั่งเศส',
    thumbnail: '/assets/workshop/workshop.png',
    registerUrl: '/register5',
  },
]
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
