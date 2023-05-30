import './globals.css'
import localFont from 'next/font/local'
import Footer from './components/Footer'
import About from './components/About'
import Blocks from './components/Blocks'
import Status from './components/Status'

const sFFont = localFont({
  src: './SFPRODISPLAYMEDIUM.otf',
  weight: '500'
})

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className='min-h-screen overflow-x-hidden antialiased scroll-smooth'>
      <body className={sFFont.className}>
        <main className='flex flex-col max-w-5xl mx-3'>
          <header className="h-36"></header>
          <About />
          <Status />
          <hr className='my-5 w-full border-0 h-[1px] bg-slate-800' />
          <Blocks />
          <div className="flex-1 my-8 text-base overflow-hidden">
            {children}
          </div>
          <hr className='w-full border-0 h-[1px] bg-slate-800' />
          <Footer />
        </main>
      </body>
    </html>
  )
}
