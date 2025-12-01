
export default function Paragraph({ text, className }) {
  return <p className={`text-zinc-500 text-[0.9rem] font-medium ${className}`}>{text}</p>;
}
