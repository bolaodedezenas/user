// components
import ToggleSwitch from "@/components/ToggleSwitch";
// icons
import { FaWhatsapp, FaEdit,  FaTrashAlt,} from "react-icons/fa";


export const getTableSchema = (
  handleStatusToggle,
  handleDeleteClick,
  nWatsapp,
  onEdit,
  onDelete,
) => [
  {
    label: "Foto",
    key: "avatar_url",
    className: " w-13 ",
    render: (value) => (
      <div>
        <img src={value} className="w-12 h-12 rounded-full object-cover" />
      </div>
    ),
  },

  {
    label: "Cliente",
    key: "name",
    className: "  w-45 px-4  font-semibold text-blue-700",
  },

  {
    label: "Telefone",
    key: "phone",
    className: " w-30   flex items-center justify-center  ",
  },

  {
    label: "CEP",
    key: "cep",
    className: "  w-30   flex items-center justify-center  ",
  },

  {
    label: "Cidade",
    key: "city",
    className: " w-30    flex items-center justify-center  ",
  },

  {
    label: "UF",
    key: "state",
    className: "  w-30   flex items-center justify-center  ",
  },

  {
    label: "Status",
    key: "status",
    className: " w-30   flex flex-col items-center justify-center gap-2",
    render: (value, row) => (
      <div className="flex flex-col items-center gap-1">
        <ToggleSwitch
          checked={value}
          onChange={() => handleStatusToggle(row)}
          size="sm"
          activeText=""
          inactiveText=""
        />
        <span
          className={`${value ? "text-green-600" : "text-red-500"} text-[0.8rem] font-bold pr-2 uppercase  `}
        >
          {value ? "Ativo" : "Bloqueado"}
        </span>
      </div>
    ),
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
        icon: FaEdit,
        onClick: (row) => console.log("edit:", row),
        className:
          "text-[1.3rem] text-blue-600 hover:bg-blue-100 cursor-pointer",
      },

      {
        icon: FaTrashAlt,
        onClick: handleDeleteClick,
        className: "text-[1.3rem] text-red-600 hover:bg-red-100 cursor-pointer",
      },
    ],
  },
];