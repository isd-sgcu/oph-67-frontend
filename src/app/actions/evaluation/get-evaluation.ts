'use server'

import { getAuthToken } from '@/app/actions/auth'
import { config } from '@/app/config'
import { type EvaluationData } from '@/types/evaluation-backed-interface'

export async function CheckEvaluation(id: string): Promise<{
  eval: EvaluationData | null
  message: string
}> {
  const token = await getAuthToken()
  if (!token) {
    return {
      eval: null,
      message: 'ไม่พบ token โปรดเข้าสู่ระบบใหม่อีกครั้ง',
    }
  }

  const res = await fetch(`${config.baseURL}/api/student-evaluation/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })

  if (!res.ok) {
    const errorData = await res.text()
    const errorCode = res.status
    if (errorCode === 404) {
      return {
        eval: null,
        message: 'Student evaluation not found',
      }
    }
    console.error('Server Error:', errorData)
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return -- We are confident that the response is JSON
  return res.json()
}
