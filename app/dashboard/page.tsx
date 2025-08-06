"use client";

import { Navbar } from "@/components/navbar";
import { DashboardCards } from "@/components/dashboard/DashboardCards";
import { CategoryStats } from "@/components/dashboard/CategoryStats";
import { RecentMovements } from "@/components/dashboard/RecentMovements";
import { QuickSummary } from "@/components/dashboard/QuickSummary";
import { useStorageData } from "@/hooks/useStorageData";
import {
  calculateDashboardStats,
  calculateCategoryStats,
  getRecentMovements,
} from "@/utils/calculations";

export default function DashboardPage() {
  // Usar hook customizado para dados
  const { produtos, movimentacoes } = useStorageData();

  // Calcular estatísticas usando funções utilitárias
  const stats = calculateDashboardStats(produtos, movimentacoes);
  const categoryStats = calculateCategoryStats(produtos);
  const recentMovements = getRecentMovements(movimentacoes, 5);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto py-6 space-y-6">
        {/* REGIÃO DO TEXTO DASHBOARD */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Visão geral do seu estoque e movimentações
          </p>
        </div>

        {/* Cards principais do dashboard */}
        <DashboardCards stats={stats} />

        {/* Cards de Categorias e Movimentações */}
        <div className="grid gap-6 lg:grid-cols-2">
          <CategoryStats categories={categoryStats} />
          <RecentMovements movements={recentMovements} />
        </div>

        {/* Resumo Rápido */}
        <QuickSummary stats={stats} categories={categoryStats} />
      </div>
    </div>
  );
}
