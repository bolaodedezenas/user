import StatusBadge from "@/modules/bets/components/StatusBadge";
// icons
import { FaWhatsapp } from "react-icons/fa";
import { AiOutlineExport } from "react-icons/ai";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import toast from "react-hot-toast";


export const getCardSchema = (setSelectedTicket) => [
  {
    type: "group",
    label: "",
    className: "",

    fields: [
      {
        key: "avatar_url",
        render: (value) => (
          <div className="w-10 h-10 rounded-full overflow-hidden">
            <img
              src={value}
              className=" object-cover w-full  h-full rounded-full   "
            />
          </div>
        ),
      },
      {
        key: "name",
        className: "px-4 w-full font-semibold   text-[0.8rem]",
      },
    ],
  },

  {
    type: "normal",
    label: "# Bilhete",
    key: "ticket_number",
    className: "justify-between ",
  },

  {
    type: "normal",
    label: "Telefone",
    key: "phone",
    className: " justify-between",
  },

  {
    type: "normal",
    label: "Endereço",
    key: "endereco",
    className: "justify-between ",
  },

  {
    type: "normal",
    label: "Jogos",
    key: "jogos",
    className: "justify-between ",
  },

  {
    type: "normal",
    label: "Valor",
    key: "total_value",
    className: "justify-between ",
  },

  {
    type: "normal",
    label: "Status",
    key: "status",
    className: "justify-between ",
    render: (value) => <StatusBadge status={value} />,
  },

  {
    type: "action",
    label: "Ações",
    className: "flex justify-center items-center gap-2",
    actions: [
      {
        icon: FaMoneyBillTrendUp,
        onClick: (row) => {
          (toast("💳 Em desenvolvimento"), console.log(row));
        },
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
          "text-[1.3rem] text-green-700 hover:bg-green-100 cursor-pointer",
      },

      {
        icon: AiOutlineExport,
        onClick: (row) => setSelectedTicket(row),
        className:
          "text-[1.3rem] text-zinc-950 hover:bg-blue-100 cursor-pointer",
      },
    ],
  },
];

