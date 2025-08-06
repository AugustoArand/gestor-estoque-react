import { Cliente } from "@/types";

export const filtrarClientes = (
  clientes: Cliente[],
  busca: string,
  statusFiltro: string
): Cliente[] => {
  return clientes.filter((cliente) => {
    const matchBusca =
      cliente.nome.toLowerCase().includes(busca.toLowerCase()) ||
      cliente.email.toLowerCase().includes(busca.toLowerCase()) ||
      cliente.telefone.includes(busca);
    
    const matchStatus =
      statusFiltro === "todos" ||
      (statusFiltro === "ativo" && cliente.ativo) ||
      (statusFiltro === "inativo" && !cliente.ativo);
    
    return matchBusca && matchStatus;
  });
};

export const calcularEstatisticasClientes = (clientes: Cliente[]) => {
  const total = clientes.length;
  const ativos = clientes.filter(c => c.ativo).length;
  const inativos = clientes.filter(c => !c.ativo).length;

  return {
    total,
    ativos,
    inativos,
  };
};

export const validarEmail = (email: string): boolean => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const validarFormularioCliente = (formData: {
  nome: string;
  email: string;
  telefone: string;
  cidade: string;
  estado: string;
}): { isValid: boolean; message?: string } => {
  if (!formData.nome || !formData.email || !formData.telefone || !formData.cidade || !formData.estado) {
    return {
      isValid: false,
      message: "Por favor, preencha todos os campos obrigatórios"
    };
  }

  if (!validarEmail(formData.email)) {
    return {
      isValid: false,
      message: "Por favor, insira um email válido"
    };
  }

  return { isValid: true };
};
