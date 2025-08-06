import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DashboardStats, EstatisticasCategoria } from "@/types";

interface QuickSummaryProps {
  stats: DashboardStats;
  categories: EstatisticasCategoria[];
}

export const QuickSummary = ({ stats, categories }: QuickSummaryProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Resumo Rápido</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="text-center p-4 rounded-lg bg-muted/50">
            <div className="text-2xl font-bold">{stats.totalProdutos}</div>
            <div className="text-sm text-muted-foreground">Produtos Únicos</div>
          </div>
          <div className="text-center p-4 rounded-lg bg-muted/50">
            <div className="text-2xl font-bold">{stats.totalItensEstoque}</div>
            <div className="text-sm text-muted-foreground">Total de Itens</div>
          </div>
          <div className="text-center p-4 rounded-lg bg-muted/50">
            <div className="text-2xl font-bold">{categories.length}</div>
            <div className="text-sm text-muted-foreground">
              Categorias Ativas
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
