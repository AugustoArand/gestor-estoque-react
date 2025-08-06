import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ClienteFormulario } from "./ClienteFormulario";
import { Cliente } from "@/types";

interface ClienteFormData {
  nome: string;
  email: string;
  telefone: string;
  endereco: string;
  cidade: string;
  estado: string;
  cep: string;
  ativo: boolean;
}

interface ClienteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  clienteEditando: Cliente | null;
  formData: ClienteFormData;
  onFormDataChange: (data: ClienteFormData) => void;
}

export const ClienteModal = ({
  isOpen,
  onClose,
  onSave,
  clienteEditando,
  formData,
  onFormDataChange,
}: ClienteModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {clienteEditando ? "Editar Cliente" : "Novo Cliente"}
          </DialogTitle>
          <DialogDescription>
            {clienteEditando
              ? "Edite as informações do cliente."
              : "Adicione um novo cliente ao sistema."}
          </DialogDescription>
        </DialogHeader>

        <ClienteFormulario
          formData={formData}
          onFormDataChange={onFormDataChange}
        />

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={onSave}>
            {clienteEditando ? "Salvar Alterações" : "Criar Cliente"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
