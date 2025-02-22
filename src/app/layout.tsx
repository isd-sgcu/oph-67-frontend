import './globals.css'
import { cn } from '@/lib/cn'
import { anuphan, cloudSoft } from '@/lib/fonts'

const RootLayout: React.FC<Readonly<{ children: React.ReactNode }>> = ({
  children,
}) => {
  return (
    <html className={cn(cloudSoft.variable, anuphan.variable)} lang='en'>
      <body>{children}</body>
    </html>
  )
}

export default RootLayout
