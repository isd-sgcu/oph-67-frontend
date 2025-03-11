interface NavbarItem {
  en: string
  th: string
  link: string
}

export const NavbarItems: NavbarItem[] = [
  { en: 'Navigator', th: 'นำทาง', link: '/navigator' },
  { en: 'Event', th: 'กิจกรรมส่วนกลาง', link: '/event' },
  { en: 'Faculties', th: 'คณะ', link: '/faculties' },
  { en: 'Workshop', th: 'เวิร์คช็อปคณะ', link: '/workshop' },
  { en: 'Pick Your Flower', th: 'ดอกไม้ของฉัน', link: '/pick-your-flower' },
  { en: 'Account', th: 'บัญชีของฉัน', link: '/profile' },
]
