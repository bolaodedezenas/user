import StatusBadge from "@/modules/bets/components/StatusBadge";
// icons
import { FaWhatsapp } from "react-icons/fa";
import { AiOutlineExport } from "react-icons/ai";

export const getCardSchema = (
  handleStatusToggle,
  handleDeleteClick,
  nWatsapp,
  onEdit,
  onDelete,
) => [
  {
    type: "normal",
    label: "# Bilhete",
    key: "id",
    className: " ",
  },

  {
    type: "normal",
    label: "Apostador (a)",
    key: "name",
    className: " w-full flex items-start flex-col   ",
  },

  {
    type: "normal",
    label: "Telefone",
    key: "phone",
    className: " ",
  },

  {
    type: "normal",
    label: "Endereço",
    key: "endereco",
    className: " ",
  },

  {
    type: "normal",
    label: "Jogos",
    key: "jogos",
    className: "  ",
  },

  {
    type: "normal",
    label: "Valor",
    key: "valor",
    className: " ",
  },

  {
    type: "normal",
    label: "Status",
    key: "status",
    className: " ",
    render: (value) => <StatusBadge status={value} />,
  },

  {
    type: "action",
    label: "Ações",
    className: "flex justify-center items-center gap-2",
    actions: [
      {
        icon: FaWhatsapp,
        onClick: (row) =>
          window.open(
            `https://wa.me/55${row.phone.replace(/\D/g, "")}`,
            "_blank",
          ),
        className:
          "text-[1.3rem] text-green-600 hover:bg-green-100 cursor-pointer",
      },

      {
        icon: AiOutlineExport,
        onClick: (row) => console.log("Exportar:", row),
        className:
          "text-[1.3rem] text-zinc-800 hover:bg-blue-100 cursor-pointer",
      },
    ],
  },
];

