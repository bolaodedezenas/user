

import { supabase } from "@/libs/supabase/client";

export const betsRepository = {
  async getTicketsByContest(contestId, page = 1, limit = 30, searchTerm = "") {
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    let query = supabase
      .from("tickets")
      .select(
        `
        id,
        ticket_number,
        created_at,
        total_value,
        total_bets,
        status,
        customer_id,
        customers (
          name,
          phone,
          city,
          state
        )
      `,
        { count: "planned" },
      )
      .eq("contest_id", contestId)
      .not("customer_id", "is", null);

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



