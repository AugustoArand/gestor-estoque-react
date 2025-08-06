import { useState, useEffect } from "react";
import { Venda, VendasStats } from "@/types";
import { vendasExemplo } from "@/utils/mockData";
import { calculateVendasStats } from "@/utils/vendasCalculations";

interface UseVendasDataReturn {
  vendas: Venda[];
  vendasDiarias: VendasStats["totalVendasDia"];
  vendasSemanais: VendasStats["totalVendasSemana"];
  vendasMensais: VendasStats["totalVendasMes"];
  quantidadeVendasDia: VendasStats["quantidadeVendasDia"];
  quantidadeVendasSemana: VendasStats["quantidadeVendasSemana"];
  quantidadeVendasMes: VendasStats["quantidadeVendasMes"];
  setVendas: (vendas: Venda[]) => void;
}

export const useVendasData = (): UseVendasDataReturn => {
  const [vendas, setVendas] = useState<Venda[]>([]);

  useEffect(() => {
    // Carregar vendas do localStorage
    const vendasSalvas = localStorage.getItem("vendas");
    if (vendasSalvas) {
      setVendas(JSON.parse(vendasSalvas));
    } else {
      // Se não existir, usar dados de exemplo
      setVendas(vendasExemplo);
      localStorage.setItem("vendas", JSON.stringify(vendasExemplo));
    }
  }, []);

  const stats = calculateVendasStats(vendas);

  return {
    vendas,
    vendasDiarias: stats.totalVendasDia,
    vendasSemanais: stats.totalVendasSemana,
    vendasMensais: stats.totalVendasMes,
    quantidadeVendasDia: stats.quantidadeVendasDia,
    quantidadeVendasSemana: stats.quantidadeVendasSemana,
    quantidadeVendasMes: stats.quantidadeVendasMes,
    setVendas,
  };
};
