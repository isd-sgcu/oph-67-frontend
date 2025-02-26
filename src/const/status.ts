export const status = [
  'primary',
  'juniorHigh',
  'seniorHigh',
  'vocational',
  'bachelor',
  'masterDoctorate',
  'guardian',
  'other',
] as const

export const statusMap = {
  primary: 'ประถมศึกษา',
  juniorHigh: 'มัธยมศึกษาตอนต้น',
  seniorHigh: 'มัธยมศึกษาตอนปลาย',
  vocational:
    'ประกาศนียบัตรวิชาชีพ (ปวช.) / ประกาศนียบัตรวิชาชีพชั้นสูง (ปวส.)',
  bachelor: 'ปริญญาตรี',
  masterDoctorate: 'ปริญญาโท / ปริญญาเอก',
  guardian: 'ผู้ปกครอง',
  other: 'อื่น ๆ',
}

export type Status = (typeof status)[number]
