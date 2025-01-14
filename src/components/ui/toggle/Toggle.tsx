import React from "react";

type props = {
  isOn?: boolean;
};

const Toggle: React.FC<props> = ({ isOn }) => {
  return (
    <div
      className={`w-8 h-4 flex items-center rounded-full cursor-pointer transition-colors duration-300 ${isOn ? "bg-[#36B859]" : "bg-gray-300"
        }`}
    >
      <div
        className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300 ${isOn ? "translate-x-4" : "translate-x-0"
          }`}
      />
    </div>
  );
};

export default Toggle;
