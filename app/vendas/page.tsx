"use client";

import { Navbar } from "@/components/navbar";
import { VendasCards } from "@/components/vendas/VendasCards";
import { useVendasData } from "@/hooks/useVendasData";

export default function VendasPage() {
  // Usar hook customizado para dados de vendas
  const {
    vendasDiarias,
    vendasSemanais,
    vendasMensais,
    quantidadeVendasDia,
    quantidadeVendasSemana,
    quantidadeVendasMes,
  } = useVendasData();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto py-6 space-y-6">
        {/* REGIÃO DO TEXTO VENDAS */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Vendas</h1>
          <p className="text-muted-foreground">
            Acompanhe o desempenho das suas vendas
          </p>
        </div>

        {/* Cards principais de vendas */}
        <VendasCards
          vendasDiarias={vendasDiarias}
          vendasSemanais={vendasSemanais}
          vendasMensais={vendasMensais}
          quantidadeVendasDia={quantidadeVendasDia}
          quantidadeVendasSemana={quantidadeVendasSemana}
          quantidadeVendasMes={quantidadeVendasMes}
        />
      </div>
    </div>
  );
}
