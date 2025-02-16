import { Route, Routes } from 'react-router-dom'
import Layout from './layout/layout'
import Home from './screens/home/Home'
import Tasks from './screens/tasks/Tasks'
import Shop from './screens/shop/Shop'
import Friends from './screens/friends/Friends'
import Profile from './screens/profile/Profile'
import TaskInfo from './screens/tasks/TaskInfo'
import Boost from './screens/boost/Boost'
import Questions from './screens/questions/Questions'
import { useAuthStore } from './stores/auth'
import { useEffect } from 'react'
import { init } from '@telegram-apps/sdk'

function App() {
  const { initAuth } = useAuthStore()

  useEffect(() => {
    const initData = new URLSearchParams(window.Telegram.WebApp.initData);
    const ref = initData.get("ref");
    if (ref) {
      alert(ref)
      alert(initData)
    }

    initAuth()
    init()
  }, []);

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/tasks/:id" element={<TaskInfo />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/shop/:id" element={<Boost />} />
        <Route path="/friends" element={<Friends />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/questions" element={<Questions />} />
      </Routes>
    </Layout>
  )
}

export default App
