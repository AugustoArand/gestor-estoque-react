"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/navbar";
import { Cliente } from "@/types";
import { ClientesStats } from "@/components/clientes/ClientesStats";
import { ClientesFiltros } from "@/components/clientes/ClientesFiltros";
import { ClientesLista } from "@/components/clientes/ClientesLista";
import { ClienteModal } from "@/components/clientes/ClienteModal";
import { useClientesData } from "@/hooks/useClientesData";
import {
  filtrarClientes,
  calcularEstatisticasClientes,
  validarFormularioCliente,
} from "@/utils/clientesUtils";
import { FORM_CLIENTE_INICIAL } from "@/utils/clientesConstants";

export default function ClientesPage() {
  const {
    clientes,
    adicionarCliente,
    editarCliente,
    deletarCliente,
    alternarStatusCliente,
  } = useClientesData();

  const [busca, setBusca] = useState("");
  const [statusFiltro, setStatusFiltro] = useState<string>("todos");
  const [dialogAberto, setDialogAberto] = useState(false);
  const [clienteEditando, setClienteEditando] = useState<Cliente | null>(null);
  const [formData, setFormData] = useState(FORM_CLIENTE_INICIAL);

  // Filtrar clientes
  const clientesFiltrados = filtrarClientes(clientes, busca, statusFiltro);

  // Calcular estatísticas
  const stats = calcularEstatisticasClientes(clientes);

  // Função para salvar cliente (criar ou editar)
  const salvarCliente = () => {
    const validacao = validarFormularioCliente(formData);

    if (!validacao.isValid) {
      alert(validacao.message);
      return;
    }

    if (clienteEditando) {
      editarCliente(clienteEditando.id, formData);
    } else {
      adicionarCliente(formData);
    }

    // Limpar formulário e fechar dialog
    setFormData(FORM_CLIENTE_INICIAL);
    setClienteEditando(null);
    setDialogAberto(false);
  };

  // Função para editar cliente
  const handleEditarCliente = (cliente: Cliente) => {
    setClienteEditando(cliente);
    setFormData({
      nome: cliente.nome,
      email: cliente.email,
      telefone: cliente.telefone,
      endereco: cliente.endereco,
      cidade: cliente.cidade,
      estado: cliente.estado,
      cep: cliente.cep,
      ativo: cliente.ativo,
    });
    setDialogAberto(true);
  };

  // Função para abrir dialog para novo cliente
  const novoCliente = () => {
    setClienteEditando(null);
    setFormData(FORM_CLIENTE_INICIAL);
    setDialogAberto(true);
  };

  const fecharModal = () => {
    setDialogAberto(false);
    setClienteEditando(null);
    setFormData(FORM_CLIENTE_INICIAL);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto py-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Clientes</h1>
            <p className="text-muted-foreground">
              Gerencie seus clientes e informações de contato
            </p>
          </div>

          <Button onClick={novoCliente}>
            <Plus className="mr-2 h-4 w-4" />
            Novo Cliente
          </Button>
        </div>

        {/* Filtros */}
        <ClientesFiltros
          busca={busca}
          statusFiltro={statusFiltro}
          onBuscaChange={setBusca}
          onStatusChange={setStatusFiltro}
        />

        {/* Estatísticas */}
        <ClientesStats
          total={stats.total}
          ativos={stats.ativos}
          inativos={stats.inativos}
        />

        {/* Lista de Clientes */}
        <ClientesLista
          clientes={clientesFiltrados}
          onEditarCliente={handleEditarCliente}
          onDeletarCliente={deletarCliente}
          onAlternarStatus={alternarStatusCliente}
          onNovoCliente={novoCliente}
          busca={busca}
          statusFiltro={statusFiltro}
        />

        {/* Modal de Cliente */}
        <ClienteModal
          isOpen={dialogAberto}
          onClose={fecharModal}
          onSave={salvarCliente}
          clienteEditando={clienteEditando}
          formData={formData}
          onFormDataChange={setFormData}
        />
      </div>
    </div>
  );
}
