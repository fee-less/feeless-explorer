import React, { CSSProperties, HTMLAttributes, ReactNode } from "react";

interface TextProps extends HTMLAttributes<HTMLParagraphElement> {
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export const Title = ({
  children,
  className = "",
  style = {},
  ...props
}: TextProps) => (
  <p
    className={`text-2xl font-extrabold tracking-wide text-gray-100 ${className}`}
    style={style}
    {...props}
  >
    {children}
  </p>
);

export const SubTitle = ({
  children,
  className = "",
  style = {},
  ...props
}: TextProps) => (
  <p
    className={`text-xl font-semibold text-gray-200 ${className} mb-2`}
    style={style}
    {...props}
  >
    {children}
  </p>
);

export const Body = ({
  children,
  className = "",
  style = {},
  ...props
}: TextProps) => (
  <p
    className={`text-base text-gray-300 ${className}`}
    style={style}
    {...props}
  >
    {children}
  </p>
);

export const Note = ({
  children,
  className = "",
  style = {},
  ...props
}: TextProps) => (
  <p className={`text-sm text-gray-500 ${className}`} style={style} {...props}>
    {children}
  </p>
);
