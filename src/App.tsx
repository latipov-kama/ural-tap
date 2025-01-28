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
import { useEffect } from 'react'

function App() {
  useEffect(() => {
    // Проверяем наличие Telegram WebApp
    if (window.Telegram?.WebApp) {
      const telegramWebApp = window.Telegram.WebApp;

      // Получаем initData
      const initData = telegramWebApp.initData;
      const initDataUnsafe = telegramWebApp.initDataUnsafe; // Разбирает данные автоматически

      console.log('InitData:', initData);
      console.log('InitDataUnsafe:', initDataUnsafe);

      // Используем данные пользователя
      if (initDataUnsafe.user) {
        console.log('User Data:', initDataUnsafe.user);
      }
    } else {
      console.error('Telegram WebApp не обнаружен');
    }
    alert('test')
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
