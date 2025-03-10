import { type StudentData } from '@/types/student-data'

// Function to transform values to StudentData format
function transformToStudentData(values: {
  id: string
  name: string
  surname: string
  birthDate: Date
  status?: string
  email: string
  phone: string
  province?: string
  school?: string
  firstInterest?: string
  secondInterest?: string
  thirdInterest?: string
  objective?: string
}): StudentData {
  return {
    id: values.id,
    name: `${values.name} ${values.surname}`,
    birthDate: values.birthDate.toISOString(),
    status: values.status,
    email: values.email,
    phone: values.phone,
    province: values.province,
    school: values.school,
    firstInterest: values.firstInterest,
    secondInterest: values.secondInterest,
    thirdInterest: values.thirdInterest,
    objective: values.objective,
  }
}

export default transformToStudentData
