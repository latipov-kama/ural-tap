import { ReactNode } from 'react'
import Navbar from './navbar'
import { Header } from './header'

function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen">
      <div className="bg-image max-w-xl mx-auto h-screen flex flex-col relative">
        <Header />
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
        <Navbar />
      </div>
    </div>
  )
}

export default Layout