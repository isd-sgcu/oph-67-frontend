interface AdminbuttonItem {
  title: string
  iconName: string
  path: string
}

export const Adminbuttons: AdminbuttonItem[] = [
  { title: 'Add Role', iconName: 'add_role', path: '/3a9805a5/role' },
  {
    title: 'Scan QR-Code',
    iconName: 'scan_qr',
    path: '/3a9805a5/scan-qr-code',
  },
  {
    title: 'แก้ไขข้อมูลส่วนตัว',
    iconName: 'change_info',
    path: '/3a9805a5/profile/edit',
  },
  {
    title: 'Dashboard',
    iconName: 'dashboard',
    path: 'https://isd-sgcu.github.io/oph-68-refined/',
  },
]
