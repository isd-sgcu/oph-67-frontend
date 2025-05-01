import { renderToStream } from '@react-pdf/renderer'
import { type NextApiRequest, type NextApiResponse } from 'next'

import CertificatePDF from '@/components/certificate/certificate-pdf'
// import QRCode from 'qrcode'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const { userName, token } = req.query

  if (!userName || !token) {
    res.status(400).json({ error: 'Missing userName or token' })
    return
  }

  const userNameString = Array.isArray(userName) ? userName[0] : userName
  const tokenString = Array.isArray(token) ? token[0] : token

  res.setHeader('Content-Type', 'application/pdf')
  res.setHeader('Content-Disposition', `attachment; filename=certificate.pdf`)

  console.log('Generating PDF for:', userNameString, tokenString)

  try {
    // const qrDataUrl = await QRCode.toDataURL('asdf')
    const pdfStream = await renderToStream(
      <CertificatePDF token={tokenString} userName={userNameString} />
    )
    pdfStream.pipe(res)
  } catch (error) {
    console.error('Error generating PDF:', error)
    res.status(500).json({ error: 'Failed to generate PDF' })
  }
}
