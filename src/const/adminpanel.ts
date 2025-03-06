interface PanelItem {
  uid: number
  name: string
  role: string
  faculty: string
}

export const PanelItems: PanelItem[] = [
  { uid: 1, name: 'Admin1', role: 'admin', faculty: 'ส่วนกลาง' },
  { uid: 2, name: 'Staff1', role: 'staff', faculty: 'อักษร' },
  { uid: 3, name: 'Staff2', role: 'staff', faculty: 'บริหาร' },
  { uid: 4, name: 'Admin2', role: 'admin', faculty: 'ส่วนกลาง' },
  { uid: 5, name: 'Staff3', role: 'staff', faculty: 'แพทย์' },
  { uid: 6, name: 'Staff4', role: 'staff', faculty: 'นิติ' },
  { uid: 7, name: 'Admin3', role: 'admin', faculty: 'ส่วนกลาง' },
  { uid: 8, name: 'Staff5', role: 'staff', faculty: 'พยาบาล' },
  { uid: 9, name: 'Admin4', role: 'admin', faculty: 'ส่วนกลาง' },
  { uid: 10, name: 'Staff6', role: 'staff', faculty: 'สถาปัตย์' },
]
