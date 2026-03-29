import './globals.css'

export const metadata = {
  title: 'Oron Dov — Portfolio',
  description: 'Creative tools and projects by Oron Dov',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
