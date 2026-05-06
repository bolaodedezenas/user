import { supabase } from "@/libs/supabase/client";


// export const createTicket = async (ticketData) => {
//   const { data, error } = await supabase
//     .from("tickets")
//     .insert([ticketData])
//     .select("id")
//     .single();

//   if (error) throw error;
//   return data.id;
// };

export const createTicket = async (ticketData) => {
  const { data, error } = await supabase
    .from("tickets")
    .insert([ticketData])
    .select(); // 🔥 NÃO filtra só id

  if (error) throw error;

  return data[0]; // ✅ retorna objeto completo
};


export const createBets = async (betsData) => {
  const { error } = await supabase.from("bets").insert(betsData);
  if (error) throw error;
};

