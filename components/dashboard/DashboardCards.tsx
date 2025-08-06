import { Package, TrendingUp, TrendingDown, BarChart3 } from "lucide-react";
import { StatCard } from "./StatCard";
import { DashboardStats } from "@/types";

interface DashboardCardsProps {
  stats: DashboardStats;
}

export const DashboardCards = ({ stats }: DashboardCardsProps) => {
  const {
    totalProdutos,
    totalItensEstoque,
    movimentacaoEntrada,
    movimentacaoSaida,
    saldoLiquido,
  } = stats;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="Total de Produtos"
        value={totalProdutos}
        description={`${totalItensEstoque} itens em estoque`}
        icon={Package}
      />

      <StatCard
        title="Entradas (30 dias)"
        value={movimentacaoEntrada}
        description="Entradas"
        icon={TrendingUp}
        iconColor="text-green-600"
        valueColor="text-green-600"
      />

      <StatCard
        title="Saídas (30 dias)"
        value={movimentacaoSaida}
        description="Saídas"
        icon={TrendingDown}
        iconColor="text-red-600"
        valueColor="text-red-600"
      />

      <StatCard
        title="Saldo Líquido"
        value={`${saldoLiquido > 0 ? "+" : ""}${saldoLiquido}`}
        description="Diferença entrada/saída"
        icon={BarChart3}
        valueColor={saldoLiquido >= 0 ? "text-green-600" : "text-red-600"}
      />
    </div>
  );
};
