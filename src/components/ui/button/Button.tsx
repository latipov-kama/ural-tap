import React, { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  className = "",
  disabled = false
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`gradient_btn py-2.5 px-5 rounded-3xl flex items-center gap-2 text-sm font-semibold ${className} ${disabled ? "opacity-50 cursor-not-allowed" : ""
        }`}
    >
      {children}
    </button>
  );
};

export default Button;
