import { config } from '@/app/config'

export enum FacultyId {
  Education = 'faculty-of-education',
  Psychology = 'faculty-of-psychology',
  Dentistry = 'faculty-of-dentistry',
  Law = 'faculty-of-law',
  CommunicationArts = 'faculty-of-communication-arts',
  Nursing = 'faculty-of-nursing',
  CommerceAndAccountancy = 'faculty-of-commerce-and-accountancy',
  Medicine = 'faculty-of-medicine',
  Pharmacy = 'faculty-of-pharmacy',
  PoliticalScience = 'faculty-of-political-science',
  Science = 'faculty-of-science',
  SportScience = 'faculty-of-sports-science',
  Engineering = 'faculty-of-engineering',
  FineAndAppliedArts = 'faculty-of-fine-and-applied-arts',
  Economics = 'faculty-of-economics',
  Architecture = 'faculty-of-architecture',
  AlliedHealthSciences = 'faculty-of-allied-health-sciences',
  VeterinaryScience = 'faculty-of-veterinary-science',
  Arts = 'faculty-of-arts',
  IntegratedInnovation = 'chulalongkorn-university-integrated-innovation-institute',
  AgriculturalResources = 'school-of-agricultural-resources',
  GraduateSchool = 'graduate-school',
  PopulationStudies = 'college-of-population-studies',
  PetroleumEngineering = 'college-of-petroleum-and-petrochemical-engineering',
  PublicHealth = 'college-of-public-health-sciences',
  Transport = 'institute-of-transport',
  ConfuciusInstitute = 'confucius-institute-at-chulalongkorn-university',
  IntellectualProperty = 'chulalongkorn-university-intellectual-property-institute',
  ThaiStudies = 'thai-studies-institute',
  Sasin = 'sasin-graduate-institute-of-business-administration',
  LanguageInstitute = 'language-institute',
  SirindhornThaiLanguage = 'sirindhorn-thai-language-institute',
  WaterResources = 'research-institute-for-water-resources',
  Biotechnology = 'biotechnology-and-genetic-engineering-research-unit',
  Energy = 'energy-research-institute',
  Materials = 'metals-and-materials-research-institute',
  SustainableEnvironment = 'research-institute-for-sustainable-environment',
  SocialResearch = 'social-research-institute',
  AsianStudies = 'institute-of-asian-studies',
}

export interface FacultyInterface {
  id: FacultyId
  th: string
  en: string
  thumbnail?: string
  images?: string[]
  about?: string
  location?: string
  locationUrl?: string
  webUrl?: string
  fbUrl?: string
  contact?: string
}

export const faculties: FacultyInterface[] = [
  {
    id: FacultyId.Education,
    th: 'คณะครุศาสตร์',
    en: 'Faculty of Education',
    contact: 'https://www.instagram.com/educu.openhouse/',
  },
  {
    id: FacultyId.Psychology,
    th: 'คณะจิตวิทยา',
    en: 'Faculty of Psychology',
    contact: 'https://www.instagram.com/psychecu.openhouse/',
  },
  {
    id: FacultyId.Dentistry,
    th: 'คณะทันตแพทยศาสตร์',
    en: 'Faculty of Dentistry',
    contact: 'https://www.instagram.com/dentcuopenhouse/',
  },
  {
    id: FacultyId.Law,
    th: 'คณะนิติศาสตร์',
    en: 'Faculty of Law',
    contact: 'https://www.instagram.com/lawchulaopenhouse/',
  },
  {
    id: FacultyId.CommunicationArts,
    th: 'คณะนิเทศศาสตร์',
    en: 'Faculty of Communication Arts',
    contact: 'https://www.instagram.com/nitadecuopenhouse/',
  },
  {
    id: FacultyId.Nursing,
    th: 'คณะพยาบาลศาสตร์',
    en: 'Faculty of Nursing',
  },
  {
    id: FacultyId.CommerceAndAccountancy,
    th: 'คณะพาณิชยศาสตร์และการบัญชี',
    en: 'Faculty of Commerce and Accountancy',
    contact: 'https://www.instagram.com/cbs.openhouse/',
  },
  {
    id: FacultyId.Medicine,
    th: 'คณะแพทยศาสตร์',
    en: 'Faculty of Medicine',
  },
  {
    id: FacultyId.Pharmacy,
    th: 'คณะเภสัชศาสตร์',
    en: 'Faculty of Pharmacy',
    contact: 'https://www.instagram.com/rxcu_openhouse/',
  },
  {
    id: FacultyId.PoliticalScience,
    th: 'คณะรัฐศาสตร์',
    en: 'Faculty of Political Science',
    contact: 'https://www.instagram.com/polscicu.oph/',
  },
  {
    id: FacultyId.Science,
    th: 'คณะวิทยาศาสตร์',
    en: 'Faculty of Science',
    contact: 'https://www.instagram.com/scichulaopenhouse/',
  },
  {
    id: FacultyId.SportScience,
    th: 'คณะวิทยาศาสตร์การกีฬา',
    en: 'Faculty of Sports Science',
  },
  {
    id: FacultyId.Engineering,
    th: 'คณะวิศวกรรมศาสตร์',
    en: 'Faculty of Engineering',
    contact: 'https://www.instagram.com/cuintaniaopenhouse/',
  },
  {
    id: FacultyId.FineAndAppliedArts,
    th: 'คณะศิลปกรรมศาสตร์',
    en: 'Faculty of Fine and Applied Arts',
    contact: 'https://www.instagram.com/smo.singum/',
  },
  {
    id: FacultyId.Economics,
    th: 'คณะเศรษฐศาสตร์',
    en: 'Faculty of Economics',
    contact: 'https://www.instagram.com/econlab_cu/',
  },
  {
    id: FacultyId.Architecture,
    th: 'คณะสถาปัตยกรรมศาสตร์',
    en: 'Faculty of Architecture',
    contact: 'https://www.instagram.com/arsc.chula/',
  },
  {
    id: FacultyId.AlliedHealthSciences,
    th: 'คณะสหเวชศาสตร์',
    en: 'Faculty of Allied Health Sciences',
    contact: 'https://www.instagram.com/ahscuopenhouse/',
  },
  {
    id: FacultyId.VeterinaryScience,
    th: 'คณะสัตวแพทยศาสตร์',
    en: 'Faculty of Veterinary Science',
    contact: 'https://www.instagram.com/cuvetopenhouse/',
  },
  {
    id: FacultyId.Arts,
    th: 'คณะอักษรศาสตร์',
    en: 'Faculty of Arts',
    thumbnail: `${config.cdnURL}/assets/faculties/art/1.png`,
    images: [
      `${config.cdnURL}/assets/faculties/art/1.png`,
      `${config.cdnURL}/assets/faculties/art/2.png`,
      `${config.cdnURL}/assets/faculties/art/3.png`,
    ],
    about:
      'ipsum dolor sit amet consectetur. Ultrices tortor egestas viverra placerat volutpat vulputate tempor pellentesque. Etiam sit egestas urna amet. Mauris natoque tristique non imperdiet. Magnis diam non id nec purus.',
    location: '254 ถนนพญาไท แขวงวังใหม่ เขตปทุมวัน กรุงเทพฯ 10330.',
    locationUrl: '',
    webUrl: 'Arts.Chulalongkorn.co.th',
    fbUrl: 'Art.Chulalongkorn',
    contact: 'https://www.instagram.com/artsopenhouse/',
  },
  {
    id: FacultyId.IntegratedInnovation,
    th: 'สถาบันนวัตกรรมบูรณาการแห่งจุฬาลงกรณ์มหาวิทยาลัย',
    en: 'Chulalongkorn University Integrated Innovation Institute',
    contact: 'https://www.instagram.com/basciiscofficial/',
  },
  {
    id: FacultyId.AgriculturalResources,
    th: 'สำนักวิชาทรัพยากรการเกษตร',
    en: 'School of Agricultural Resources',
    contact: 'https://www.instagram.com/smosar.official/ ',
  },
  // {
  //   id: FacultyId.GraduateSchool,
  //   th: 'บัณฑิตวิทยาลัย',
  //   en: 'Graduate School',
  // },
  // {
  //   id: FacultyId.PopulationStudies,
  //   th: 'วิทยาลัยประชากรศาสตร์',
  //   en: 'College of Population Studies',
  // },
  // {
  //   id: FacultyId.PetroleumEngineering,
  //   th: 'วิทยาลัยปิโตรเลียมและปิโตรเคมี',
  //   en: 'College of Petroleum and Petrochemical Engineering',
  // },
  // {
  //   id: FacultyId.PublicHealth,
  //   th: 'วิทยาลัยวิทยาศาสตร์สาธารณสุข',
  //   en: 'College of Public Health Sciences',
  // },
  // {
  //   id: FacultyId.Transport,
  //   th: 'สถาบันการขนส่ง',
  //   en: 'Institute of Transport',
  // },
  // {
  //   id: FacultyId.ConfuciusInstitute,
  //   th: 'สถาบันขงจื่อแห่งจุฬาลงกรณ์มหาวิทยาลัย',
  //   en: 'Confucius Institute at Chulalongkorn University',
  // },
  // {
  //   id: FacultyId.IntellectualProperty,
  //   th: 'สถาบันทรัพย์สินทางปัญญาแห่งจุฬาลงกรณ์มหาวิทยาลัย',
  //   en: 'Chulalongkorn University Intellectual Property Institute',
  // },
  // {
  //   id: FacultyId.ThaiStudies,
  //   th: 'สถาบันไทยศึกษา',
  //   en: 'Thai Studies Institute',
  // },
  // {
  //   id: FacultyId.Sasin,
  //   th: 'สถาบันบัณฑิตบริหารธุรกิจศศินทร์แห่งจุฬาลงกรณ์มหาวิทยาลัย',
  //   en: 'Sasin Graduate Institute of Business Administration',
  // },
  // {
  //   id: FacultyId.LanguageInstitute,
  //   th: 'สถาบันภาษาจุฬาฯ',
  //   en: 'Language Institute',
  // },
  // {
  //   id: FacultyId.SirindhornThaiLanguage,
  //   th: 'สถาบันภาษาไทยสิรินธรแห่งจุฬาลงกรณ์มหาวิทยาลัย',
  //   en: 'Sirindhorn Thai Language Institute',
  // },
  // {
  //   id: FacultyId.WaterResources,
  //   th: 'สถาบันวิจัยทรัพยากรทางน้ำ',
  //   en: 'Research Institute for Water Resources',
  // },
  // {
  //   id: FacultyId.Biotechnology,
  //   th: 'สถาบันวิจัยเทคโนโลยีชีวภาพและวิศวกรรมพันธุศาสตร์',
  //   en: 'Biotechnology and Genetic Engineering Research Unit',
  // },
  // {
  //   id: FacultyId.Energy,
  //   th: 'สถาบันวิจัยพลังงาน',
  //   en: 'Energy Research Institute',
  // },
  // {
  //   id: FacultyId.Materials,
  //   th: 'สถาบันวิจัยโลหะและวัสดุ',
  //   en: 'Metals and Materials Research Institute',
  // },
  // {
  //   id: FacultyId.SustainableEnvironment,
  //   th: 'สถาบันวิจัยสิ่งแวดล้อมเพื่อความยั่งยืน',
  //   en: 'Research Institute for Sustainable Environment',
  // },
  // {
  //   id: FacultyId.SocialResearch,
  //   th: 'สถาบันวิจัยสังคม',
  //   en: 'Social Research Institute',
  // },
  // {
  //   id: FacultyId.AsianStudies,
  //   th: 'สถาบันเอเชียศึกษา',
  //   en: 'Institute of Asian Studies',
  // },
] as const

export const FacultyTH = faculties.map((faculty) => faculty.th) as [
  string,
  ...string[],
]
export type Faculty = (typeof faculties)[number]
export type FacultyMap = Record<string, Faculty>
export const facultyMap: FacultyMap = Object.fromEntries(
  faculties.map((faculty) => [faculty.id, faculty])
)
