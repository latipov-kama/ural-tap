import { useEffect, useState } from "react";
import { retrieveLaunchParams, User } from "@telegram-apps/sdk";

export const TG_USER_DATA = {
  user: {
    allowsWriteToPm: true,
    firstName: "Kama",
    id: 909990269,
    languageCode: "ru",
    lastName: "",
    photoUrl: "https://t.me/i/userpic/320/Jgo_S36x4Mww1tqsAYlTU4q-Eh4U4NjScTy0jANiS8Q.svg",
    username: "latipov_kama",
  },
  authDate: "2025-02-16T14:33:59.000Z",
  chatInstance: "-1537647949971518884",
  chatType: "private",
  hash: "3a44f2004132049ce1cb2585b78ba7447925d271da83fe1b899e6fa975aac7d7",
  signature: "pt5zGk7M1uyvS92ksV0DWkw2o1mOPrFs2IPXEUzBK9g3Y8HC52grtJaUdevLOihDgvls5tf931dUJy2bBCaDAQ",
};

export const useTelegramAuth = () => {
  const [user, setUser] = useState<User>(TG_USER_DATA.user);
  const { initData } = retrieveLaunchParams();


  useEffect(() => {
    if (initData?.user) {
      setUser(initData.user);
    } else {
      setUser(TG_USER_DATA.user); // Используем мок-данные, если нет данных из Telegram
    }
  }, [initData]);

  return { user };
};
