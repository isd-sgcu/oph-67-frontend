import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { type EvaluationForm } from '@/types/evaluation-schema'

interface EvaluationState {
  formData: Partial<EvaluationForm>
  setFormValue: <K extends keyof EvaluationForm>(
    key: K,
    value: EvaluationForm[K]
  ) => void
  clearForm: () => void
}

export const useEvaluationStore = create<EvaluationState>()(
  persist(
    (set) => ({
      formData: {},
      setFormValue: (key, value) =>
        set((state) => ({
          formData: {
            ...state.formData,
            [key]: value,
          },
        })),
      clearForm: () => set({ formData: {} }),
    }),
    {
      name: 'evaluation-storage',
    }
  )
)
