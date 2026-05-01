// components
import ToggleSwitch from "@/components/ToggleSwitch";
// icons
import { FaWhatsapp, FaEdit, FaTrashAlt } from "react-icons/fa";

export const getCardSchema = (handleStatusToggle, handleDeleteClick, onEdit) => [
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
    label: "Telefone",
    key: "phone",
    className: "text-center justify-between",
  },

  {
    type: "normal",
    label: "CEP",
    key: "cep",
    className: "text-center justify-between",
  },

  {
    type: "normal",
    label: "Cidade",
    key: "city",
    className: "text-center justify-between",
  },

  {
    type: "normal",
    label: "UF",
    key: "state",
    className: "text-center justify-between",
  },

  {
    type: "normal",
    label: "Status",
    key: "status",
    className: "flex  items-center gap-2 justify-between",

    render: (value, row) => (
      <div className=" w-20 flex flex-col items-end    items-center gap-1">
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
        className: "text-green-600 hover:bg-green-100",
      },

      {
        icon: FaEdit,
        onClick: (row) => onEdit(row),
        className: "text-blue-600 hover:bg-blue-100",
      },

      {
        icon: FaTrashAlt,
        onClick: handleDeleteClick,
        className: "text-red-600 hover:bg-red-100",
      },
    ],
  },
];
