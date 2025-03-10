// import c1 from '${config.cdnURL}/assets/pick-your-flower/card/c1.png';
// import c2 from '@assets/pick-your-flower/card/c2.png';
// import c3 from '@assets/pick-your-flower/card/c3.png';
// import d1 from '@assets/pick-your-flower/download-share/d1.png';
// import d2 from '@assets/pick-your-flower/download-share/d2.png';
// import d3 from '@assets/pick-your-flower/download-share/d3.png';
import { config } from '@/app/config'

interface FlowerData {
  img: string
  downloadShare: string
  title: string
  content: string
}

const FlowerDatas: FlowerData[] = [
  {
    img: `${config.cdnURL}/assets/pick-your-flower/card/c1.png`,
    downloadShare: `${config.cdnURL}/assets/pick-your-flower/download-share/d1.png`,
    title: 'The High Priestess',
    content:
      'คุณเป็นคนสวยมีสเน่ห์ น่าดึงดูด และน่่าค้นหาต่อเพศตรงข้าม แถมยังมีลางสังหรณ์ที่แม่นยำอีกด้วย แต่ช่วงนี้อารมณ์ของคุณจะแปรปรวนได้ง่าย เดี๋ยวดีเดี๋ยวร้าย ไพ่ขอแนะนำว่า คุณควรลองมองหาที่ยึดเหนี่ยวจิตใจดูบ้าง สิ่งนั้นจะช่วยทำให้จิตใจของคุณสงบมากขึ้น',
  },
  {
    img: `${config.cdnURL}/assets/pick-your-flower/card/c2.png`,
    downloadShare: `${config.cdnURL}/assets/pick-your-flower/download-share/d2.png`,
    title: 'The Empress',
    content:
      'ช่วงนี้คุณค่อนข้างสบาย ไม่ค่อยมีอุปสรรค ทำสิ่งใดมักสำเร็จได้ง่าย มีคนขอดูแลเอาใจใส่ ไม่ให้ลำบาก จนคุณแทบจะไม่ต้องทำอะไรเลย ไพ่ขอแนะนำว่า แม้ว่าคุณจะมีชีวิตที่เพียบพร้อมแล้ว แต่คุณก็ควรใช้และพอใจในสิ่งที่มีอยู่ นำประโยชน์และสิ่งที่มี มอบให้ผู้ที่ด้อยโอกาสกว่า จะทำให้ชีวิตของคุณมีค่าและสมบูรณ์ยิ่งขึ้นไปอีก',
  },
  {
    img: `${config.cdnURL}/assets/pick-your-flower/card/c3.png`,
    downloadShare: `${config.cdnURL}/assets/pick-your-flower/download-share/d3.png`,
    title: 'The Emperor',
    content:
      'ช่วงนี้การงาน การเรียนจะดีมาก มีโอกาสได้ไปต่างประเทศ เป็นช่วงที่ทำอะไรก็ดีไปหมด มีโอกาสก้าวหน้าในชีวิต ไม่ว่าจะเป็นด้านอาชีพการงาน หรือความรัก ไพ่ขอแนะนำว่า คุณควรระวังอุปสรรคซึ่งเกิดจากความใจร้อนและความประมาทของคุณเอง คุณควรใช้โอกาสที่ดีและรู้จักประยุกต์ใช้โอกาสที่มีให้เกิดประโยชน์สูงสุดแก่ตนเองและช่วยเหลือผู้ที่ด้อยโอกาสหรือมีปัญหา',
  },
  {
    img: `${config.cdnURL}/assets/pick-your-flower/card/c4.png`,
    downloadShare: `${config.cdnURL}/assets/pick-your-flower/download-share/d4.png`,
    title: 'The Emperor',
    content:
      'ช่วงนี้การงาน การเรียนจะดีมาก มีโอกาสได้ไปต่างประเทศ เป็นช่วงที่ทำอะไรก็ดีไปหมด มีโอกาสก้าวหน้าในชีวิต ไม่ว่าจะเป็นด้านอาชีพการงาน หรือความรัก ไพ่ขอแนะนำว่า คุณควรระวังอุปสรรคซึ่งเกิดจากความใจร้อนและความประมาทของคุณเอง คุณควรใช้โอกาสที่ดีและรู้จักประยุกต์ใช้โอกาสที่มีให้เกิดประโยชน์สูงสุดแก่ตนเองและช่วยเหลือผู้ที่ด้อยโอกาสหรือมีปัญหา',
  },
  {
    img: `${config.cdnURL}/assets/pick-your-flower/card/c5.png`,
    downloadShare: `${config.cdnURL}/assets/pick-your-flower/download-share/d5.png`,
    title: 'The Emperor',
    content:
      'ช่วงนี้การงาน การเรียนจะดีมาก มีโอกาสได้ไปต่างประเทศ เป็นช่วงที่ทำอะไรก็ดีไปหมด มีโอกาสก้าวหน้าในชีวิต ไม่ว่าจะเป็นด้านอาชีพการงาน หรือความรัก ไพ่ขอแนะนำว่า คุณควรระวังอุปสรรคซึ่งเกิดจากความใจร้อนและความประมาทของคุณเอง คุณควรใช้โอกาสที่ดีและรู้จักประยุกต์ใช้โอกาสที่มีให้เกิดประโยชน์สูงสุดแก่ตนเองและช่วยเหลือผู้ที่ด้อยโอกาสหรือมีปัญหา',
  },
  {
    img: `${config.cdnURL}/assets/pick-your-flower/card/c6.png`,
    downloadShare: `${config.cdnURL}/assets/pick-your-flower/download-share/d6.png`,
    title: 'The Emperor',
    content:
      'ช่วงนี้การงาน การเรียนจะดีมาก มีโอกาสได้ไปต่างประเทศ เป็นช่วงที่ทำอะไรก็ดีไปหมด มีโอกาสก้าวหน้าในชีวิต ไม่ว่าจะเป็นด้านอาชีพการงาน หรือความรัก ไพ่ขอแนะนำว่า คุณควรระวังอุปสรรคซึ่งเกิดจากความใจร้อนและความประมาทของคุณเอง คุณควรใช้โอกาสที่ดีและรู้จักประยุกต์ใช้โอกาสที่มีให้เกิดประโยชน์สูงสุดแก่ตนเองและช่วยเหลือผู้ที่ด้อยโอกาสหรือมีปัญหา',
  },
]

export default FlowerDatas
