import toast from "react-hot-toast";

export default function CopyPill({ text, copyText, inline, className }: { text: string, copyText?: string, inline?: boolean, className?: string }) {
  const handleCopy = async (txt: string) => {
    try {
      await navigator.clipboard.writeText(copyText ?? text);
      toast.success("Copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy!", err);
      toast.error("Failed to copy!");
    }
  };
  return <p onClick={e => {handleCopy(text); e.stopPropagation()}} className={`${inline ? "ml-1" : "-ml-2"} my-1 px-2 py-1 rounded-full font-semibold tracking-tighter font-mono w-min transition-all duration-300 hover:bg-white hover:text-black hover:cursor-pointer text-nowrap ${className}`}>{text}</p>
}