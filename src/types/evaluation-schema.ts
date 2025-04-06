import { z } from 'zod'

import { news } from '@/const/evalution-news'

// Main schema for the evaluation form
export const EvaluationSchema = z.object({
  // ส่วนที่ 1: ความพึงพอใจต่อกิจกรรม
  q11: z.array(z.enum(news)).optional(),
  q11_other: z.string().optional(), // Optional field for other sources
  q12: z.number().min(1).max(5),
  q13: z.number().min(1).max(5),
  q14: z.number().min(1).max(5),
  q15: z.number().min(1).max(5),
  q16: z.string().optional(), // Optional field for additional comments

  // ส่วนที่ 2: ความสามารถในการจัดการกิจกรรม
  q21: z.number().min(1).max(5),
  q22: z.number().min(1).max(5),
  q23: z.number().min(1).max(5),
  q24: z.number().min(1).max(5),
  q25: z.number().min(1).max(5),
  q26: z.number().min(1).max(5),

  // ส่วนที่ 3: ความพึงพอใจต่อเว็บไซต์
  q31: z.number().min(1).max(5),
  q32: z.number().min(1).max(5),
  q33: z.string(),
  igusername: z.string(),
})

export type EvaluationForm = z.infer<typeof EvaluationSchema>
