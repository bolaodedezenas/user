import { supabase } from "@/libs/supabase/client.js";

export const dashboardRepository = {
  /**
   * Busca pools ativos e seus concursos com status 'open' ou 'closed'
   */
  async getActivePoolsWithContests() {
    const { data, error } = await supabase
      .from("pools")
      .select(
        `
        id,
        name,
        color,
        contests!inner (
          id,
          status,
          total_prize
        )
      `,
      )
      .eq("is_active", true)
      .in("contests.status", ["open", "closed"]);

    if (error) throw error;
    return data;
  },

  /**
   * Conta bilhetes pagos de um usuário específico para um concurso
   */
  async getUserPaidTicketsCount(contestId, userId) {
    const { count, error } = await supabase
      .from("tickets")
      .select("*", { count: "exact", head: true })
      .eq("contest_id", contestId)
      .eq("user_id", userId)
      .eq("status", "paid");

    if (error) throw error;
    return count || 0;
  },

  /**
   * Conta o total de bilhetes vendidos por um usuário.
   */
  async getTotalTicketsSoldByUser(userId) {
    const { count, error } = await supabase
      .from("tickets")
      .select("*", { count: "exact", head: true })
      .eq("user_id", userId);

    if (error) throw error;
    return count || 0;
  },

  /**
   * Conta os bilhetes vendidos por um usuário hoje.
   */
  async getTicketsSoldTodayByUser(userId) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const { count, error } = await supabase
      .from("tickets")
      .select("*", { count: "exact", head: true })
      .eq("user_id", userId)
      .gte("created_at", today.toISOString())
      .lt("created_at", tomorrow.toISOString());

    if (error) throw error;
    return count || 0;
  },

  /**
   * Conta os bilhetes de um usuário por status.
   * @param {string} userId - ID do usuário.
   * @param {string} status - Status do bilhete (ex: 'paid', 'pending', 'on_credit').
   */
  async getTicketsByStatusForUser(userId, status) {
    const { count, error } = await supabase
      .from("tickets")
      .select("*", { count: "exact", head: true })
      .eq("user_id", userId)
      .eq("status", status);

    if (error) throw error;
    return count || 0;
  },

  /**
   * Conta os bilhetes de um usuário por método de pagamento.
   * @param {string} userId - ID do usuário.
   * @param {string} paymentMethod - Método de pagamento (ex: 'pix', 'cash', 'credit_card').
   */
  async getTicketsByPaymentMethodForUser(userId, paymentMethod) {
    const { count, error } = await supabase
      .from("tickets")
      .select("*", { count: "exact", head: true })
      .eq("user_id", userId)
      .eq("payment_method", paymentMethod);

    if (error) throw error;
    return count || 0;
  },

  /**
   * Busca todos os clientes vinculados a um usuário (cambista/vendedor)
   */
  async getCustomersByUserId(userId) {
    const { data, error } = await supabase
      .from("customers")
      .select("id, name, avatar_url")
      .eq("revendedor_id", userId);

    if (error) throw error;
    return data;
  },

  /**
   * Busca o valor total de bilhetes de um cliente específico em um intervalo de tempo
   */
  async getCustomerTicketsValueSum(customerId, startDate, endDate) {
    const { data, error } = await supabase
      .from("tickets")
      .select("total_value")
      .eq("customer_id", customerId)
      .in("status", ["paid", "on_credit"])
      .gte("created_at", startDate)
      .lte("created_at", endDate);

    if (error) throw error;

    const total = data.reduce(
      (acc, ticket) => acc + (Number(ticket.total_value) || 0),
      0,
    );
    return total;
  },

  /**
   * Busca o valor de todos os bilhetes vendidos por um usuário em um determinado ano
   */
  async getYearlyTicketsData(userId, year) {
    const startOfYear = `${year}-01-01T00:00:00Z`;
    const endOfYear = `${year}-12-31T23:59:59Z`;

    const { data, error } = await supabase
      .from("tickets")
      .select("total_value, created_at")
      .eq("user_id", userId)
      .in("status", ["paid", "on_credit"])
      .gte("created_at", startOfYear)
      .lte("created_at", endOfYear);

    if (error) throw error;
    return data || [];
  },

  /**
   * Busca os bilhetes vendidos por um usuário em um mês/ano específico
   */
  async getMonthlyTicketsData(userId, year, month) {
    const startDate = new Date(year, month, 1).toISOString();
    const endDate = new Date(year, month + 1, 0, 23, 59, 59).toISOString();

    const { data, error } = await supabase
      .from("tickets")
      .select("total_value, created_at")
      .eq("user_id", userId)
      .in("status", ["paid", "on_credit"])
      .gte("created_at", startDate)
      .lte("created_at", endDate);

    if (error) throw error;
    return data || [];
  },
};
