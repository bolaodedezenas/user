import { useState, useEffect } from "react";
import { dashboardService } from "../services/dashboardService";
import { useAuthStore } from "@/modules/auth/stores/auth.store"; // Supondo que você tenha um store de autenticação

export function useDashboardData() {
  const { user } = useAuthStore();
  const [betsStats, setBetsStats] = useState([]);
  const [pizzaChartData, setPizzaChartData] = useState([]);
  const [rankingData, setRankingData] = useState([]);
  const [salesLineData, setSalesLineData] = useState([]);
  const [dailySalesData, setDailySalesData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      if (!user?.id) return;

      try {
        setIsLoading(true);
        const [
          betsSummary,
          pizzaSummary,
          rankingSummary,
          salesSummary,
          dailySummary,
        ] = await Promise.all([
          dashboardService.getBetsSummary(user.id),
          dashboardService.getPizzaChartSummary(user.id),
          dashboardService.getMonthlyRanking(user.id),
          dashboardService.getYearlySalesSummary(user.id),
          dashboardService.getDailySalesSummary(user.id),
        ]);
        setBetsStats(betsSummary);
        setPizzaChartData(pizzaSummary);
        setRankingData(rankingSummary);
        setSalesLineData(salesSummary);
        setDailySalesData(dailySummary);
      } catch (error) {
        console.error("Erro ao carregar estatísticas do dashboard:", error);
      } finally {
        setIsLoading(false);
      }
    }

    loadData();
  }, [user?.id]);

  return {
    betsStats,
    pizzaChartData,
    rankingData,
    salesLineData,
    dailySalesData,
    isLoading,
  };
}
