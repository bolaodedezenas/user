
export default function Paragraph({ text, onClick, className }) {
  return <p onClick={onClick} className={`text-zinc-500   font-medium ${className}`}>{text}</p>;
}
