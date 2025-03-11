import { z } from 'zod'

import { FacultyTH } from '@/const/faculties'
import { news } from '@/const/news'
import { provinces } from '@/const/province'
import { status } from '@/const/status'

export const RegisterSchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'ชื่อ'),
  surname: z.string().min(1, 'นามสกุล'),
  birthDate: z.date().refine((date) => !isNaN(date.getTime())),
  status: z.enum(status.map((s) => s.th) as [string, ...string[]], {
    message: 'สถานภาพ',
  }),
  email: z.string().email('@email.com'),
  phone: z.string().min(1, 'เบอร์โทรศัพท์'),
  province: z.enum(provinces.map((p) => p.th) as [string, ...string[]], {
    message: 'เลือกจังหวัดที่อยู่',
  }),
  school: z.string().min(1, 'โรงเรียน'),
  selectedSources: z.array(z.enum(news)).optional(),
  otherSource: z.string().min(1).optional(),
  firstInterest: z.enum(FacultyTH, {
    message: 'เลือกคณะที่สนใจอันดับ 1',
  }),
  secondInterest: z.enum(FacultyTH, {
    message: 'เลือกคณะที่สนใจอันดับ 2',
  }),
  thirdInterest: z.enum(FacultyTH, {
    message: 'เลือกคณะที่สนใจอันดับ 3',
  }),
  objective: z.string().min(1, 'กรอกจุดประสงค์'),
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
