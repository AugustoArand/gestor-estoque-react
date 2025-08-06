import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { formatCurrency } from "@/utils/vendasCalculations";

interface VendasCardProps {
  title: string;
  value: number;
  quantidadeVendas: number;
  icon: LucideIcon;
  iconColor?: string;
  periodo: string;
}

export const VendasCard = ({
  title,
  value,
  quantidadeVendas,
  icon: Icon,
  iconColor = "text-muted-foreground",
  periodo,
}: VendasCardProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className={`h-4 w-4 ${iconColor}`} />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-green-600">
          {formatCurrency(value)}
        </div>
        <p className="text-xs text-muted-foreground">
          {quantidadeVendas} {quantidadeVendas === 1 ? "venda" : "vendas"}{" "}
          {periodo}
        </p>
      </CardContent>
    </Card>
  );
};
