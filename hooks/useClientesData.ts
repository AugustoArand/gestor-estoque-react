import { useState, useEffect } from "react";
import { Cliente } from "@/types";
import { clientesExemplo } from "@/utils/mockData";

interface UseClientesDataReturn {
  clientes: Cliente[];
  setClientes: (clientes: Cliente[]) => void;
  adicionarCliente: (cliente: Omit<Cliente, "id" | "dataCadastro">) => void;
  editarCliente: (id: string, clienteAtualizado: Omit<Cliente, "id" | "dataCadastro">) => void;
  deletarCliente: (id: string) => void;
  alternarStatusCliente: (id: string) => void;
}

export const useClientesData = (): UseClientesDataReturn => {
  const [clientes, setClientes] = useState<Cliente[]>([]);

  useEffect(() => {
    // Carregar clientes do localStorage
    const clientesSalvos = localStorage.getItem("clientes");
    if (clientesSalvos) {
      setClientes(JSON.parse(clientesSalvos));
    } else {
      // Se não existir, usar dados de exemplo
      setClientes(clientesExemplo);
      localStorage.setItem("clientes", JSON.stringify(clientesExemplo));
    }
  }, []);

  // Salvar no localStorage sempre que a lista mudar
  useEffect(() => {
    if (clientes.length > 0) {
      localStorage.setItem("clientes", JSON.stringify(clientes));
    }
  }, [clientes]);

  // Função para gerar ID único
  const gerarId = () => {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
  };

  const adicionarCliente = (clienteData: Omit<Cliente, "id" | "dataCadastro">) => {
    const novoCliente: Cliente = {
      ...clienteData,
      id: gerarId(),
      dataCadastro: new Date(),
    };
    setClientes(prev => [...prev, novoCliente]);
  };

  const editarCliente = (id: string, clienteAtualizado: Omit<Cliente, "id" | "dataCadastro">) => {
    setClientes(prev => 
      prev.map(cliente => 
        cliente.id === id 
          ? { ...clienteAtualizado, id, dataCadastro: cliente.dataCadastro }
          : cliente
      )
    );
  };

  const deletarCliente = (id: string) => {
    if (confirm("Tem certeza que deseja deletar este cliente?")) {
      setClientes(prev => prev.filter(cliente => cliente.id !== id));
    }
  };

  const alternarStatusCliente = (id: string) => {
    setClientes(prev =>
      prev.map(cliente =>
        cliente.id === id ? { ...cliente, ativo: !cliente.ativo } : cliente
      )
    );
  };

  return {
    clientes,
    setClientes,
    adicionarCliente,
    editarCliente,
    deletarCliente,
    alternarStatusCliente,
  };
};
