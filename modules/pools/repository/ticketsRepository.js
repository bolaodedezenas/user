import { supabase } from "@/libs/supabase/client";


export const createTicket = async (ticketData) => {
  const { data, error } = await supabase
    .from("tickets")
    .insert([ticketData])
    .select("id")
    .single();

  if (error) throw error;
  return data.id;
};


export const createBets = async (betsData) => {
  const { error } = await supabase.from("bets").insert(betsData);
  if (error) throw error;
};

