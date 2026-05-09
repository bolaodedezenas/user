import { supabaseAdmin } from "@/libs/supabase/admin";

export const checkoutRepositoryAdmin = {
  async saveTransaction(transactionData) {
    const { data, error } = await supabaseAdmin
      .from("transactions")
      .insert(transactionData)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async saveTransactionTickets(relations) {
    const { error } = await supabaseAdmin
      .from("transaction_tickets")
      .insert(relations);

    if (error) throw error;
  },
};
