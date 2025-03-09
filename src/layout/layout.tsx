import { ReactNode, useEffect } from 'react'
import Navbar from './navbar'
import Toaster from '../components/ui/toaster/Toaster'
import { useAuthStore } from '../stores/auth';
import { useScoreStore } from '../stores/score';
// import { Header } from './header'

function Layout({ children }: { children: ReactNode }) {
  const { user } = useAuthStore();
  const { updateBalance } = useScoreStore();

  useEffect(() => {
    if (user?.balance !== undefined) {
      updateBalance(user.balance);
    }
  }, [user?.balance, updateBalance]);

  return (
    <div className="min-h-screen">
      <div className="bg-image max-w-xl mx-auto h-screen flex flex-col relative">
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
        <Navbar />
      </div>

      <Toaster />
    </div>
  )
}

export default Layout