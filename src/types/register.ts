import { z } from 'zod'

import { FacultyTH } from '@/const/faculties'
import { news } from '@/const/news'
import { provinces } from '@/const/province'
import { status } from '@/const/status'

export const RegisterSchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'ชื่อ'),
  surname: z.string().min(1, 'นามสกุล'),
  dob: z.date().refine((date) => !isNaN(date.getTime())),
  status: z.enum(status, {
    message: 'สถานภาพ',
  }),
  email: z.string().email('@email.com'),
  province: z.enum(provinces, {
    message: 'เลือกจังหวัดที่อยู่',
  }),
  school: z.string().min(1, 'โรงเรียน'),
  faculty1: z.enum(FacultyTH, {
    message: 'เลือกคณะที่สนใจอันดับ 1',
  }),
  news: z.array(z.enum(news)).optional(),
  otherNews: z.string().min(1).optional(),
  faculty2: z.enum(FacultyTH, {
    message: 'เลือกคณะที่สนใจอันดับ 2',
  }),
  faculty3: z.enum(FacultyTH, {
    message: 'เลือกคณะที่สนใจอันดับ 3',
  }),
  purpose: z.string().min(1, 'กรอกจุดประสงค์'),
  isConfirm: z
    .boolean({ message: 'กรุณากดยืนยันข้อมูล' })
    .refine((value) => value, { message: 'กรุณากดยืนยันข้อมูล' })
    .nullable(),
})

export type RegisterForm = z.infer<typeof RegisterSchema>

export interface RegisterReq extends RegisterForm {
  id: string
}

export const RegisterRespSchema = z.object({
  accessToken: z.string(),
  userId: z.string(),
})

export type RegisterResp = z.infer<typeof RegisterRespSchema>
