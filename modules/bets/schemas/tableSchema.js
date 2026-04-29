// components
import StatusBadge from "@/modules/bets/components/StatusBadge";
// icons
import { FaWhatsapp } from "react-icons/fa";
import { AiOutlineExport } from "react-icons/ai";

export const getTableSchema = (
  handleStatusToggle,
  handleDeleteClick,
  nWatsapp,
  onEdit,
  onDelete,
) => [
  {
    label: "# Bilhete",
    key: "id",
    className: " w-20   flex items-center justify-center ",
  },

  {
    label: "Apostador (a)",
    key: "name",
    className: " w-45 px-4  font-semibold text-blue-700",
  },

  {
    label: "Telefone",
    key: "phone",
    className: "  w-30   flex items-center justify-center ",
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
    key: "valor",
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



