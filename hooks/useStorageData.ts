import { useState, useEffect } from "react";
import { Produto, MovimentacaoEstoque } from "@/types";
import { movimentacoesExemplo } from "@/utils/mockData";

interface UseStorageDataReturn {
  produtos: Produto[];
  movimentacoes: MovimentacaoEstoque[];
  setProdutos: (produtos: Produto[]) => void;
  setMovimentacoes: (movimentacoes: MovimentacaoEstoque[]) => void;
}

export const useStorageData = (): UseStorageDataReturn => {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [movimentacoes, setMovimentacoes] = useState<MovimentacaoEstoque[]>([]);

  useEffect(() => {
    // Carregar produtos do localStorage
    const produtosSalvos = localStorage.getItem("produtos");
    if (produtosSalvos) {
      setProdutos(JSON.parse(produtosSalvos));
    }

    // Carregar movimentações do localStorage
    const movimentacoesSalvas = localStorage.getItem("movimentacoes");
    if (movimentacoesSalvas) {
      setMovimentacoes(JSON.parse(movimentacoesSalvas));
    } else {
      // Se não existir, usar dados de exemplo
      setMovimentacoes(movimentacoesExemplo);
      localStorage.setItem("movimentacoes", JSON.stringify(movimentacoesExemplo));
    }
  }, []);

  return {
    produtos,
    movimentacoes,
    setProdutos,
    setMovimentacoes,
  };
};
