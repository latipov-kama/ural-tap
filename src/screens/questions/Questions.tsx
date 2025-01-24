import { Minus, Plus } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { QUESTIONS_DATA } from "../../constants";

const Questions = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="p-5">
      <div className="flex flex-col">
        {QUESTIONS_DATA.map((item, idx) => (
          <div key={idx} className="item border-b border-primary py-4">
            <div
              className="flex items-center justify-between gap-4 cursor-pointer"
              onClick={() => toggleItem(idx)}
            >
              <p className="text-base">{item.question}</p>
              {openIndex === idx ? <Minus color="#8DA0C6" /> : <Plus color="#8DA0C6" />}
            </div>

            <AnimatePresence>
              {openIndex === idx && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1, marginTop: "12px" }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <span className="inline-block text-sm text-secondary leading-4">
                    {item.answer}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Questions;
