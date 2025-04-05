import { news } from '@/const/evalution-news'

const optionsRating = [1, 2, 3, 4, 5]

export const evaluationQuestions = {
  part1: [
    {
      title: 'ส่วนที่ 1: ความพึงพอใจต่อกิจกรรม',
      questions: [
        {
          id: '1-1',
          label: '1. ท่านทราบข้อมูลเกี่ยวกับ CU Open House 2025 ผ่านช่องทางใด?',
          options: news,
        },
        {
          id: '1-2',
          label: '2. กิจกรรมในภาพรวม (Overall)',
          options: optionsRating,
        },
        {
          id: '1-3',
          label: '3. กิจกรรมในบูธต่าง ๆ น่าสนใจและให้ข้อมูลที่เป็นประโยชน์',
          options: optionsRating,
        },
        {
          id: '1-4',
          label:
            '4. ท่านได้รับข้อมูลเกี่ยวกับคณะต่าง ๆ ภายในมหาวิทยาลัยอย่างชัดเจน',
          options: optionsRating,
        },
        {
          id: '1-5',
          label: '5. หากมีโอกาสหน้าท่านจะแนะนำกิจกรรม CU Open House ให้ผู้อื่น',
          options: optionsRating,
        },
        {
          id: '1-6',
          label:
            'บูธที่ท่านพึงพอใจเป็นพิเศษ เช่น บูธคณะ บูธชมรมบูธกิจกรรม (Optional)',
        },
      ],
    },
  ],
  part2: [
    {
      title: 'ส่วนที่ 2: ความสามารถในการจัดการกิจกรรม',
      questions: [
        {
          id: '2-1',
          label: '1. ความหลากหลาย ภายในกิจกรรม',
          options: optionsRating,
        },
        {
          id: '2-2',
          label: '2. ความหนาแน่น ภายในกิจกรรม',
          options: optionsRating,
        },
        {
          id: '2-3',
          label: '3. ท่านสามารถเข้าถึงบูธได้ทุกบูธที่ต้องการ',
          options: optionsRating,
        },
        {
          id: '2-4',
          label: '4. ความสะดวกภายในมหาวิทยาลัย เช่น ห้องน้ำ จุดพักคอย',
          options: optionsRating,
        },
        {
          id: '2-5',
          label: '5. ความสะดวกในการเดินทางในมหาวิทยาลัย',
          options: optionsRating,
        },
        {
          id: '2-6',
          label:
            '6. ความลังเลของท่านในการเข้าร่วมกิจกรรมหลังจากเกิดเหตุภัยพิบัต',
          options: optionsRating,
        },
      ],
    },
  ],
  part3: [
    {
      title: 'ส่วนที่ 3: ความพึงพอใจต่อเว็บไซต์ ',
      questions: [
        {
          id: '3-1',
          label: '1. ความสะดวกในการใช้ LINE OA ในการลงทะเบียน',
          options: optionsRating,
        },
        {
          id: '3-2',
          label: '2. ความสวยงามของหน้าเว็บไซต์',
          options: optionsRating,
        },
        {
          id: '3-3',
          label: '3. สิ่งที่ต้องการให้ปรับปรุงในเว็บไซต์',
        },
      ],
    },
  ],
}
