
import { useRouter } from 'next/navigation';
// icons 
import { usePathname } from 'next/navigation';



export default function Submenu() {


  const router = useRouter();
  const pathname = usePathname();
  console.log(pathname);
  const currentRoute = pathname;


  return (
    <nav>
      <ul
        className={` flex  gap-2 list-none text-[1rem] text-[rgb(var(--text))] 
        [&>*]:cursor-pointer
        [&>*]:rounded-[5px]  [&>*]:transition [&>*]:duration-300
        [&>*]:flex [&>*]:gap-7 [&>*]:items-center [&>*]:pl-4 [&>*]:pr-4 [&>*]:py-2 
      `}
      >
        <li
          className={
            currentRoute === "/pools"
              ? "bg-[rgb(var(--btn))] text-white "
              : " hover:bg-[rgb(var(--blue-50))] "
          }
          onClick={() => {
            router.push("/pools");
          }}
        >
          <p>Apostar</p>
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

