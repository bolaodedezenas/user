import { supabase } from "@/libs/supabase/client";

export const fetchMyTickets = async (userId, poolId, contestId) => {
  const { data, error } = await supabase
    .from("tickets")
    .select("*")
    .eq("user_id", userId)
    .eq("pool_id", poolId)
    .eq("contest_id", contestId)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};
