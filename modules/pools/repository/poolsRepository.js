import { supabase } from "@/libs/supabase/client";

export const getPoolsRepository = async () => {
  const { data, error } = await supabase
    .from("pools")
    .select("*")
    .order("id", { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};
