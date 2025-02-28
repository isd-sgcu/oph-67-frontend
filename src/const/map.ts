interface FaciItem {
  title: string
  iconName: string
}

interface ButtonItem {
  id: number
  title: string
  imgPath: string
  facilities: FaciItem[]
}

export const LocationItems: ButtonItem[] = [
  {
    id: 0,
    title: 'ภาพรวม',
    imgPath: '/',
    facilities: [
      { title: 'ห้องน้ำ', iconName: 'toilet' },
      { title: 'โรงอาหาร', iconName: 'food' },
      { title: 'ที่จอดรถ', iconName: 'parking' },
    ],
  },
  { id: 1, title: 'สยาม MBK', imgPath: '/', facilities: [] },
  { id: 2, title: 'สามย่าน', imgPath: '/', facilities: [] },
  { id: 3, title: 'ฝั่งใหญ่', imgPath: '/', facilities: [] },
]

interface DestinationDirectionItem {
  title: string
  iconName: string
}
export const DestinationDirectionItems: DestinationDirectionItem[] = [
  { title: 'เส้นทางรถปอพ.', iconName: 'bus' },
  { title: 'Chula Walkthrough', iconName: 'walk' },
]
