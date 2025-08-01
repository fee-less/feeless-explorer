export default function Tag({
  text,
  color,
  textColor,
  inline,
}: {
  text: string;
  color: string;
  textColor?: string;
  inline?: boolean;
}) {
  return (
    <p
      className={`${
        inline ? "ml-1" : "-ml-2"
      } my-1 px-2 py-1 rounded-full font-semibold tracking-tighter font-mono w-min text-nowrap text-sm`}
      style={{ backgroundColor: color, color: textColor }}
    >
      {text}
    </p>
  );
}
