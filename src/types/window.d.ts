interface TelegramWebApp {
  initData: string;
  initDataUnsafe: {
    user: {
      id: number;
      first_name: string;
      last_name?: string;
      username?: string;
    };
  };
  close(): void;
  showPopup(params: { title: string; message: string; buttons: { id: string; text: string; type: string }[] }): void;
}

interface Window {
  Telegram?: {
    WebApp?: TelegramWebApp;
  };
}
