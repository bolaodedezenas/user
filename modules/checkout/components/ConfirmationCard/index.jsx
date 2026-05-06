import { FiClock } from "react-icons/fi";

export default function ConfirmationCard({
  totalBoloes,
  totalJogos,
  valor,
  paymentMethod,
  status,
  orderId,
  date,
}) {
  return (
    <div className="max-w-md mx-auto bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
      <h2 className="font-bold text-gray-800 text-lg mb-4">Resumo da compra</h2>

      <div className="space-y-3 text-sm">
        {/* Linhas de Dados */}
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Total de bolões</span>
          <span className="font-bold text-gray-900">{totalBoloes}</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-gray-600">Total de apostas (jogos)</span>
          <span className="font-bold text-gray-900">{totalJogos}</span>
        </div>

        <hr className="border-gray-100 my-2" />

        <div className="flex justify-between items-center">
          <span className="text-gray-600">Forma de pagamento</span>
          <span className="font-bold text-gray-900  ">
            {paymentMethod}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-gray-600">Status</span>
          <span
            className={` 
              ${status === "Pago" ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-500"}   
              px-3 py-1 rounded-full text-xs font-semibold`}
          >
            {status}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-gray-600">Data e hora</span>
          <div className="flex items-center gap-1 font-bold text-gray-900">
            <FiClock className="text-gray-400" />
            <span>{date}</span>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-gray-600">Código do pedido</span>
          <span className="font-bold text-gray-900">{orderId}</span>
        </div>

        <div className="flex justify-between items-center pt-2">
          <span className="text-gray-600">
            {status === "Pago" ? "Valor pago" : "Valor pendente"}
          </span>
          <span
            className={` ${status === "Pago" ? "text-green-600" : "text-orange-400"}
            font-bold text-xl
            `}
          >
            {valor}
          </span>
        </div>
      </div>
    </div>
  );
}
