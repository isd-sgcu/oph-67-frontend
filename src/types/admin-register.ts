import { z } from 'zod'

import { FacultyTH } from '@/const/faculties'

export const AdminRegisterSchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'ชื่อ'),
  surname: z.string().min(1, 'นามสกุล'),
  nickname: z.string().min(1, 'ชื่อเล่น'),
  studentId: z.string().min(1, 'รหัสนิสิต'),
  email: z.string().email('@email.com'),
  phone: z.string().min(1, 'เบอร์โทรศัพท์'),
  status: z.enum(['Staff ส่วนกลาง', 'Staff ประจำคณะ'], {
    message: 'สถานภาพ',
  }),
  faculty: z
    .enum(FacultyTH, {
      message: 'เลือกคณะ',
    })
    .optional(),
  year: z.enum(['1', '2', '3', '4', '5', '6'], {
    message: 'ชั้นปี',
  }),
})

export type AdminRegisterForm = z.infer<typeof AdminRegisterSchema>

export interface AdminRegisterReq extends AdminRegisterForm {
  id: string
}

export const AdminRegisterRespSchema = z.object({
  accessToken: z.string(),
  userId: z.string(),
})

export type AdminRegisterResp = z.infer<typeof AdminRegisterRespSchema>
