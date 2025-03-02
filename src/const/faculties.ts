export interface FacultyInterface {
  id: string
  th: string
  en: string
  thumbnail?: string
  images?: string[]
  about?: string
  location?: string
  locationUrl?: string
  webUrl?: string
  fbUrl?: string
}

export const faculties: FacultyInterface[] = [
  {
    id: 'faculty-of-education',
    th: 'คณะครุศาสตร์',
    en: 'Faculty of Education',
  },
  {
    id: 'faculty-of-psychology',
    th: 'คณะจิตวิทยา',
    en: 'Faculty of Psychology',
  },
  {
    id: 'faculty-of-dentistry',
    th: 'คณะทันตแพทยศาสตร์',
    en: 'Faculty of Dentistry',
  },
  {
    id: 'faculty-of-law',
    th: 'คณะนิติศาสตร์',
    en: 'Faculty of Law',
  },
  {
    id: 'faculty-of-communication-arts',
    th: 'คณะนิเทศศาสตร์',
    en: 'Faculty of Communication Arts',
  },
  {
    id: 'faculty-of-nursing',
    th: 'คณะพยาบาลศาสตร์',
    en: 'Faculty of Nursing',
  },
  {
    id: 'faculty-of-commerce-and-accountancy',
    th: 'คณะพาณิชยศาสตร์และการบัญชี',
    en: 'Faculty of Commerce and Accountancy',
  },
  {
    id: 'faculty-of-medicine',
    th: 'คณะแพทยศาสตร์',
    en: 'Faculty of Medicine',
  },
  {
    id: 'faculty-of-pharmacy',
    th: 'คณะเภสัชศาสตร์',
    en: 'Faculty of Pharmacy',
  },
  {
    id: 'faculty-of-political-science',
    th: 'คณะรัฐศาสตร์',
    en: 'Faculty of Political Science',
  },
  {
    id: 'faculty-of-science',
    th: 'คณะวิทยาศาสตร์',
    en: 'Faculty of Science',
  },
  {
    id: 'faculty-of-sports-science',
    th: 'คณะวิทยาศาสตร์การกีฬา',
    en: 'Faculty of Sports Science',
  },
  {
    id: 'faculty-of-engineering',
    th: 'คณะวิศวกรรมศาสตร์',
    en: 'Faculty of Engineering',
  },
  {
    id: 'faculty-of-fine-and-applied-arts',
    th: 'คณะศิลปกรรมศาสตร์',
    en: 'Faculty of Fine and Applied Arts',
  },
  {
    id: 'faculty-of-economics',
    th: 'คณะเศรษฐศาสตร์',
    en: 'Faculty of Economics',
  },
  {
    id: 'faculty-of-architecture',
    th: 'คณะสถาปัตยกรรมศาสตร์',
    en: 'Faculty of Architecture',
  },
  {
    id: 'faculty-of-allied-health-sciences',
    th: 'คณะสหเวชศาสตร์',
    en: 'Faculty of Allied Health Sciences',
  },
  {
    id: 'faculty-of-veterinary-science',
    th: 'คณะสัตวแพทยศาสตร์',
    en: 'Faculty of Veterinary Science',
  },
  {
    id: 'faculty-of-arts',
    th: 'คณะอักษรศาสตร์',
    en: 'Faculty of Arts',
    about:
      'ipsum dolor sit amet consectetur. Ultrices tortor egestas viverra placerat volutpat vulputate tempor pellentesque. Etiam sit egestas urna amet. Mauris natoque tristique non imperdiet. Magnis diam non id nec purus.',
    location: '254 ถนนพญาไท แขวงวังใหม่ เขตปทุมวัน กรุงเทพฯ 10330.',
    locationUrl: '',
    webUrl: 'Arts.Chulalongkorn.co.th',
    fbUrl: 'Art.Chulalongkorn',
  },
  {
    id: 'chulalongkorn-university-integrated-innovation-institute',
    th: 'สถาบันนวัตกรรมบูรณาการแห่งจุฬาลงกรณ์มหาวิทยาลัย',
    en: 'Chulalongkorn University Integrated Innovation Institute',
  },
  {
    id: 'school-of-agricultural-resources',
    th: 'สำนักวิชาทรัพยากรการเกษตร',
    en: 'School of Agricultural Resources',
  },
  {
    id: 'graduate-school',
    th: 'บัณฑิตวิทยาลัย',
    en: 'Graduate School',
  },
  {
    id: 'college-of-population-studies',
    th: 'วิทยาลัยประชากรศาสตร์',
    en: 'College of Population Studies',
  },
  {
    id: 'college-of-petroleum-and-petrochemical-engineering',
    th: 'วิทยาลัยปิโตรเลียมและปิโตรเคมี',
    en: 'College of Petroleum and Petrochemical Engineering',
  },
  {
    id: 'college-of-public-health-sciences',
    th: 'วิทยาลัยวิทยาศาสตร์สาธารณสุข',
    en: 'College of Public Health Sciences',
  },
  {
    id: 'institute-of-transport',
    th: 'สถาบันการขนส่ง',
    en: 'Institute of Transport',
  },
  {
    id: 'confucius-institute-at-chulalongkorn-university',
    th: 'สถาบันขงจื่อแห่งจุฬาลงกรณ์มหาวิทยาลัย',
    en: 'Confucius Institute at Chulalongkorn University',
  },
  {
    id: 'chulalongkorn-university-intellectual-property-institute',
    th: 'สถาบันทรัพย์สินทางปัญญาแห่งจุฬาลงกรณ์มหาวิทยาลัย',
    en: 'Chulalongkorn University Intellectual Property Institute',
  },
  {
    id: 'thai-studies-institute',
    th: 'สถาบันไทยศึกษา',
    en: 'Thai Studies Institute',
  },
  {
    id: 'sasin-graduate-institute-of-business-administration',
    th: 'สถาบันบัณฑิตบริหารธุรกิจศศินทร์แห่งจุฬาลงกรณ์มหาวิทยาลัย',
    en: 'Sasin Graduate Institute of Business Administration',
  },
  {
    id: 'language-institute',
    th: 'สถาบันภาษาจุฬาฯ',
    en: 'Language Institute',
  },
  {
    id: 'sirindhorn-thai-language-institute',
    th: 'สถาบันภาษาไทยสิรินธรแห่งจุฬาลงกรณ์มหาวิทยาลัย',
    en: 'Sirindhorn Thai Language Institute',
  },
  {
    id: 'research-institute-for-water-resources',
    th: 'สถาบันวิจัยทรัพยากรทางน้ำ',
    en: 'Research Institute for Water Resources',
  },
  {
    id: 'biotechnology-and-genetic-engineering-research-unit',
    th: 'สถาบันวิจัยเทคโนโลยีชีวภาพและวิศวกรรมพันธุศาสตร์',
    en: 'Biotechnology and Genetic Engineering Research Unit',
  },
  {
    id: 'energy-research-institute',
    th: 'สถาบันวิจัยพลังงาน',
    en: 'Energy Research Institute',
  },
  {
    id: 'metals-and-materials-research-institute',
    th: 'สถาบันวิจัยโลหะและวัสดุ',
    en: 'Metals and Materials Research Institute',
  },
  {
    id: 'research-institute-for-sustainable-environment',
    th: 'สถาบันวิจัยสิ่งแวดล้อมเพื่อความยั่งยืน',
    en: 'Research Institute for Sustainable Environment',
  },
  {
    id: 'social-research-institute',
    th: 'สถาบันวิจัยสังคม',
    en: 'Social Research Institute',
  },
  {
    id: 'institute-of-asian-studies',
    th: 'สถาบันเอเชียศึกษา',
    en: 'Institute of Asian Studies',
  },
] as const

export const FacultyTH = faculties.map((faculty) => faculty.th) as [
  string,
  ...string[],
]
export type Faculty = (typeof faculties)[number]
