import React, { CSSProperties, ReactNode, HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  style?: CSSProperties;
  className?: string;
}

export default function Card({
  children,
  className = "",
  style = {},
  ...props
}: CardProps) {
  return (
    <div
      className={`flex flex-col gap-4 rounded-md shadow-sm p-4 m-8 ${className}`}
      style={style}
      {...props}
    >
      {children}
    </div>
  );
}
