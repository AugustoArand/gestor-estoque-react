import { Produto, MovimentacaoEstoque, EstatisticasCategoria, DashboardStats } from "@/types";

export const calculateDashboardStats = (
  produtos: Produto[],
  movimentacoes: MovimentacaoEstoque[]
): DashboardStats => {
  const totalProdutos = produtos.length;
  const totalItensEstoque = produtos.reduce(
    (acc, produto) => acc + produto.quantidade,
    0
  );

  // Movimentações dos últimos 30 dias
  const dataLimite = new Date();
  dataLimite.setDate(dataLimite.getDate() - 30);

  const movimentacaoEntrada = movimentacoes
    .filter((mov) => mov.tipo === "entrada" && new Date(mov.data) >= dataLimite)
    .reduce((acc, mov) => acc + mov.quantidade, 0);

  const movimentacaoSaida = movimentacoes
    .filter((mov) => mov.tipo === "saida" && new Date(mov.data) >= dataLimite)
    .reduce((acc, mov) => acc + mov.quantidade, 0);

  const saldoLiquido = movimentacaoEntrada - movimentacaoSaida;

  return {
    totalProdutos,
    totalItensEstoque,
    movimentacaoEntrada,
    movimentacaoSaida,
    saldoLiquido,
  };
};

export const calculateCategoryStats = (produtos: Produto[]): EstatisticasCategoria[] => {
  return produtos.reduce((acc, produto) => {
    const categoriaExistente = acc.find(
      (item) => item.categoria === produto.categoria
    );
    if (categoriaExistente) {
      categoriaExistente.quantidade += 1;
      categoriaExistente.totalItens += produto.quantidade;
    } else {
      acc.push({
        categoria: produto.categoria,
        quantidade: 1,
        totalItens: produto.quantidade,
      });
    }
    return acc;
  }, [] as EstatisticasCategoria[]);
};

export const getRecentMovements = (
  movimentacoes: MovimentacaoEstoque[],
  limit: number = 5
): MovimentacaoEstoque[] => {
  return movimentacoes
    .sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime())
    .slice(0, limit);
};
