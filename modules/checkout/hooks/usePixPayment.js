"use client";

import { useState } from "react";

import { createPixService } from "../services/paymentService";

export function usePixPayment() {
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [paymentData, setPaymentData] = useState(null);

  async function generatePix(payload) {
    try {
      setLoading(true);

      const data = await createPixService(payload);

      setPaymentData(data);
      setOpenModal(true);

      return data;
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
