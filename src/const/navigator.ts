interface ButtonItem {
  title: string
  iconName: string
}

export const FaciItems: ButtonItem[] = [
  { title: 'ห้องน้ำ', iconName: 'toilet' },
  { title: 'โรงอาหาร', iconName: 'food' },
  { title: 'ที่จอดรถ', iconName: 'parking' },
]

export const LocationItems: ButtonItem[] = [
  { title: 'ภาพรวม', iconName: '' },
  { title: 'สยาม MBK', iconName: '' },
  { title: 'สามย่าน', iconName: '' },
  { title: 'ฝั่งใหญ่', iconName: '' },
]

interface NavigationItem {
  title: string
  iconName: string
}

export const NavigationItems: NavigationItem[] = [
  { title: 'เส้นทางรถปอพ.', iconName: 'bus' },
  { title: 'Chula Walkthrough', iconName: 'walk' },
]
