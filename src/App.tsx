import { Route, Routes } from 'react-router-dom'
import Layout from './layout/layout'
import Home from './screens/home/Home'
import Tasks from './screens/tasks/Tasks'
import Shop from './screens/shop/Shop'
import Friends from './screens/friends/Friends'
import Profile from './screens/profile/Profile'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/friends" element={<Friends />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Layout>
  )
}

export default App
