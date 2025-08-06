import { Venda, VendasStats } from "@/types";

export const calculateVendasStats = (vendas: Venda[]): VendasStats => {
  const hoje = new Date();
  const inicioHoje = new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate());
  
  // Início da semana (domingo)
  const inicioSemana = new Date(hoje);
  inicioSemana.setDate(hoje.getDate() - hoje.getDay());
  inicioSemana.setHours(0, 0, 0, 0);
  
  // Início do mês
  const inicioMes = new Date(hoje.getFullYear(), hoje.getMonth(), 1);

  // Vendas do dia
  const vendasDia = vendas.filter(venda => new Date(venda.data) >= inicioHoje);
  const totalVendasDia = vendasDia.reduce((acc, venda) => acc + venda.precoTotal, 0);
  const quantidadeVendasDia = vendasDia.length;

  // Vendas da semana
  const vendasSemana = vendas.filter(venda => new Date(venda.data) >= inicioSemana);
  const totalVendasSemana = vendasSemana.reduce((acc, venda) => acc + venda.precoTotal, 0);
  const quantidadeVendasSemana = vendasSemana.length;

  // Vendas do mês
  const vendasMes = vendas.filter(venda => new Date(venda.data) >= inicioMes);
  const totalVendasMes = vendasMes.reduce((acc, venda) => acc + venda.precoTotal, 0);
  const quantidadeVendasMes = vendasMes.length;

  return {
    totalVendasDia,
    totalVendasSemana,
    totalVendasMes,
    quantidadeVendasDia,
    quantidadeVendasSemana,
    quantidadeVendasMes,
  };
};

export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);
};
