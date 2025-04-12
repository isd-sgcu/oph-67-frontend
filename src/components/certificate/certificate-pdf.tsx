import {
  Document,
  Font,
  Image as PDFImage,
  Page,
  StyleSheet,
  Text,
  View,
} from '@react-pdf/renderer'
import React, { useEffect, useState } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import QRCode from 'react-qr-code'

import { config } from '@/app/config'

Font.register({
  family: 'THSarabunNew',
  src: `${config.cdnURL}/fonts/THSarabunNew.ttf`,
})

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: 'white',
    fontFamily: 'THSarabunNew',
  },
  container: {
    position: 'relative',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 0,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nameText: {
    fontSize: 48,
    color: 'black',
    textAlign: 'center',
    fontFamily: 'THSarabunNew',
  },
  tokenText: {
    position: 'absolute',
    bottom: 10,
    right: 15,
    fontSize: 12,
    color: 'black',
    textAlign: 'center',
    fontFamily: 'THSarabunNew',
  },
  image: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: -1,
  },
  qrCode: {
    position: 'absolute',
    bottom: 50,
    right: 205,
    width: 75,
    height: 75,
    zIndex: 10,
  },
})

// Custom hook to generate base64 from QR Code component
const useQRCodeBase64 = (value: string, size: number): string | null => {
  const [qrCodeBase64, setQrCodeBase64] = useState<string | null>(null)

  useEffect(() => {
    const canvas = document.createElement('canvas')
    const qrCode = <QRCode size={size} value={value} />
    const svg = renderToStaticMarkup(qrCode)
    const img = new Image()

    img.onload = () => {
      canvas.width = img.width
      canvas.height = img.height
      const context = canvas.getContext('2d')
      if (context) {
        context.drawImage(img, 0, 0)
        setQrCodeBase64(canvas.toDataURL())
      }
    }

    img.src = `data:image/svg+xml;base64,${btoa(svg)}`
  }, [value, size])

  return qrCodeBase64
}

const CertificatePDF: React.FC<{
  userName: string
  token: string
  qr?: boolean
}> = ({ userName, token, qr = false }) => {
  // render qr to image
  const qrCodeBase64 = useQRCodeBase64('https://www.example.com', 100) // Size 100 for the QR Code

  return (
    <Document>
      <Page
        orientation='landscape'
        size={{ width: 794, height: 1123 }}
        style={styles.page}
      >
        <View style={styles.container}>
          <PDFImage
            src={`${config.cdnURL}/assets/certificate/template.png`}
            style={styles.image}
          />
          <View style={styles.overlay}>
            <Text style={styles.nameText}>{userName}</Text>
            <Text style={styles.tokenText}>ID: {token}</Text>
            {/* Render the QR code as an image */}
            {qr && qrCodeBase64 ? (
              <PDFImage src={qrCodeBase64} style={styles.qrCode} />
            ) : null}
          </View>
        </View>
      </Page>
    </Document>
  )
}

export default CertificatePDF
