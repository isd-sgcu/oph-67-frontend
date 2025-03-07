interface AdminbuttonItem {
  title: string
  iconName: string
  path: string
}

export const Adminbuttons: AdminbuttonItem[] = [
  { title: 'Add Role', iconName: 'add_role', path: '/role' },
  { title: 'Scan QR-Code', iconName: 'scan_qr', path: '/admin/scan-qr-code' },
  {
    title: 'แก้ไขข้อมูลส่วนตัว',
    iconName: 'change_info',
    path: '/admin/profile/edit',
  },
  { title: 'Dashboard', iconName: 'dashboard', path: '/' },
]
