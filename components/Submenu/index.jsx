import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
// icons 
import { usePathname } from 'next/navigation';



export default function Submenu({ itemContest }) {
  const router = useRouter();
  const pathname = usePathname();
  console.log(pathname);
  const currentRoute = pathname;

  useEffect(() => {
    if (itemContest?.status === "finished" || itemContest?.status === "closed") {
      router.push("/pools/raffles");
    }
  }, [itemContest?.status]);

  return (
    <nav className="">
      <ul
        className={` flex flex-wrap justify-center  gap-2 list-none text-[1rem] text-[rgb(var(--text))] 
        [&>*]:cursor-pointer
        [&>*]:rounded-[5px]  [&>*]:transition [&>*]:duration-300
        [&>*]:flex  [&>*]:items-center [&>*]:pl-4 [&>*]:pr-4 [&>*]:py-2 
      `}
      >
        <li
          className={
            currentRoute === "/pools"
              ? itemContest?.status === "finished"
                ? `bg-red-500 text-white cursor-none!`
                : itemContest?.status === "closed"
                ? `bg-orange-400 text-white cursor-none!`
                : `bg-[rgb(var(--btn))] text-white `
              : itemContest?.status === "finished"
              ? `bg-red-500 text-white cursor-none!`
              : itemContest?.status === "closed"
              ? `bg-orange-400 text-white cursor-none!`
              : ` hover:bg-[rgb(var(--blue-50))] `
          }
          onClick={() => {
            itemContest?.status === "finished" ||
            itemContest?.status === "closed"
              ? ""
              : router.push("/pools");
          }}
        >
          <p>
            {itemContest?.status === "finished"
              ? "Finalizado"
              : itemContest?.status === "closed"
              ? "Encerrado"
              : "Apostar"}
          </p>
        </li>
        <li
          className={
            currentRoute === "/pools/raffles"
              ? "bg-[rgb(var(--btn))] text-white "
              : " hover:bg-[rgb(var(--blue-50))] "
          }
          onClick={() => {
            router.push("/pools/raffles");
          }}
        >
          <p>Sorteios</p>
        </li>
        <li
          className={
            currentRoute === "/pools/awards"
              ? "bg-[rgb(var(--btn))] text-white"
              : " hover:bg-[rgb(var(--blue-50))] "
          }
          onClick={() => {
            router.push("/pools/awards");
          }}
        >
          <p>Prêmios</p>
        </li>
        <li
          className={
            currentRoute === "/pools/winners"
              ? "bg-[rgb(var(--btn))] text-white "
              : " hover:bg-[rgb(var(--blue-50))] "
          }
          onClick={() => {
            router.push("/pools/winners");
          }}
        >
          <p>Ganhadores</p>
        </li>
        <li
          className={
            currentRoute === "#"
              ? "bg-[rgb(var(--btn))] text-white "
              : " hover:bg-[rgb(var(--blue-50))] "
          }
          onClick={() => {
            router.push("#");
          }}
        >
          <p>Regras</p>
        </li>
      </ul>
    </nav>
  );
}

