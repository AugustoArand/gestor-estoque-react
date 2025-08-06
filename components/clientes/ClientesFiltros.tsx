import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { STATUS_FILTRO_OPTIONS } from "@/utils/clientesConstants";

interface ClientesFiltrosProps {
  busca: string;
  statusFiltro: string;
  onBuscaChange: (busca: string) => void;
  onStatusChange: (status: string) => void;
}

export const ClientesFiltros = ({
  busca,
  statusFiltro,
  onBuscaChange,
  onStatusChange,
}: ClientesFiltrosProps) => {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center">
      <div className="flex-1">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar por nome, email ou telefone..."
            value={busca}
            onChange={(e) => onBuscaChange(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <Select value={statusFiltro} onValueChange={onStatusChange}>
        <SelectTrigger className="w-full md:w-[180px]">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          {STATUS_FILTRO_OPTIONS.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
