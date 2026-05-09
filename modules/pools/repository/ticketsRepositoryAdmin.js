import { supabaseAdmin } from "@/libs/supabase/admin";

export const createTicket = async (ticketData) => {
  const { data, error } = await supabaseAdmin
    .from("tickets")
    .insert([ticketData])
    .select();

  if (error) throw error;

  return data[0];
};

export const createBets = async (betsData) => {
  const { error } = await supabaseAdmin.from("bets").insert(betsData);

  if (error) throw error;
};
