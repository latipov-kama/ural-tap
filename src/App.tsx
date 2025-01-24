import { Route, Routes } from 'react-router-dom'
import Layout from './layout/layout'
import Home from './screens/home/Home'
import Tasks from './screens/tasks/Tasks'
import Shop from './screens/shop/Shop'
import Friends from './screens/friends/Friends'
import Profile from './screens/profile/Profile'
import TaskInfo from './screens/tasks/TaskInfo'
import Boost from './screens/boost/Boost'

function App() {
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
      </Routes>
    </Layout>
  )
}

export default App
