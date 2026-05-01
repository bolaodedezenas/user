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
    className: "justify-between ",
  },

  {
    type: "normal",
    label: "Apostador (a)",
    key: "name",
    className: " ",
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
    key: "valor",
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
        onClick: (row) => console.log("Exportar:", row),
        className:
          "text-[1.3rem] text-zinc-950 hover:bg-blue-100 cursor-pointer",
      },
    ],
  },
];

