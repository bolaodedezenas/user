import { Card } from "./styles";
import { BsFillClockFill } from "react-icons/bs";
import { FaSackDollar } from "react-icons/fa6";


export default function PoolCard({title, color, money, time, status}) {
  return (
    <Card
      color={color}
      className={` rounded-[20px] text-white min-w-[290px] h-[170px] overflow-hidden shadow-lg`}
    >
      <div className="flex items-center p-4">
        <div>
          <FaSackDollar className="text-[4rem] pl-1 " />
        </div>
        <div className="flex-1  text-center">
          <h3 className="text-[1.4rem] pb-1">{title}</h3>
          <p className="text-[0.8rem]">Prêmio estimado</p>
          <p className="text-[1.2rem]">{money}</p>
        </div>
      </div>
      <div className="flex items-center justify-center gap-4 p-4 bg-black/10 ">
        {status === "finished" ? "" : <BsFillClockFill className="text-[1.4rem] animate-spin " /> }
        <p className="text-[0.8rem]">
          {status === "open" ? "Bolão começa em" : ""}
        </p>
        <p className="text-[0.8rem]">{time}</p>
      </div>
    </Card>
  );
}
