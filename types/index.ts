// TIPAGEM DOS DADOS DO PRODUTO
export interface Produto {
  id: string;
  nome: string;
  categoria: string;
  preco: number;
  quantidade: number;
  descricao: string;
  dataCriacao: Date;
}

// TIPAGEM DOS DADOS DE MOVIMENTAÇÃO
export interface MovimentacaoEstoque {
  id: string;
  produtoId: string;
  produtoNome: string;
  tipo: "entrada" | "saida";
  quantidade: number;
  data: Date;
  observacao?: string;
}

export interface EstatisticasCategoria {
  categoria: string;
  quantidade: number;
  totalItens: number;
}

export interface DashboardStats {
  totalProdutos: number;
  totalItensEstoque: number;
  movimentacaoEntrada: number;
  movimentacaoSaida: number;
  saldoLiquido: number;
}

// TIPAGEM DOS DADOS DE VENDAS
export interface Venda {
  id: string;
  produtoId: string;
  produtoNome: string;
  quantidade: number;
  precoUnitario: number;
  precoTotal: number;
  data: Date;
  cliente?: string;
}

export interface VendasStats {
  totalVendasDia: number;
  totalVendasSemana: number;
  totalVendasMes: number;
  quantidadeVendasDia: number;
  quantidadeVendasSemana: number;
  quantidadeVendasMes: number;
}

// TIPAGEM DOS DADOS DE CLIENTES
export interface Cliente {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  endereco: string;
  cidade: string;
  estado: string;
  cep: string;
  dataCadastro: Date;
  ativo: boolean;
}
