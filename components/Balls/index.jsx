import { Ball } from "./styles";

export default function Balls({ number, className, onClick, $close }) {
  return (
    <Ball
      $close={$close === "visible" ? true : false}
      onClick={onClick}
      className={`text-[1rem] text-white font-bold rounded-full  flex items-center justify-center
        cursor-pointer shadow-lg
        ${className}
    `}
    >
      {number}
    </Ball>
  );
}