interface AdminbuttonItem {
  title: string
  iconName: string
  path: string
}

export const Adminbuttons: AdminbuttonItem[] = [
  { title: 'Add Role', iconName: 'add_role', path: '/role' },
  { title: 'Scan QR-Code', iconName: 'scan_qr', path: '/' },
  { title: 'แก้ไขข้อมูลส่วนตัว', iconName: 'change_info', path: '/' },
  { title: 'Dashboard', iconName: 'dashboard', path: '/' },
]
