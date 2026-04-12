import { supabase } from "@/libs/supabase/client";

/**
 * Busca todos os concursos vinculados a um bolão específico.
 */
export const getContestsByPoolRepository = async (poolId) => {
  const { data, error } = await supabase
    .from("contests")
    .select("*")
    .eq("pool_id", poolId)
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return data;
};
