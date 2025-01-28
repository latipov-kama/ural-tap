import { useState } from 'react';
// import { useParams } from 'react-router-dom';
import Badge from '../../components/ui/badge/Badge';
import Button from '../../components/ui/button/Button';
import { motion } from 'framer-motion';

import repeat from "../../assets/repeat.svg";
import sparkles from "../../assets/sparkles.svg";
import voltage from "../../assets/voltage.svg";

const data = {
  title: "Обнуление счётчика тапов",
  price: 100,
  completed: false
};

const Boost = () => {
  // const { id } = useParams();
  const [isActive, setIsActive] = useState(false); // состояние активности

  const handleClick = () => {
    setIsActive(true); // устанавливаем блок активным
  };

  return (
    <div className="h-full flex items-center justify-center">
      <motion.div
        className={`w-2/3 pb-7 flex flex-col items-center rounded-2xl`}
        initial={{ opacity: 0 }} // начальная анимация
        animate={{
          opacity: 1,
          background: isActive
            ? "linear-gradient(90deg, #6788d5 0%, #937cef 100%)"
            : "linear-gradient(360deg, rgba(226, 236, 255, 0.045) 0%, rgba(226, 236, 255, 0.15) 100%)", // цвет фона изменяется плавно
        }} // анимация при активации
        transition={{
          duration: 0.5, // продолжительность анимации фона
          ease: "easeInOut", // плавность перехода
        }}
      >
        <div className="gradient_circle w-[72px] h-[72px] rounded-full flex items-center justify-center relative -top-4">
          <img src={repeat} alt="repeat" className="w-11" />
        </div>

        <h2 className="mb-3 text-2xl text-center text-balance leading-7">
          {data.title}
        </h2>
        <Badge className="mb-4 w-fit !bg-none !shadow-none">
          <img src={sparkles} alt="sparkles" className="w-6 h-6" />
          {isActive ? `-${data.price}` : data.price}
        </Badge>

        <Button
          onClick={handleClick}
          disabled={isActive}
          className={`${isActive ? "gradient_btn_active disabled:opacity-90" : ""}`}
        >
          <img src={voltage} alt="sparkles" className="w-5 h-5" />
          {isActive ? "Буст применён" : "Прокачать"}
        </Button>
      </motion.div>
    </div>
  );
};

export default Boost;
