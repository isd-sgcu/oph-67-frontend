export const status = ['centralStaff', 'facultyStaff'] as const

export const statusMap = {
  centralStaff: 'Staff ส่วนกลาง',
  facultyStaff: 'Staff ประจำคณะ',
}

export type Status = (typeof status)[number]
