export const faculties = [
  {
    th: 'คณะครุศาสตร์',
    en: 'Faculty of Education',
  },
  {
    th: 'คณะจิตวิทยา',
    en: 'Faculty of Psychology',
  },
  {
    th: 'คณะทันตแพทยศาสตร์',
    en: 'Faculty of Dentistry',
  },
  {
    th: 'คณะนิติศาสตร์',
    en: 'Faculty of Law',
  },
  {
    th: 'คณะนิเทศศาสตร์',
    en: 'Faculty of Communication Arts',
  },
  {
    th: 'คณะพยาบาลศาสตร์',
    en: 'Faculty of Nursing',
  },
  {
    th: 'คณะพาณิชยศาสตร์และการบัญชี',
    en: 'Faculty of Commerce and Accountancy',
  },
  {
    th: 'คณะแพทยศาสตร์',
    en: 'Faculty of Medicine',
  },
  {
    th: 'คณะเภสัชศาสตร์',
    en: 'Faculty of Pharmacy',
  },
  {
    th: 'คณะรัฐศาสตร์',
    en: 'Faculty of Political Science',
  },
  {
    th: 'คณะวิทยาศาสตร์',
    en: 'Faculty of Science',
  },
  {
    th: 'คณะวิทยาศาสตร์การกีฬา',
    en: 'Faculty of Sports Science',
  },
  {
    th: 'คณะวิศวกรรมศาสตร์',
    en: 'Faculty of Engineering',
  },
  {
    th: 'คณะศิลปกรรมศาสตร์',
    en: 'Faculty of Fine and Applied Arts',
  },
  {
    th: 'คณะเศรษฐศาสตร์',
    en: 'Faculty of Economics',
  },
  {
    th: 'คณะสถาปัตยกรรมศาสตร์',
    en: 'Faculty of Architecture',
  },
  {
    th: 'คณะสหเวชศาสตร์',
    en: 'Faculty of Allied Health Sciences',
  },
  {
    th: 'คณะสัตวแพทยศาสตร์',
    en: 'Faculty of Veterinary Science',
  },
  {
    th: 'คณะอักษรศาสตร์',
    en: 'Faculty of Arts',
  },
  {
    th: 'สถาบันนวัตกรรมบูรณาการแห่งจุฬาลงกรณ์มหาวิทยาลัย',
    en: 'Chulalongkorn University Integrated Innovation Institute',
  },
  {
    th: 'สำนักวิชาทรัพยากรการเกษตร',
    en: 'School of Agricultural Resources',
  },
  {
    th: 'บัณฑิตวิทยาลัย',
    en: 'Graduate School',
  },
  {
    th: 'วิทยาลัยประชากรศาสตร์',
    en: 'College of Population Studies',
  },
  {
    th: 'วิทยาลัยปิโตรเลียมและปิโตรเคมี',
    en: 'College of Petroleum and Petrochemical Engineering',
  },
  {
    th: 'วิทยาลัยวิทยาศาสตร์สาธารณสุข',
    en: 'College of Public Health Sciences',
  },
  {
    th: 'สถาบันการขนส่ง',
    en: 'Institute of Transport',
  },
  {
    th: 'สถาบันขงจื่อแห่งจุฬาลงกรณ์มหาวิทยาลัย',
    en: 'Confucius Institute at Chulalongkorn University',
  },
  {
    th: 'สถาบันทรัพย์สินทางปัญญาแห่งจุฬาลงกรณ์มหาวิทยาลัย',
    en: 'Chulalongkorn University Intellectual Property Institute',
  },
  {
    th: 'สถาบันไทยศึกษา',
    en: 'Thai Studies Institute',
  },
  {
    th: 'สถาบันบัณฑิตบริหารธุรกิจศศินทร์แห่งจุฬาลงกรณ์มหาวิทยาลัย',
    en: 'Sasin Graduate Institute of Business Administration',
  },
  {
    th: 'สถาบันภาษาจุฬาฯ',
    en: 'Language Institute',
  },
  {
    th: 'สถาบันภาษาไทยสิรินธรแห่งจุฬาลงกรณ์มหาวิทยาลัย',
    en: 'Sirindhorn Thai Language Institute',
  },
  {
    th: 'สถาบันวิจัยทรัพยากรทางน้ำ',
    en: 'Research Institute for Water Resources',
  },
  {
    th: 'สถาบันวิจัยเทคโนโลยีชีวภาพและวิศวกรรมพันธุศาสตร์',
    en: 'Biotechnology and Genetic Engineering Research Unit',
  },
  {
    th: 'สถาบันวิจัยพลังงาน',
    en: 'Energy Research Institute',
  },
  {
    th: 'สถาบันวิจัยโลหะและวัสดุ',
    en: 'Metals and Materials Research Institute',
  },
  {
    th: 'สถาบันวิจัยสิ่งแวดล้อมเพื่อความยั่งยืน',
    en: 'Research Institute for Sustainable Environment',
  },
  {
    th: 'สถาบันวิจัยสังคม',
    en: 'Social Research Institute',
  },
  {
    th: 'สถาบันเอเชียศึกษา',
    en: 'Institute of Asian Studies',
  },
] as const

export const FacultyTH = faculties.map((faculty) => faculty.th) as [
  string,
  ...string[],
]
export type Faculty = (typeof faculties)[number]
