export interface StudentData {
  id: string
  name: string
  phone: string // format: 0812345678
  email: string
  status?: string
  otherStatus?: string
  birthDate?: string // format: YYYY-MM-DD
  province?: string
  school?: string
  selectedSources?: string[] // comma-separated list
  otherSource?: string
  firstInterest?: string
  secondInterest?: string
  thirdInterest?: string
  objective?: string
}
