import { Archive } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { EstatisticasCategoria } from "@/types";

interface CategoryStatsProps {
  categories: EstatisticasCategoria[];
}

export const CategoryStats = ({ categories }: CategoryStatsProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Archive className="h-5 w-5" />
          Produtos por Categoria
        </CardTitle>
      </CardHeader>
      <CardContent>
        {categories.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-4">
            Nenhuma categoria encontrada
          </p>
        ) : (
          <div className="space-y-3">
            {categories
              .sort((a, b) => b.quantidade - a.quantidade)
              .map((categoria) => (
                <div
                  key={categoria.categoria}
                  className="flex items-center justify-between p-3 rounded-lg border"
                >
                  <div className="flex items-center gap-3">
                    <Badge variant="outline">{categoria.categoria}</Badge>
                    <span className="text-sm font-medium">
                      {categoria.quantidade}{" "}
                      {categoria.quantidade === 1 ? "produto" : "produtos"}
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold">
                      {categoria.totalItens}
                    </div>
                    <div className="text-xs text-muted-foreground">itens</div>
                  </div>
                </div>
              ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
