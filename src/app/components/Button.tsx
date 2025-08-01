import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<ButtonProps> = ({ children, className, ...rest }) => {
  return (
    <button
      {...rest}
      className={`border-gray-400 border-2 rounded-full py-2 px-4 transition-all duration-300 hover:cursor-pointer hover:bg-white hover:border-white active:bg-gray-300 active:border-gray-300 hover:text-black ${className ?? ""}`}
    >
      {children}
    </button>
  );
};

export default Button;
