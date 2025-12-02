

import { useAuth } from "@/context/AuthContext";
import { useRouter } from 'next/navigation';
// icons 
import { MdEmail } from "react-icons/md";
import { PiCityFill } from "react-icons/pi";
import { FaMapMarkerAlt, FaUser } from "react-icons/fa";
import { FaPhone } from "react-icons/fa6";
import { TbLayoutDashboardFilled } from "react-icons/tb";
import { FaFileInvoiceDollar } from "react-icons/fa";
import { FaTrophy } from "react-icons/fa6";
import { HiHome } from "react-icons/hi2";
import { IoArrowUndo } from "react-icons/io5";
import { HiUserCircle } from "react-icons/hi";
import { RiShieldUserFill } from "react-icons/ri";
import { usePathname } from 'next/navigation';
import { IoMdArrowDropdown } from "react-icons/io";


export default function Menu({ toggle, setToggle, toggleUser, setToggleUser }) {
  const { user, handleLogout } = useAuth();

  const router = useRouter();
  const pathname = usePathname();
  const currentRoute = "/" + pathname.split("/")[1];

  return (
    <aside
      className={`absolute top-0 bottom-2 left-0  xss:static z-40 flex flex-col bg-white   
          min-h-full  flex-1  overflow-hidden shadow-2xl 
          rounded-t-0 xss:rounded-[20px]
        ${
          toggle
            ? "max-w-[100%] min-w-[100%] sm:min-w-[260px]! xss:min-w-[65px] xss:max-w-[300px] "
            : "max-w-[0px] min-w-[0px] xss:min-w-[65px] "
        } transition-all duration-300 
      `}
    >
      <div
        className="relative flex items-center pl-18 lg:p-0  lg:justify-center h-[100px] lg:h-[170px]  max-w-[100%] min-w-[300px] sm:w-[260px] bg-[rgb(var(--background))] rounded-b-0  pr-5 
        "
      >
        {user?.photoURL ? (
          <img
            src={user?.photoURL || "/ball.png"}
            alt="logo"
            className={`object-cover rounded-full w-18 h-18 lg:w-30 lg:h-30  trasition duration-300`}
          />
        ) : (
          <HiUserCircle
            className={`text-white trasition duration-300
              ${toggle ? "text-[9rem]" : "absolute left-3 text-[2.8rem]"}
          `}
          />
        )}
      </div>
      <div
        className={`relative p-5 min-w-[300px]  sm:min-w-[300px] border-b-2 border-b-gray-300 overflow-hidden trasition duration-300 
          ${toggleUser ? "h-45" : "h-13"}
        `}
      >
        {toggle && (
          <IoMdArrowDropdown
            onClick={() => setToggleUser(!toggleUser)}
            className={` absolute text-[2.5rem] text-zinc-400 
            top-2.5 right-5  cursor-pointer hover:opacity-80   transition   duration-300
            ${toggleUser ? "rotate-180" : ""}
          `}
          />
        )}
        <ol
          className={`flex flex-col gap-2 list-none text-[0.9rem] text-[rgb(var(--text))]
          [&>*]:flex [&>*]:gap-7 [&>*]:items-center  [&>*]:pl-1 
        `}
        >
          <li>
            <RiShieldUserFill className="text-[1.3rem] text-[rgb(var(--blue-950))]" />
            <p>{user?.name.split(" ").slice(0, 2).join(" ")}</p>
          </li>
          <li>
            <MdEmail className="text-[1.3rem] text-[rgb(var(--blue-950))]" />
            <p>{user?.email}</p>
          </li>
          <li>
            <PiCityFill className="text-[1.3rem] text-[rgb(var(--blue-950))]" />
            <p>
              {(user?.city && `${user?.city} - ${user?.state}`) || "Sem cidade"}
            </p>
          </li>
          <li>
            <FaMapMarkerAlt className="text-[1.3rem] text-[rgb(var(--blue-950))]" />
            <p>{user?.cep || "Sem cep"}</p>
          </li>
          <li>
            <FaPhone className="text-[1.2rem] text-[rgb(var(--blue-950))]" />
            <p>{user?.phone || "Sem telefone"}</p>
          </li>
        </ol>
      </div>
      <nav
        className={`p-4 pt-0  flex-1 border-b-2 border-b-gray-300  overflow-auto 
         ${toggleUser ? "h-auto" : " min-w-[300px] sm:w-[260px]"}
        `}
      >
        <ul
          className=" flex flex-col gap-2 list-none text-[1rem] text-[rgb(var(--text))] pt-1.5
          [&>*]:hover:bg-[rgb(var(--blue-50))] [&>*]:cursor-pointer
          [&>*]:rounded-[5px]  [&>*]:transition [&>*]:duration-300
          [&>*]:flex [&>*]:gap-7 [&>*]:items-center [&>*]:pl-2 [&>*]:p-3 [&>*]:py-2 
        "
        >
          <li
            className={currentRoute === "/" ? "bg-[rgb(var(--blue-50))] " : ""}
            onClick={() => {
              router.push("/"), setToggle(false);
            }}
          >
            <HiHome className="text-[1.3rem] text-[rgb(var(--blue-950))]" />
            <p>Home</p>
          </li>
          <li
            className={
              currentRoute === "/dashboard" ? "bg-[rgb(var(--blue-50))] " : ""
            }
            onClick={() => {
              router.push("/dashboard"), setToggle(false);
            }}
          >
            <TbLayoutDashboardFilled className="text-[1.3rem] text-[rgb(var(--blue-950))]" />
            <p>Dasboard</p>
          </li>
          <li
            className={
              currentRoute === "/bets" ? "bg-[rgb(var(--blue-50))] " : ""
            }
            onClick={() => {
              router.push("/bets"), setToggle(false);
            }}
          >
            <FaFileInvoiceDollar className="text-[1.3rem] text-[rgb(var(--blue-950))]" />
            <p>Apostas</p>
          </li>
          <li
            className={
              currentRoute === "/winners" ? "bg-[rgb(var(--blue-50))] " : ""
            }
            onClick={() => {
              router.push("/winners"), setToggle(false);
            }}
          >
            <FaTrophy className="text-[1.3rem] text-[rgb(var(--blue-950))]" />
            <p>Ganhadores</p>
          </li>
          <li
            className={
              currentRoute === "/perfil" ? "bg-[rgb(var(--blue-50))] " : ""
            }
            onClick={() => {
              router.push("/perfil"), setToggle(false);
            }}
          >
            <FaUser className="text-[1.3rem] text-[rgb(var(--blue-950))]" />
            <p>Perfil</p>
          </li>
          <li onClick={() => handleLogout()}>
            <IoArrowUndo className="text-[1.3rem] text-[rgb(var(--blue-950))]" />
            <p>Sair</p>
          </li>
        </ul>
      </nav>
      <div className="h-10 flex items-center  justify-center  border-b-2 border-b-gray-300 ">
        {toggle && (
          <p className="text-[0.9rem] text-[rgb(var(--text))]">
            Desenvolvido pela Rixxer
          </p>
        )}
      </div>
    </aside>
  );
}

