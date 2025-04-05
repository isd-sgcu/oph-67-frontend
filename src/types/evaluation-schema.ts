import { z } from 'zod'

import { news } from '@/const/evalution-news'

// Main schema for the evaluation form
const EvaluationSchema = z.object({
  // ส่วนที่ 1: ความพึงพอใจต่อกิจกรรม
  part1: z.object({
    1_1: z.array(z.enum(news)).optional(),
    1_2: z.number().min(1).max(5),
    1_3: z.number().min(1).max(5),
    1_4: z.number().min(1).max(5),
    1_5: z.number().min(1).max(5),
    1_6: z.string().optional(), // Optional field for additional comments
  }),

  // ส่วนที่ 2: ความสามารถในการจัดการกิจกรรม
  part2: z.object({
    2_1: z.number().min(1).max(5),
    2_2: z.number().min(1).max(5),
    2_3: z.number().min(1).max(5),
    2_4: z.number().min(1).max(5),
    2_5: z.number().min(1).max(5),
    2_6: z.number().min(1).max(5),
  }),

  // ส่วนที่ 3: ความพึงพอใจต่อเว็บไซต์
  part3: z.object({
    3_1: z.number().min(1).max(5),
    3_2: z.number().min(1).max(5),
    3_3: z.string(),
  }),
})

export type EvaluationForm = z.infer<typeof EvaluationSchema>
