import { FacultyId, facultyMap } from './faculties'

export interface Workshop {
  id: string // should be unique (use for bookmarking)
  faculty: string
  name: string
  description: string
  major: string
  thumbnail: string
  registerUrl: string
}

// map from faculty id to workshops
export const workshops: Partial<Record<FacultyId, Workshop[]>> = {
  [FacultyId.Arts]: [
    {
      id: 'workshop-1',
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
      faculty: facultyMap[FacultyId.Arts].th,
      name: 'Workshop 5',
      description:
        'Lorem ipsum dolor sit amet consectetur. Ultrices tortor egestas viverra placerat volutpat vulputate ',
      major: 'เอกภาษาฝรั่งเศส',
      thumbnail: '/assets/workshop/workshop.png',
      registerUrl: '/register5',
    },
  ],
}

export const allWorkshops = Object.values(workshops).flat()
