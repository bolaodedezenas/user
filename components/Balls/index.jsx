

export default function Balls({ number, className, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`text-[1rem] text-white font-bold rounded-full  flex items-center justify-center
        cursor-pointer shadow-lg
        ${className}
    `}
    >
      {number}
    </div>
  );
}