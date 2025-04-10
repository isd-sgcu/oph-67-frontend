import {
  Document,
  Font,
  Image,
  Page,
  StyleSheet,
  Text,
  View,
} from '@react-pdf/renderer'

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
  },
})

const CertificatePDF: React.FC<{ userName: string; token: string }> = ({
  userName,
  token,
}) => (
  <Document>
    <Page
      orientation='landscape'
      size={{ width: 794, height: 1123 }}
      style={styles.page}
    >
      <View style={styles.container}>
        <Image src='/assets/certificate/template.png' style={styles.image} />
        <View style={styles.overlay}>
          <Text style={styles.nameText}>{userName}</Text>
        </View>
        <Text style={styles.tokenText}>ID: {token}</Text>
      </View>
    </Page>
  </Document>
)

export default CertificatePDF
