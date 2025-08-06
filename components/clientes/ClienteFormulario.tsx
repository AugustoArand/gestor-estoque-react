import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ESTADOS_BRASILEIROS } from "@/utils/clientesConstants";

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

interface ClienteFormularioProps {
  formData: ClienteFormData;
  onFormDataChange: (data: ClienteFormData) => void;
}

export const ClienteFormulario = ({
  formData,
  onFormDataChange,
}: ClienteFormularioProps) => {
  const updateField = (
    field: keyof ClienteFormData,
    value: string | boolean
  ) => {
    onFormDataChange({
      ...formData,
      [field]: value,
    });
  };

  return (
    <div className="grid gap-4 py-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="nome">Nome *</Label>
          <Input
            id="nome"
            value={formData.nome}
            onChange={(e) => updateField("nome", e.target.value)}
            placeholder="Nome completo"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => updateField("email", e.target.value)}
            placeholder="email@exemplo.com"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="telefone">Telefone *</Label>
          <Input
            id="telefone"
            value={formData.telefone}
            onChange={(e) => updateField("telefone", e.target.value)}
            placeholder="(11) 99999-9999"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="cep">CEP</Label>
          <Input
            id="cep"
            value={formData.cep}
            onChange={(e) => updateField("cep", e.target.value)}
            placeholder="12345-678"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="endereco">Endereço</Label>
        <Input
          id="endereco"
          value={formData.endereco}
          onChange={(e) => updateField("endereco", e.target.value)}
          placeholder="Rua, número, complemento"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="cidade">Cidade *</Label>
          <Input
            id="cidade"
            value={formData.cidade}
            onChange={(e) => updateField("cidade", e.target.value)}
            placeholder="Nome da cidade"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="estado">Estado *</Label>
          <Select
            value={formData.estado}
            onValueChange={(value) => updateField("estado", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecione o estado" />
            </SelectTrigger>
            <SelectContent>
              {ESTADOS_BRASILEIROS.map((estado) => (
                <SelectItem key={estado} value={estado}>
                  {estado}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="ativo"
          checked={formData.ativo}
          onChange={(e) => updateField("ativo", e.target.checked)}
          className="rounded border-gray-300"
        />
        <Label htmlFor="ativo">Cliente ativo</Label>
      </div>
    </div>
  );
};
