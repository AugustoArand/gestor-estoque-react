import { ShoppingCart } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MovimentacaoEstoque } from "@/types";

interface RecentMovementsProps {
  movements: MovimentacaoEstoque[];
}

export const RecentMovements = ({ movements }: RecentMovementsProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ShoppingCart className="h-5 w-5" />
          Últimas Movimentações
        </CardTitle>
      </CardHeader>
      <CardContent>
        {movements.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-4">
            Nenhuma movimentação encontrada
          </p>
        ) : (
          <div className="space-y-3">
            {movements.map((movimentacao) => (
              <div
                key={movimentacao.id}
                className="flex items-center justify-between p-3 rounded-lg border"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      movimentacao.tipo === "entrada"
                        ? "bg-green-500"
                        : "bg-red-500"
                    }`}
                  />
                  <div>
                    <div className="text-sm font-medium">
                      {movimentacao.produtoNome}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {movimentacao.observacao}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div
                    className={`text-sm font-semibold ${
                      movimentacao.tipo === "entrada"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {movimentacao.tipo === "entrada" ? "+" : "-"}
                    {movimentacao.quantidade}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {new Date(movimentacao.data).toLocaleDateString("pt-BR")}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
