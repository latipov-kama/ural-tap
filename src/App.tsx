import { Route, Routes } from 'react-router-dom'
import Layout from './layout/layout'
import Home from './screens/home/Home'
import Tasks from './screens/tasks/Tasks'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/shop" element={<></>} />
        <Route path="/friends" element={<></>} />
        <Route path="/profile" element={<></>} />
      </Routes>
    </Layout>
  )
}

export default App
