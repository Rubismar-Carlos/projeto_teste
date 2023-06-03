import Navbar from './components/navbar/Navbar'
import './globals.css'


export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body>
        < Navbar />
        {children}
      </body>
    </html>
  )
}
