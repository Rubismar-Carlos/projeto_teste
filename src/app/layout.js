import Navbar from './components/navbar/Navbar'
import './globals.css'

export const metadata = {
  title: 'Projeto Estágio',
  description: 'Generated by create next app',
}

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
