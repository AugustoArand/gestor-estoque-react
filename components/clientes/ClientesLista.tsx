import { Plus, Trash2, Edit, Users, UserCheck, UserX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Cliente } from "@/types";

interface ClientesListaProps {
  clientes: Cliente[];
  onEditarCliente: (cliente: Cliente) => void;
  onDeletarCliente: (id: string) => void;
  onAlternarStatus: (id: string) => void;
  onNovoCliente: () => void;
  busca: string;
  statusFiltro: string;
}

export const ClientesLista = ({
  clientes,
  onEditarCliente,
  onDeletarCliente,
  onAlternarStatus,
  onNovoCliente,
  busca,
  statusFiltro,
}: ClientesListaProps) => {
  if (clientes.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-center py-12">
            <Users className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">
              Nenhum cliente encontrado
            </h3>
            <p className="text-muted-foreground mb-4">
              {busca || statusFiltro !== "todos"
                ? "Tente ajustar os filtros de busca."
                : "Comece cadastrando seu primeiro cliente."}
            </p>
            {!busca && statusFiltro === "todos" && (
              <Button onClick={onNovoCliente}>
                <Plus className="mr-2 h-4 w-4" />
                Cadastrar Primeiro Cliente
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid gap-4">
      {clientes.map((cliente) => (
        <Card key={cliente.id}>
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-semibold">{cliente.nome}</h3>
                  <Badge variant={cliente.ativo ? "default" : "secondary"}>
                    {cliente.ativo ? "Ativo" : "Inativo"}
                  </Badge>
                </div>

                <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3">
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="text-sm font-medium">{cliente.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Telefone</p>
                    <p className="text-sm font-medium">{cliente.telefone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Cidade</p>
                    <p className="text-sm font-medium">
                      {cliente.cidade}, {cliente.estado}
                    </p>
                  </div>
                  {cliente.endereco && (
                    <div className="md:col-span-2 lg:col-span-3">
                      <p className="text-sm text-muted-foreground">Endereço</p>
                      <p className="text-sm font-medium">
                        {cliente.endereco}
                        {cliente.cep && ` - CEP: ${cliente.cep}`}
                      </p>
                    </div>
                  )}
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Cadastrado em
                    </p>
                    <p className="text-sm font-medium">
                      {new Date(cliente.dataCadastro).toLocaleDateString(
                        "pt-BR"
                      )}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 ml-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onAlternarStatus(cliente.id)}
                  title={cliente.ativo ? "Desativar cliente" : "Ativar cliente"}
                >
                  {cliente.ativo ? (
                    <UserX className="h-4 w-4" />
                  ) : (
                    <UserCheck className="h-4 w-4" />
                  )}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onEditarCliente(cliente)}
                  title="Editar cliente"
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => onDeletarCliente(cliente.id)}
                  title="Deletar cliente"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
