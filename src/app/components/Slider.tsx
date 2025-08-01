"use client";
import React, { useState, useEffect } from "react";

type SliderProps = React.InputHTMLAttributes<HTMLInputElement>;

const Slider: React.FC<SliderProps> = ({ className, ...rest }) => {
  const [checked, setChecked] = useState(rest.checked ?? false);

  useEffect(() => {
    if (typeof rest.checked === "boolean") {
      setChecked(rest.checked);
    }
  }, [rest.checked]);

  const toggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked);
    if (rest.onChange) {
      rest.onChange(e);
    }
  };

  return (
    <label
      className={`
        relative inline-flex items-center cursor-pointer select-none rounded-full
        border-2
        border-gray-400
        hover:border-white
        w-14 h-8 p-1
        transition-colors duration-500
        ${checked ? "bg-white border-white" : ""}
        ${className ?? ""}
      `}
    >
      <input
        type="checkbox"
        className="sr-only"
        {...rest}
        checked={checked}
        onChange={toggle}
      />
      {/* Track */}
      <span
        className={`
          absolute inset-0 rounded-full
          transition-colors duration-500
          border-
          ${checked ? "bg-white" : "bg-none"}
        `}
      ></span>
      {/* Thumb */}
      <span
        className={`
          relative z-10 block w-6 h-6 rounded-full
          transform transition-all duration-300
          ${checked ? "translate-x-5.5 bg-gray-900" : "translate-x-0 bg-gray-400 hover:bg-white"}
        `}
      >
      {/* Shine */}
      <span className="shine absolute top-0 left-0 w-full h-full pointer-events-none rounded-full"></span>
      </span>
    </label>
  );
};

export default Slider;
