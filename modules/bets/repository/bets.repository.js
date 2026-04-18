import { supabase } from "@/libs/supabase/client";

export const betsRepository = {
  async getTicketsByContest(contestId, page = 1, limit = 30, searchTerm = "") {
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    // Utilizamos  ilike para filtragem por campos do cliente na busca
    let query = supabase
      .from("tickets")
      .select(
        `
    *,
    customers (
      name,
      phone,
      city,
      state
    )
  `,
    { count: "exact" },
  )
  .eq("contest_id", contestId);


    if (searchTerm) {
      if (!isNaN(searchTerm)) {
        query = query.eq("ticket_number", searchTerm);
      } else {
        query = query.ilike("ticket_number", `%${searchTerm}%`);
      }
    }


    const { data, error, count } = await query
      .order("created_at", { ascending: false })
      .range(from, to);

    if (error) throw error;
    return { data, count };
  },
};
