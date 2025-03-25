import { Route, Routes } from 'react-router-dom'
import Layout from './layout/layout'
import Home from './screens/home/Home'
import Tasks from './screens/tasks/Tasks'
import Boosts from './screens/boosts/Boosts'
import Friends from './screens/friends/Friends'
import Profile from './screens/profile/Profile'
import TaskInfo from './screens/tasks/TaskInfo'
import Boost from './screens/boost/Boost'
import Questions from './screens/questions/Questions'
import { useAuthStore } from './stores/auth'
import { useEffect } from 'react'
import Policy from './screens/policy/Policy'
import About from './screens/about/About'
import Shop from './screens/shop/Shop'

function App() {
  const { initAuth } = useAuthStore()

  useEffect(() => {
    initAuth()
  }, []);

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/tasks/:id" element={<TaskInfo />} />
        <Route path="/boosts" element={<Boosts />} />
        <Route path="/boosts/:id" element={<Boost />} />
        <Route path="/friends" element={<Friends />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/questions" element={<Questions />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="/about" element={<About />} />
        <Route path="/shop" element={<Shop />} />
      </Routes>
    </Layout>
  )
}

export default App
