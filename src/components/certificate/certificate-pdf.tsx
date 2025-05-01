import {
  Document,
  Font,
  Image as PDFImage,
  Page,
  StyleSheet,
  Text,
  View,
} from '@react-pdf/renderer'
import React from 'react'

// Register font with local path
Font.register({
  family: 'THSarabunNew',
  src: '/fonts/THSarabunNew.ttf',
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
    fontSize: 35,
    color: 'black',
    textAlign: 'center',
    fontFamily: 'THSarabunNew',
  },
  tokenText: {
    position: 'absolute',
    bottom: 7.8,
    right: 11.5,
    fontSize: 7,
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

const CertificatePDF: React.FC<{
  userName: string
  token: string
  qr?: string
}> = ({ userName, token, qr }) => {
  return (
    <Document>
      <Page
        orientation='landscape'
        size={{ width: 594.9179, height: 842.25 }}
        style={styles.page}
      >
        <View style={styles.container}>
          <PDFImage
            src='./public/assets/certificate/template.png'
            style={styles.image}
          />
          <View style={styles.overlay}>
            <Text style={styles.nameText}>{userName}</Text>
            <Text style={styles.tokenText}>ID: {token}</Text>
            {/* Render the QR code as an image */}
            {qr ? <PDFImage src={qr} style={styles.qrCode} /> : null}
          </View>
        </View>
      </Page>
    </Document>
  )
}

export default CertificatePDF
