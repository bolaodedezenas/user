

export default function Balls({ number, className }) {
  return (
    <div
      className={`text-[1rem] text-white font-bold rounded-full  flex items-center justify-center
        cursor-pointer shadow-lg
        ${className}
    `}
    >
      {number}
    </div>
  );
}