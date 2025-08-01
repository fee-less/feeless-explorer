import React from "react";

type TextInputProps = React.InputHTMLAttributes<HTMLInputElement>;

const TextInput: React.FC<TextInputProps> = ({ className, ...rest }) => {
  return (
    <div className="relative">
      <input
        {...rest}
        className={`
          w-full rounded-full border-2 border-gray-400 py-2 px-4
        placeholder-gray-500
          transition-colors duration-500
          active:border-gray-300 active:text-black
          focus:outline-none
          ${className ?? ""}
        `}
      />
      <span className="shine absolute top-0 left-0 w-full h-full pointer-events-none rounded-full"></span>
    </div>
  );
};

export default TextInput;
