import { supabase } from "@/libs/supabase/client";

export const checkoutRepository = {
  async saveTransaction(transactionData) {
    const { data, error } = await supabase
      .from("transactions")
      .insert(transactionData)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async saveTransactionTickets(relations) {
    const { error } = await supabase
      .from("transaction_tickets")
      .insert(relations);

    if (error) throw error;
  },
};
