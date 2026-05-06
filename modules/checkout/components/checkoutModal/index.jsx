

"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
// components
import CheckoutLayout from "../CheckoutLayout";
import { ProgressHeader } from "../ProgressHeader";
import { FooterAction } from "../FooterAction";
import { BolaoCard } from "../BolaoCard";
import { SummaryCard } from "../SummaryCard";
import SelectCustomer from "../SelectCustomer";
import ConfirmationCard from "../ConfirmationCard";
import Title from "@/components/Title";
import Paragraph from "@/components/paragraph";
import CustomersForm from "@/modules/customers/components/CustomersForm";

// icons
import { FaRegCircleCheck } from "react-icons/fa6";
import { FaUserPlus } from "react-icons/fa6";
import { PaymentMethodCard } from "../PaymentMethodCard";
import { FaPix } from "react-icons/fa6";
import { FiClock, FiDollarSign } from "react-icons/fi";
//stores
import { useCheckoutStore } from "../../stores/useCheckoutStore";
import { useBetsStore } from "@/modules/pools/stores/useBetsStore";
import { useCustomers } from "@/modules/customers/hooks/useCustomers";
import { usePaymentMethodStore } from "../../stores/usePaymentMethodStore";
import { useCheckout } from "@/modules/pools/hooks/useCheckout";
import { useCheckoutTransaction } from "../../hooks/useCheckoutTransaction";



export default function CheckoutModal() {

  const router = useRouter();

  const { selectedPaymentMethod, setPaymentMethod, clearPaymentMethod } = usePaymentMethodStore();

  console.log(selectedPaymentMethod);

  const [step, setStep] = useState(1);
  const [customerSearch, setCustomerSearch] = useState("");
  const { customers, isLoading: isLoadingCustomers } = useCustomers(1, 100,customerSearch);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isOpenForm, setIsOpenForm] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [verifiedClientID, setVerifiedClientID] = useState(null);

  const { tickets, updateTicketsStatus } = useBetsStore();
  const open = useCheckoutStore((s) => s.open);// modal checkout
  const closeCheckout = useCheckoutStore((s) => s.closeCheckout);

  // Hook de checkout real
  const {handleCheckout, isPending  } = useCheckout();

  // Hook para transações financeiras
  const { 
    registerTransaction, 
    isSaving: isSavingTransaction, 
    transaction: savedTransaction 
  } = useCheckoutTransaction();

  // trava scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "auto");
  }, []); 


  useEffect(() => {
    if (step === 1) clearPaymentMethod(); // Clear payment method when going back to step 1
  }, [step, clearPaymentMethod]);

  const handleNext = () => {
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      if (!selectedPaymentMethod) {
        toast.error("Por favor, selecione uma forma de pagamento.");
        return;
      }
      // Abre o modal de confirmação antes de ir para o Step 3
      setShowConfirmDialog(true);
    } else {
      setStep(1);
      closeCheckout();

      console.log(verifiedClientID);
      if (verifiedClientID === null) return router.replace("/pools/myBets");
      router.replace("/bets");
     
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleFinalConfirm = async () => {
    const newStatus = selectedPaymentMethod === "cash" ? "paid" : "pending";
    
    // 1. Atualiza o status, cliente e método de pagamento no store de forma síncrona
    const updatedTickets = updateTicketsStatus(
      newStatus,
      selectedCustomer?.id,
      selectedPaymentMethod,
    );

    if (!updatedTickets) return;
    setVerifiedClientID(updatedTickets[0].customer_id);
    console.log(updatedTickets);

    // 2. Chama o hook que envia os dados atualizados para o banco (Supabase)
    // O handleCheckout deve retornar o array de tickets salvos com seus IDs
    const registeredTickets = await handleCheckout(updatedTickets);

    if (!registeredTickets) return; 

    // 3. Registra a transação vinculando aos bilhetes recém criados
    const transaction = await registerTransaction(
      registeredTickets,
      selectedPaymentMethod,
      newStatus
    );

    if (!transaction) return;

    setShowConfirmDialog(false);
    setStep(3);
  };

  const getConfirmMessage = () => {
    switch (selectedPaymentMethod) {
      case "pix": return "Deseja gerar o código PIX para realizar o pagamento?";
      case "cash": return "Confirma que o pagamento em dinheiro foi recebido?";
      case "pending": return "Deseja realmente deixar este pagamento como pendente?";
      default: return "Deseja confirmar esta transação?";
    }
  };


  const getButtonLabel = () => {
    if (step === 1) return "Continuar para pagamento";
    if (step === 2) return "Confirmar pagamento";
    return "Ver meus bolões";
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-150">
      {/* overlay */}
      <div className="absolute inset-0 bg-black/60" />

      <div className="relative w-full h-full overflow-y-auto flex justify-center items-start">
        <div className="w-full max-w-md py-6 px-3 flex justify-center">
          <div className="relative w-full bg-white rounded-3xl shadow-xl overflow-hidden">
            <CheckoutLayout
              header={<ProgressHeader current={step} onBack={handleBack} />}
              footer={
                <FooterAction
                  label={getButtonLabel()}
                  onClick={handleNext}
                />
              }
            >
              {/* TRANSIÇÃO */}
              <div className="transition-all duration-300 ease-in-out">
                {/* ================= STEP 1 ================= */}
                {step === 1 && (
                  <div className="space-y-2 ">
                    {tickets.length > 0 &&
                      tickets.map((ticket, index) => (
                        <BolaoCard
                          title={ticket.pool_name}
                          concurso={ticket.contest_number}
                          cotas={ticket.total_bets}
                          valor={ticket.total_value}
                          color={ticket.color}
                          key={index}
                        />
                      ))}
                    <SummaryCard />
                  </div>
                )}

                {/* ================= STEP 2 ================= */}
                {step === 2 && (
                  <div className="space-y-1">
                    {/* Associar cliente */}
                    <div className="bg-[rgb(var(--blue-800))] rounded-xl p-4 px-8 ">
                      <Title
                        text="Associar cliente"
                        className="text-[1rem] font-semibold text-white"
                      />

                      <Paragraph
                        text="Associe um cliente a esta compra."
                        className="text-[0.8rem] text-white/70! pb-2"
                      />
                      <SelectCustomer
                        options={customers}
                        value={selectedCustomer}
                        onChange={setSelectedCustomer}
                        onSearch={setCustomerSearch}
                        isLoading={isLoadingCustomers}
                      />
                      <div className="flex justify-end pt-4">
                        <div
                          onClick={() => setIsOpenForm(true)}
                          className="flex text-white items-center cursor-pointer "
                        >
                          <FaUserPlus size={25} />
                          <Paragraph
                            text="Cadastrar Cliente"
                            className=" text-white! text-[0.8rem] py-2 px-3 "
                          />
                        </div>
                      </div>
                    </div>

                    {/* Forma de pagamento */}
                    <div>
                      <Title
                        text="Forma de pagamento"
                        className="text-[1rem]"
                      />
                      <Paragraph
                        text="Todas as transações são seguras 🔒 "
                        className=" text-[0.8rem] "
                      />
                    </div>

                    <PaymentMethodCard
                      icon={<FaPix className="text-green-700 text-[1.5rem]" />}
                      className="bg-green-100"
                      title="Pagar com PIX"
                      status="Aprovação imediata"
                      statusColor="green"
                      selected={selectedPaymentMethod === "pix"}
                      onClick={() => setPaymentMethod("pix")}
                    />

                    <PaymentMethodCard
                      icon={
                        <FiClock className="text-orange-500 text-[1.5rem]" />
                      }
                      className="bg-orange-100"
                      title="Marcar como pendente"
                      status="Pagamento em aberto"
                      statusColor="orange"
                      selected={selectedPaymentMethod === "pending"}
                      onClick={() => setPaymentMethod("pending")}
                    />

                    <PaymentMethodCard
                      icon={
                        <FiDollarSign className="text-green-700 text-[1.5rem] " />
                      }
                      className="bg-green-100"
                      title="Marcar como pago (dinheiro)"
                      status="Confirmar recebimento"
                      statusColor="green"
                      selected={selectedPaymentMethod === "cash"}
                      onClick={() => setPaymentMethod("cash")}
                    />

                    {/* <SummaryCard total={2} jogos={12} valor="R$ 48,19" /> */}
                  </div>
                )}

                {/* ================= STEP 3 ================= */}
                {step === 3 && (
                  // CONFIRMACAO
                  <section>
                    <div
                      className="flex flex-col items-center justify-between
                      px-6"
                    >
                      <FaRegCircleCheck
                        className={` ${savedTransaction?.status === "paid" ? "text-green-500" : "text-orange-400"}  text-7xl`}
                      />
                      <Title text="Tudo pronto!" />
                      <Paragraph
                        text={` 
                          ${
                            savedTransaction?.status === "paid"
                              ? "Seu pagamento foi efetuado com sucesso!"
                              : "Suas apostas foram resgistradas como satus pendente."
                          }`}
                        className="text-[0.8rem]"
                      />
                    </div>
                    <ConfirmationCard
                      totalBoloes={savedTransaction?.total_tickets || 0}
                      totalJogos={savedTransaction?.total_bets || 0}
                      valor={savedTransaction?.total_amount?.toLocaleString(
                        "pt-BR",
                        {
                          style: "currency",
                          currency: "BRL",
                        },
                      )}
                      paymentMethod={savedTransaction?.payment_method}
                      status={
                        savedTransaction?.status === "paid"
                          ? "Pago"
                          : "Pendente"
                      }
                      orderId={`#${savedTransaction?.id?.slice(0, 8).toUpperCase() || ""}`}
                      date={
                        savedTransaction?.created_at
                          ? new Date(
                              savedTransaction.created_at,
                            ).toLocaleString("pt-BR")
                          : ""
                      }
                    />
                  </section>
                )}
              </div>
            </CheckoutLayout>
            <CustomersForm
              isOpen={isOpenForm}
              onClose={() => setIsOpenForm(false)}
            />

            {/* Modal de Confirmação de Ação */}
            {showConfirmDialog && (
              <div className="absolute inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
                <div className="bg-white rounded-2xl p-6 w-full max-w-[320px] shadow-2xl text-center">
                  <div className="mb-4 flex justify-center">
                    <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                      <FaRegCircleCheck size={30} />
                    </div>
                  </div>
                  <Title text="Confirmar Ação" className="text-lg mb-2" />
                  <Paragraph
                    text={getConfirmMessage()}
                    className="text-sm text-gray-500 mb-6"
                  />
                  <div className="flex gap-3">
                    <button
                      onClick={() => setShowConfirmDialog(false)}
                      className="flex-1 py-2 rounded-xl border border-gray-200 text-gray-600 font-bold hover:bg-gray-50 transition"
                    >
                      Voltar
                    </button>
                    <button
                      onClick={handleFinalConfirm}
                      disabled={isPending || isSavingTransaction}
                      className="flex-1 py-2 rounded-xl bg-[rgb(var(--btn))] text-white font-bold hover:brightness-110 transition disabled:opacity-50"
                    >
                      {isPending || isSavingTransaction
                        ? "Processando..."
                        : "Confirmar"}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
