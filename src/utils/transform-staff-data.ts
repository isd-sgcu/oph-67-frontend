import { type StaffData } from '../types/staff-data'

// Function to transform values to StaffData format
function transformToStaffData(values: {
  id: string
  name: string
  surname: string
  nickname: string
  studentId: string
  email: string
  phone: string
  status: 'Staff ส่วนกลาง' | 'Staff ประจำคณะ'
  year: '1' | '2' | '3' | '4' | '5' | '6'
  faculty?: string
}): StaffData {
  return {
    id: values.id,
    name: `${values.name} ${values.surname}`,
    phone: values.phone,
    nickname: values.nickname,
    studentId: values.studentId,
    email: values.email,
    faculty: values.status === 'Staff ส่วนกลาง' ? '' : values.faculty,
    year: parseInt(values.year, 10),
    isCentralStaff: values.status === 'Staff ส่วนกลาง',
  }
}

export default transformToStaffData
