// components
import StatusBadge from "@/modules/bets/components/StatusBadge";
// icons
import { FaWhatsapp } from "react-icons/fa";
import { AiOutlineExport } from "react-icons/ai";
import { IoPerson } from "react-icons/io5";
import { FaMoneyBillTrendUp } from "react-icons/fa6";

import toast from "react-hot-toast";


export const getTableSchema = (setSelectedTicket) => [
  {
    label: <IoPerson size={20} />,
    key: "avatar_url",
    className: " justify-center w-12 ",
    render: (value) => (
      <div>
        <img src={value} className=" w-12 h-12 rounded-full object-cover" />
      </div>
    ),
  },

  {
    label: "Apostador (a)",
    key: "name",
    className: " w-45 px-4  font-semibold text-blue-700",
  },

  {
    label: "# Bilhete",
    key: "ticket_number",
    className: " w-20   flex items-center justify-center ",
  },

  {
    label: "Telefone",
    key: "phone",
    className: "  w-34   flex items-center justify-center ",
  },

  {
    label: "Endereço",
    key: "endereco",
    className: " w-30   flex items-center justify-center ",
  },

  {
    label: "Jogos",
    key: "jogos",
    className: "  w-30   flex font-extrabold  items-center justify-center ",
  },

  {
    label: "Valor",
    key: "total_value",
    className: "  w-30   flex  items-center justify-center ",
  },

  {
    label: "Status",
    key: "status",
    className: "w-40 flex flex-col items-center justify-center gap-2",
    render: (value) => <StatusBadge status={value} />,
  },

  {
    label: "Ações",
    key: "acoes",
    className: " w-30   flex justify-center items-center gap-2",
    actions: [
      {
        icon: FaMoneyBillTrendUp,
        onClick: (row) => {toast("💳 Em desenvolvimento"), console.log(row)} ,
        className:
          "text-[1.3rem] text-zinc-950 hover:bg-zinc-100  text-blue-800! cursor-pointer",
      },

      {
        icon: FaWhatsapp,
        onClick: (row) =>
          window.open(
            `https://wa.me/55${row.phone.replace(/\D/g, "")}`,
            "_blank",
          ),
        className:
          "text-[1.4rem] text-green-600 hover:bg-green-100 cursor-pointer",
      },

      {
        icon: AiOutlineExport,
        onClick: (row) => setSelectedTicket(row),
        className:
          "text-[1.4rem] text-zinc-800 hover:bg-blue-100 cursor-pointer",
      },
    ],
  },
];



