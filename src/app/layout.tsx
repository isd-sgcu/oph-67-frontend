import './globals.css'
import { cn } from '../lib/cn'
import { anuphan, cloudSoft, mitr, ubuntu } from '../lib/fonts'

const RootLayout: React.FC<Readonly<{ children: React.ReactNode }>> = ({
  children,
}) => {
  return (
    <html
      lang='en'
      className={cn(
        cloudSoft.variable,
        anuphan.variable,
        mitr.variable,
        ubuntu.variable
      )}
    >
      <body>{children}</body>
    </html>
  )
}

export default RootLayout
