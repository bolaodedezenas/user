import { supabase } from "@/libs/supabase/client";

/**
 * Busca todos os concursos vinculados a um bolão específico.
 */
export const fetchAllContestsByPool = async (poolId) => {
  const { data, error } = await supabase
    .from("contests")
    .select("*")
    .eq("pool_id", poolId)
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return data;
};

/**
 * Busca um concurso específico pelo número dentro de um bolão.
 */
export const fetchSingleContestByNumber = async (poolId, contestNumber) => {
  const { data, error } = await supabase
    .from("contests")
    .select("*")
    .eq("pool_id", poolId)
    .eq("contest_number", contestNumber)
    .maybeSingle();

  if (error) throw new Error(error.message);
  return data;
};
