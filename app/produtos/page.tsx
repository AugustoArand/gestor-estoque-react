"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { Plus, Search, Filter, Trash2, Edit, Package } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Navbar } from "@/components/navbar";

// Tipagem de Dados dos Produtos
interface Produto {
  id: string;
  nome: string;
  categoria: string;
  preco: number;
  quantidade: number;
  descricao: string;
  dataCriacao: Date;
}

// Uma lista de Categorias Disponíveis
const categorias = [
  "Eletrônicos",
  "Roupas",
  "Casa e Jardim",
  "Esportes",
  "Livros",
  "Alimentação",
  "Beleza",
  "Automóveis",
  "Outros",
];

export default function ProdutosPage() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [busca, setBusca] = useState("");
  const [categoriaFiltro, setCategoriaFiltro] = useState<string>("todas");
  const [dialogAberto, setDialogAberto] = useState(false);
  const [produtoEditando, setProdutoEditando] = useState<Produto | null>(null);

  // Estado do formulário
  const [formData, setFormData] = useState({
    nome: "",
    categoria: "",
    preco: "",
    quantidade: "",
    descricao: "",
  });

  // Carregar produtos do localStorage na inicialização
  useEffect(() => {
    const produtosSalvos = localStorage.getItem("produtos");
    if (produtosSalvos) {
      setProdutos(JSON.parse(produtosSalvos));
    }
  }, []);

  // Salvar produtos no localStorage sempre que a lista mudar
  useEffect(() => {
    localStorage.setItem("produtos", JSON.stringify(produtos));
  }, [produtos]);

  // Filtrar produtos baseado na busca e categoria
  const produtosFiltrados = produtos.filter((produto) => {
    const matchBusca =
      produto.nome.toLowerCase().includes(busca.toLowerCase()) ||
      produto.descricao.toLowerCase().includes(busca.toLowerCase());
    const matchCategoria =
      categoriaFiltro === "todas" || produto.categoria === categoriaFiltro;
    return matchBusca && matchCategoria;
  });

  // Função para gerar ID único
  const gerarId = () => {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
  };

  // Função para salvar produto (criar ou editar)
  const salvarProduto = () => {
    if (
      !formData.nome ||
      !formData.categoria ||
      !formData.preco ||
      !formData.quantidade
    ) {
      alert("Por favor, preencha todos os campos obrigatórios");
      return;
    }

    const novoProduto: Produto = {
      id: produtoEditando?.id || gerarId(),
      nome: formData.nome,
      categoria: formData.categoria,
      preco: parseFloat(formData.preco),
      quantidade: parseInt(formData.quantidade),
      descricao: formData.descricao,
      dataCriacao: produtoEditando?.dataCriacao || new Date(),
    };

    if (produtoEditando) {
      // Editar produto existente
      setProdutos(
        produtos.map((p) => (p.id === produtoEditando.id ? novoProduto : p))
      );
    } else {
      // Criar novo produto
      setProdutos([...produtos, novoProduto]);
    }

    // Limpar formulário e fechar dialog
    setFormData({
      nome: "",
      categoria: "",
      preco: "",
      quantidade: "",
      descricao: "",
    });
    setProdutoEditando(null);
    setDialogAberto(false);
  };

  // Função para deletar produto
  const deletarProduto = (id: string) => {
    if (confirm("Tem certeza que deseja deletar este produto?")) {
      setProdutos(produtos.filter((p) => p.id !== id));
    }
  };

  // Função para editar produto
  const editarProduto = (produto: Produto) => {
    setProdutoEditando(produto);
    setFormData({
      nome: produto.nome,
      categoria: produto.categoria,
      preco: produto.preco.toString(),
      quantidade: produto.quantidade.toString(),
      descricao: produto.descricao,
    });
    setDialogAberto(true);
  };

  // Função para abrir dialog de novo produto
  const novoProduto = () => {
    setProdutoEditando(null);
    setFormData({
      nome: "",
      categoria: "",
      preco: "",
      quantidade: "",
      descricao: "",
    });
    setDialogAberto(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto py-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Gerenciar Produtos
            </h1>
            <p className="text-muted-foreground">
              Cadastre, busque e gerencie seus produtos de estoque
            </p>
          </div>

          <Dialog open={dialogAberto} onOpenChange={setDialogAberto}>
            <DialogTrigger asChild>
              <Button onClick={novoProduto} className="w-full md:w-auto">
                <Plus className="mr-2 h-4 w-4" />
                Novo Produto
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>
                  {produtoEditando
                    ? "Editar Produto"
                    : "Cadastrar Novo Produto"}
                </DialogTitle>
                <DialogDescription>
                  {produtoEditando
                    ? "Edite as informações do produto abaixo."
                    : "Preencha os dados do novo produto abaixo."}
                </DialogDescription>
              </DialogHeader>

              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="nome">Nome do Produto *</Label>
                  <Input
                    id="nome"
                    value={formData.nome}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setFormData({ ...formData, nome: e.target.value })
                    }
                    placeholder="Digite o nome do produto"
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="categoria">Categoria *</Label>
                  <Select
                    value={formData.categoria}
                    onValueChange={(value) =>
                      setFormData({ ...formData, categoria: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      {categorias.map((categoria) => (
                        <SelectItem key={categoria} value={categoria}>
                          {categoria}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="preco">Preço (R$) *</Label>
                    <Input
                      id="preco"
                      type="number"
                      step="0.01"
                      value={formData.preco}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setFormData({ ...formData, preco: e.target.value })
                      }
                      placeholder="0,00"
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="quantidade">Quantidade *</Label>
                    <Input
                      id="quantidade"
                      type="number"
                      value={formData.quantidade}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setFormData({ ...formData, quantidade: e.target.value })
                      }
                      placeholder="0"
                    />
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="descricao">Descrição</Label>
                  <Textarea
                    id="descricao"
                    value={formData.descricao}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                      setFormData({ ...formData, descricao: e.target.value })
                    }
                    placeholder="Descrição opcional do produto"
                    rows={3}
                  />
                </div>
              </div>

              <DialogFooter>
                <Button type="submit" onClick={salvarProduto}>
                  {produtoEditando ? "Salvar Alterações" : "Cadastrar Produto"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Filtros e Busca */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filtros e Busca
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar produtos por nome ou descrição..."
                    value={busca}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setBusca(e.target.value)
                    }
                    className="pl-8"
                  />
                </div>
              </div>

              <Select
                value={categoriaFiltro}
                onValueChange={setCategoriaFiltro}
              >
                <SelectTrigger className="w-full md:w-[200px]">
                  <SelectValue placeholder="Filtrar por categoria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todas">Todas as categorias</SelectItem>
                  {categorias.map((categoria) => (
                    <SelectItem key={categoria} value={categoria}>
                      {categoria}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Lista de Produtos */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">
              Produtos Cadastrados ({produtosFiltrados.length})
            </h2>
          </div>

          {produtosFiltrados.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-16">
                <Package className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">
                  {produtos.length === 0
                    ? "Nenhum produto cadastrado"
                    : "Nenhum produto encontrado"}
                </h3>
                <p className="text-muted-foreground text-center">
                  {produtos.length === 0
                    ? "Comece cadastrando seu primeiro produto clicando no botão 'Novo Produto'."
                    : "Tente ajustar os filtros ou termos de busca."}
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {produtosFiltrados.map((produto) => (
                <Card key={produto.id} className="relative">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <CardTitle className="text-lg">
                          {produto.nome}
                        </CardTitle>
                        <Badge variant="secondary">{produto.categoria}</Badge>
                      </div>
                      <div className="flex space-x-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => editarProduto(produto)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deletarProduto(produto.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">
                          Preço:
                        </span>
                        <span className="font-semibold">
                          R$ {produto.preco.toFixed(2).replace(".", ",")}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">
                          Quantidade:
                        </span>
                        <span
                          className={`font-semibold ${
                            produto.quantidade < 10 ? "text-destructive" : ""
                          }`}
                        >
                          {produto.quantidade} unidades
                        </span>
                      </div>
                      {produto.descricao && (
                        <div className="pt-2">
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {produto.descricao}
                          </p>
                        </div>
                      )}
                      <div className="pt-2 border-t">
                        <span className="text-xs text-muted-foreground">
                          Criado em:{" "}
                          {new Date(produto.dataCriacao).toLocaleDateString(
                            "pt-BR"
                          )}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
