import { FiArrowLeft, FiCheck } from "react-icons/fi";
import { TiShoppingCart } from "react-icons/ti";
import { AiFillCloseSquare } from "react-icons/ai";
// stores
import { useCheckoutStore } from "../../stores/useCheckoutStore";
import { useBetsStore } from "@/modules/pools/stores/useBetsStore";


const steps = ["Revisão", "Pagamento", "Confirmação"];

export function ProgressHeader({ current, onBack }) {
  const { tickets } = useBetsStore();
  const closeCheckout = useCheckoutStore((s) => s.closeCheckout);
  
  const getTitle = () => {
    if (current === 1) return "Carrinho";
    if (current === 2) return "Pagamento";
    return "Confirmação";
  };

  return (
    <div className="bg-white pb-2">
      {/* 🔝 Linha 1 */}
      <div className="flex items-center justify-between p-4 px-6">
        <div className="flex items-center gap-3">
          {current > 1 && current <= 2 ? (
             <button
              onClick={onBack}
              className="cursor-pointer hover:bg-[rgb(var(--blue-50))] hover:text-[rgb(var(--blue-700] p-2"
            >
              <FiArrowLeft size={25} />
            </button>
          ) : (
            <div className="p-2 ">
              <TiShoppingCart size={25} />
            </div>
          )}

          <h2 className="font-semibold text-base">{getTitle()}</h2>
        </div>
        <div className="flex items-center gap-3">
          {/* Badge (só na etapa 1) */}
          {current === 1 && (
            <span className="text-[0.8rem] bg-[rgb(var(--blue-50))] text-[rgb(var(--blue-900))] px-3 py-2 rounded-[5px] font-bold">
              {tickets.length} bolões
            </span>
          )}
          <AiFillCloseSquare
            onClick={() => { 
              closeCheckout(),
              onBack(1);// volta para step 1 do checkoutModal
            }}
            size={30}
            className="text-[rgb(var(--blue-700))] hover:text-[rgb(var(--blue-800))] cursor-pointer"
          />
        </div>
      </div>

      {/* 🔽 Linha 2 (progress FIXO) */}
      <div className="px-4 pb-2">
        <div className="flex items-center justify-between relative">
          {steps.map((step, index) => {
            const isDone = current === 3 || index + 1 < current;
            const isActive = current !== 3 && index + 1 === current;

            return (
              <div
                key={index}
                className="flex-1 flex flex-col items-center relative"
              >
                {/* LINHA CINZA */}
                {index < steps.length - 1 && (
                  <div className="absolute top-4 left-1/2 w-full h-[2px] bg-gray-200 z-0" />
                )}

                {/* LINHA ATIVA */}
                {index < current - 1 && (
                  <div className="absolute top-4 left-1/2 w-full h-[2px] bg-[rgb(var(--blue-300))] z-0" />
                )}

                {/* CÍRCULO */}
                <div
                  className={`z-10 w-8 h-8 flex items-center justify-center rounded-full text-[0.9rem]
                  ${
                    isDone
                      ? "bg-green-400 text-white font-black "
                      : isActive
                        ? "bg-[rgb(var(--blue-600))] text-white"
                        : "bg-gray-200 text-gray-800"
                  }`}
                >
                  {isDone ? <FiCheck size={20} /> : index + 1}
                </div>

                {/* LABEL */}
                <span className="text-[0.9rem] font-medium   mt-1 text-gray-600">
                  {step}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
