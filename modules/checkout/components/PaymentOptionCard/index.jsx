import { FiCheckCircle } from "react-icons/fi";

export function PaymentOptionCard({ title, subtitle, selected, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`border rounded-xl p-4 cursor-pointer flex justify-between items-center
      ${selected ? "border-blue-600 bg-blue-50" : "bg-white"}`}
    >
      <div>
        <h4 className="font-medium">{title}</h4>
        <p className="text-xs text-gray-500">{subtitle}</p>
      </div>

      {selected && <FiCheckCircle className="text-blue-600" />}
    </div>
  );
}
