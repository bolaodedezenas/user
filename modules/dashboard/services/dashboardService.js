import { dashboardRepository } from "../repository/dashboardRepository";

export const dashboardService = {
  async getBetsSummary(userId) {
    if (!userId) return [];

    const poolsData = await dashboardRepository.getActivePoolsWithContests();

    const stats = await Promise.all(
      poolsData.map(async (pool) => {
        // Pegamos o primeiro concurso válido encontrado para o bolão
        const contest = pool.contests?.[0];
        if (!contest) return null;

        const salesCount = await dashboardRepository.getUserPaidTicketsCount(
          contest.id,
          userId,
        );

        return {
          title: pool.name,
          prize: contest.total_prize?.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          }),
          status: contest.status === "open" ? "Aberto" : "Fechado",
          sales: salesCount,
          color: pool.color,
        };
      }),
    );

    return stats.filter(Boolean); // Remove nulos caso algum bolão não tenha concurso ativo
  },

  /**
   * Monta os dados para o gráfico de pizza de resumo de vendas do usuário.
   * @param {string} userId - ID do usuário logado.
   * @returns {Array<Object>} Dados formatados para o gráfico de pizza.
   */
  async getPizzaChartSummary(userId) {
    if (!userId) return [];

    // Assumindo que 'fiado' e 'Não pagas' são status ou métodos de pagamento específicos no seu DB.
    // Ajuste os nomes dos status/métodos conforme seu schema do Supabase.
    const [
      totalSales,
      todaySales,
      paidSales,
      onCreditSales, // Ex: status 'on_credit' para fiado
      pendingSales, // Ex: status 'pending' para não pagas
      pixSales, // Ex: payment_method 'pix'
      cashSales, // Ex: payment_method 'cash'
    ] = await Promise.all([
      dashboardRepository.getTotalTicketsSoldByUser(userId),
      dashboardRepository.getTicketsSoldTodayByUser(userId),
      dashboardRepository.getTicketsByStatusForUser(userId, "paid"),
      dashboardRepository.getTicketsByStatusForUser(userId, "on_credit"), // Ajuste conforme seu DB
      dashboardRepository.getTicketsByStatusForUser(userId, "pending"), // Ajuste conforme seu DB
      dashboardRepository.getTicketsByPaymentMethodForUser(userId, "pix"), // Ajuste conforme seu DB
      dashboardRepository.getTicketsByPaymentMethodForUser(userId, "cash"), // Ajuste conforme seu DB
    ]);

    return [
      { label: "Total", value: totalSales, color: "#22c55e" },
      { label: "Hoje", value: todaySales, color: "#06b6d4" },
      { label: "Confirmadas", value: paidSales, color: "#3b82f6" },
      { label: "Fiado", value: onCreditSales, color: "#f97316" },
      { label: "Não pagas", value: pendingSales, color: "#ef4444" },
      { label: "Em Pix", value: pixSales, color: "#d4d4d4" },
      { label: "Em Dinheiro", value: cashSales, color: "#525252" },
    ];
  },

  /**
   * Monta o ranking de clientes que mais compraram no mês atual
   */
  async getMonthlyRanking(userId) {
    if (!userId) return [];

    const now = new Date();
    const startOfMonth = new Date(
      now.getFullYear(),
      now.getMonth(),
      1,
    ).toISOString();
    const endOfMonth = new Date(
      now.getFullYear(),
      now.getMonth() + 1,
      0,
      23,
      59,
      59,
    ).toISOString();

    const customers = await dashboardRepository.getCustomersByUserId(userId);

    const ranking = await Promise.all(
      customers.map(async (customer) => {
        const totalValue = await dashboardRepository.getCustomerTicketsValueSum(
          customer.id,
          startOfMonth,
          endOfMonth,
        );

        return {
          name: customer.name,
          value: totalValue,
          avatar:
            customer.avatar_url ||
            `https://ui-avatars.com/api/?name=${encodeURIComponent(customer.name)}&background=random`,
        };
      }),
    );

    // Ordena do maior valor para o menor e remove quem não comprou nada
    return ranking
      .filter((item) => item.value > 0)
      .sort((a, b) => b.value - a.value);
  },

  /**
   * Monta o resumo de vendas mensal para o gráfico de linha (ano atual)
   */
  async getYearlySalesSummary(userId) {
    if (!userId) return [];

    const currentYear = new Date().getFullYear();
    const tickets = await dashboardRepository.getYearlyTicketsData(
      userId,
      currentYear,
    );

    const monthNames = [
      "Jan",
      "Fev",
      "Mar",
      "Abr",
      "Mai",
      "Jun",
      "Jul",
      "Ago",
      "Set",
      "Out",
      "Nov",
      "Dez",
    ];

    // Inicializa todos os meses com valor 0
    const summary = monthNames.map((name) => ({
      name,
      value: 0,
    }));

    // Soma os valores nos meses correspondentes
    tickets.forEach((ticket) => {
      const date = new Date(ticket.created_at);
      const monthIndex = date.getMonth();
      summary[monthIndex].value += Number(ticket.total_value || 0);
    });

    return summary;
  },

  /**
   * Monta o resumo de vendas diário para o gráfico (mês atual)
   */
  async getDailySalesSummary(userId) {
    if (!userId) return [];

    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const tickets = await dashboardRepository.getMonthlyTicketsData(
      userId,
      year,
      month,
    );

    // Inicializa todos os dias do mês com valor 0
    const summary = Array.from({ length: daysInMonth }, (_, i) => ({
      name: String(i + 1).padStart(2, "0"),
      value: 0,
    }));

    tickets.forEach((ticket) => {
      const day = new Date(ticket.created_at).getDate();
      summary[day - 1].value += Number(ticket.total_value || 0);
    });

    return summary;
  },
};
