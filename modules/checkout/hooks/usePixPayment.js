// "use client";

// import { useState } from "react";

// import { createPixService } from "../services/createPixService";

// export function usePixPayment() {
//   const [loading, setLoading] = useState(false);
//   const [openModal, setOpenModal] = useState(false);
//   const [paymentData, setPaymentData] = useState(null);

//   async function generatePix(payload) {
//     try {
//       setLoading(true);

//       const data = await createPixService(payload);

//       setPaymentData(data);
//       setOpenModal(true);

//       return data;
//     } finally {
//       setLoading(false);
//     }
//   }

//   return {
//     loading,
//     paymentData,
//     openModal,
//     setOpenModal,
//     generatePix,
//   };
// }

"use client";

import { useState } from "react";

export function usePixPayment() {
  const [loading, setLoading] = useState(false);
  const [paymentData, setPaymentData] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  async function generatePix(payload) {
    try {
      setLoading(true);

      const res = await fetch("/api/mercadopago/create-pix", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Erro ao gerar o pagamento PIX");
      }

      setPaymentData(data);
      setOpenModal(true);

      return data;
    } catch (error) {
      console.error("Erro no hook usePixPayment:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  }

  return {
    loading,
    paymentData,
    openModal,
    setOpenModal,
    generatePix,
  };
}
