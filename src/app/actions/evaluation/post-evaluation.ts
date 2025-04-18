'use server'

import { getAuthToken } from '@/app/actions/auth'
import { config } from '@/app/config'
import { type EvaluationData } from '@/types/evaluation-backed-interface'

export async function submitEvaluation(formData: EvaluationData): Promise<{
  success: boolean
  message: string
}> {
  try {
    const token = await getAuthToken()
    if (!token) {
      return {
        success: false,
        message: 'ไม่พบ token โปรดเข้าสู่ระบบใหม่อีกครั้ง',
      }
    }

    const response = await fetch(`${config.baseURL}/api/student-evaluation`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    })

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`)
    }

    return {
      success: true,
      message: 'ส่งแบบประเมินสำเร็จ',
    }
  } catch (error) {
    console.error('Error submitting evaluation:', error)
    return {
      success: false,
      message: 'เกิดข้อผิดพลาดในการส่งแบบประเมิน โปรดลองอีกครั้ง',
    }
  }
}
