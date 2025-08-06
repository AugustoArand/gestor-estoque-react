import { Calendar, TrendingUp, BarChart3 } from "lucide-react";
import { VendasCard } from "./VendasCard";

interface VendasCardsProps {
  vendasDiarias: number;
  vendasSemanais: number;
  vendasMensais: number;
  quantidadeVendasDia?: number;
  quantidadeVendasSemana?: number;
  quantidadeVendasMes?: number;
}

export const VendasCards = ({
  vendasDiarias,
  vendasSemanais,
  vendasMensais,
  quantidadeVendasDia = 0,
  quantidadeVendasSemana = 0,
  quantidadeVendasMes = 0,
}: VendasCardsProps) => {
  return (
    <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-3">
      <VendasCard
        title="Total de Vendas do Dia"
        value={vendasDiarias}
        quantidadeVendas={quantidadeVendasDia}
        icon={Calendar}
        iconColor="text-blue-600"
        periodo="hoje"
      />

      <VendasCard
        title="Total de Vendas da Semana"
        value={vendasSemanais}
        quantidadeVendas={quantidadeVendasSemana}
        icon={TrendingUp}
        iconColor="text-purple-600"
        periodo="esta semana"
      />

      <VendasCard
        title="Total de Vendas do Mês"
        value={vendasMensais}
        quantidadeVendas={quantidadeVendasMes}
        icon={BarChart3}
        iconColor="text-orange-600"
        periodo="este mês"
      />
    </div>
  );
};
