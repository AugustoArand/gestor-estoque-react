"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import {
  Package,
  TrendingUp,
  TrendingDown,
  BarChart3,
  ShoppingCart,
  Archive,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Navbar } from "@/components/navbar";

// TIPAGEM DOS DADOS DO PRODUTO
interface Produto {
  id: string;
  nome: string;
  categoria: string;
  preco: number;
  quantidade: number;
  descricao: string;
  dataCriacao: Date;
}
// TIPAGEM DOS DADOS DE MOVIMENTAÇÇA
interface MovimentacaoEstoque {
  id: string;
  produtoId: string;
  produtoNome: string;
  tipo: "entrada" | "saida";
  quantidade: number;
  data: Date;
  observacao?: string;
}

interface EstatisticasCategoria {
  categoria: string;
  quantidade: number;
  totalItens: number;
}

export default function DashboardPage() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [movimentacoes, setMovimentacoes] = useState<MovimentacaoEstoque[]>([]);

  // Carregar dados do localStorage
  useEffect(() => {
    const produtosSalvos = localStorage.getItem("produtos");
    if (produtosSalvos) {
      setProdutos(JSON.parse(produtosSalvos));
    }

    const movimentacoesSalvas = localStorage.getItem("movimentacoes");
    if (movimentacoesSalvas) {
      setMovimentacoes(JSON.parse(movimentacoesSalvas));
    } else {
      // Dados de exemplo para movimentações
      const movimentacoesExemplo: MovimentacaoEstoque[] = [
        {
          id: "1",
          produtoId: "1",
          produtoNome: "Smartphone Samsung Galaxy S24",
          tipo: "entrada",
          quantidade: 10,
          data: new Date("2024-02-01"),
          observacao: "Reposição de estoque",
        },
        {
          id: "2",
          produtoId: "2",
          produtoNome: "Camiseta Polo Básica",
          tipo: "entrada",
          quantidade: 25,
          data: new Date("2024-02-02"),
          observacao: "Nova coleção",
        },
        {
          id: "3",
          produtoId: "1",
          produtoNome: "Smartphone Samsung Galaxy S24",
          tipo: "saida",
          quantidade: 3,
          data: new Date("2024-02-05"),
          observacao: "Venda",
        },
        {
          id: "4",
          produtoId: "3",
          produtoNome: "Cafeteira Elétrica Premium",
          tipo: "entrada",
          quantidade: 5,
          data: new Date("2024-02-08"),
          observacao: "Reposição",
        },
        {
          id: "5",
          produtoId: "2",
          produtoNome: "Camiseta Polo Básica",
          tipo: "saida",
          quantidade: 8,
          data: new Date("2024-02-10"),
          observacao: "Venda",
        },
        {
          id: "6",
          produtoId: "4",
          produtoNome: "Tênis de Corrida Nike",
          tipo: "saida",
          quantidade: 2,
          data: new Date("2024-02-12"),
          observacao: "Venda",
        },
      ];
      setMovimentacoes(movimentacoesExemplo);
      localStorage.setItem(
        "movimentacoes",
        JSON.stringify(movimentacoesExemplo)
      );
    }
  }, []);

  // Calcular estatísticas
  const totalProdutos = produtos.length;
  const totalItensEstoque = produtos.reduce(
    (acc, produto) => acc + produto.quantidade,
    0
  );

  // Estatísticas por categoria
  const estatisticasCategorias: EstatisticasCategoria[] = produtos.reduce(
    (acc, produto) => {
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
    },
    [] as EstatisticasCategoria[]
  );

  // Movimentações de entrada e saída dos últimos 30 dias
  const dataLimite = new Date();
  dataLimite.setDate(dataLimite.getDate() - 30);

  // ARRAY METHOD - FILTRA O TIPO ENTRADA E DENTRO DA DATA LIMITE
  const movimentacaoEntrada = movimentacoes
    .filter((mov) => mov.tipo === "entrada" && new Date(mov.data) >= dataLimite)
    .reduce((acc, mov) => acc + mov.quantidade, 0);

  // ARRAY METHOD - FILTRA O TIPO SAIDA E DENTRO DA DATA LIMITE
  const movimentacaoSaida = movimentacoes
    .filter((mov) => mov.tipo === "saida" && new Date(mov.data) >= dataLimite)
    .reduce((acc, mov) => acc + mov.quantidade, 0);

  // Últimas movimentações (5 mais recentes)
  const ultimasMovimentacoes = movimentacoes
    .sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime())
    .slice(0, 5);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto py-6 space-y-6">
        {/* REGIÃO DO TEXTO DASHBOARD */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight"> Dashboard </h1>
          <p className="text-muted-foreground">
            Visão geral do seu estoque e movimentações
          </p>
        </div>

        {/* DIV DOS QUADRO CARDS HORIZONTAIS */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {/* CARD 01 - TOTAL PRODUTOS */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total de Produtos
              </CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalProdutos}</div>
              <p className="text-xs text-muted-foreground">
                {totalItensEstoque} itens em estoque
              </p>
            </CardContent>
          </Card>

          {/* CARD 02 - ENTRADAS */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Entradas (30 dias)
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {movimentacaoEntrada}
              </div>
              <p className="text-xs text-muted-foreground">Entradas</p>
            </CardContent>
          </Card>

          {/* CARD 03 - SAIDAS */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Saídas (30 dias)
              </CardTitle>
              <TrendingDown className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">
                {movimentacaoSaida}
              </div>
              <p className="text-xs text-muted-foreground">Saídas</p>
            </CardContent>
          </Card>

          {/* CARD 04 - SALDO LÍQUIDO */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Saldo Líquido
              </CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div
                className={`text-2xl font-bold ${
                  movimentacaoEntrada - movimentacaoSaida >= 0
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {movimentacaoEntrada - movimentacaoSaida > 0 ? "+" : ""}
                {movimentacaoEntrada - movimentacaoSaida}
              </div>
              <p className="text-xs text-muted-foreground">
                Diferença entrada/saída
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Cards de Categorias e Movimentações */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Estatísticas por Categoria */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Archive className="h-5 w-5" />
                Produtos por Categoria
              </CardTitle>
            </CardHeader>
            <CardContent>
              {estatisticasCategorias.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-4">
                  Nenhuma categoria encontrada
                </p>
              ) : (
                <div className="space-y-3">
                  {estatisticasCategorias
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
                            {categoria.quantidade === 1
                              ? "produto"
                              : "produtos"}
                          </span>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-semibold">
                            {categoria.totalItens}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            itens
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Últimas Movimentações */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingCart className="h-5 w-5" />
                Últimas Movimentações
              </CardTitle>
            </CardHeader>
            <CardContent>
              {ultimasMovimentacoes.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-4">
                  Nenhuma movimentação encontrada
                </p>
              ) : (
                <div className="space-y-3">
                  {ultimasMovimentacoes.map((movimentacao) => (
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
                          {new Date(movimentacao.data).toLocaleDateString(
                            "pt-BR"
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Resumo Rápido */}
        <Card>
          <CardHeader>
            <CardTitle>Resumo Rápido</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="text-center p-4 rounded-lg bg-muted/50">
                <div className="text-2xl font-bold">{totalProdutos}</div>
                <div className="text-sm text-muted-foreground">
                  Produtos Únicos
                </div>
              </div>
              <div className="text-center p-4 rounded-lg bg-muted/50">
                <div className="text-2xl font-bold">{totalItensEstoque}</div>
                <div className="text-sm text-muted-foreground">
                  Total de Itens
                </div>
              </div>
              <div className="text-center p-4 rounded-lg bg-muted/50">
                <div className="text-2xl font-bold">
                  {estatisticasCategorias.length}
                </div>
                <div className="text-sm text-muted-foreground">
                  Categorias Ativas
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
