import { FacultyId, facultyMap } from './faculties'

export interface Workshop {
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
      faculty: facultyMap[FacultyId.Arts].th,
      name: 'Workshop 1',
      description:
        'Lorem ipsum dolor sit amet consectetur. Ultrices tortor egestas viverra placerat volutpat vulputate ',
      major: 'เอกภาษาเกาหลี',
      thumbnail: '/assets/faculties/art/1.png',
      registerUrl: '/register1',
    },
    {
      faculty: facultyMap[FacultyId.Arts].th,
      name: 'Workshop 2',
      description:
        'Lorem ipsum dolor sit amet consectetur. Ultrices tortor egestas viverra placerat volutpat vulputate ',
      major: 'เอกภาษาญี่ปุ่น',
      thumbnail: '/assets/faculties/art/1.png',
      registerUrl: '/register2',
    },
    {
      faculty: facultyMap[FacultyId.Arts].th,
      name: 'Workshop 3',
      description:
        'Lorem ipsum dolor sit amet consectetur. Ultrices tortor egestas viverra placerat volutpat vulputate ',
      major: 'เอกภาษาจีน',
      thumbnail: '/assets/faculties/art/1.png',
      registerUrl: '/register3',
    },
    {
      faculty: facultyMap[FacultyId.Arts].th,
      name: 'Workshop 4',
      description:
        'Lorem ipsum dolor sit amet consectetur. Ultrices tortor egestas viverra placerat volutpat vulputate ',
      major: 'เอกภาษาอังกฤษ',
      thumbnail: '/assets/faculties/art/1.png',
      registerUrl: '/register4',
    },
    {
      faculty: facultyMap[FacultyId.Arts].th,
      name: 'Workshop 5',
      description:
        'Lorem ipsum dolor sit amet consectetur. Ultrices tortor egestas viverra placerat volutpat vulputate ',
      major: 'เอกภาษาฝรั่งเศส',
      thumbnail: '/assets/faculties/art/1.png',
      registerUrl: '/register5',
    },
  ],
}
