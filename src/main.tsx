import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
// import { init, miniApp } from '@telegram-apps/sdk'

// const initializeTelegramSDK = async () => {
//   try {
//     await init();

//     if (miniApp.ready.isAvailable()) {
//       await miniApp.ready();
//       console.log('Mini App готово');
//     }
//   } catch (error) {
//     console.error('Ошибка инициализации:', error);
//   }
// }


// initializeTelegramSDK()
// const launchParams = retrieveLaunchParams();

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
)
