
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Info, Save } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/components/ui/use-toast";

interface ModelType {
  id: string;
  name: string;
  costPerToken: number;
  isAvailable: boolean;
  requiredPlan: "free" | "basic" | "pro" | "enterprise";
}

interface TemperaturePresetType {
  id: string;
  segment: string;
  value: number;
  description: string;
}

export function GlobalSettings() {
  const { toast } = useToast();
  
  // Dados de exemplo
  const [models, setModels] = useState<ModelType[]>([
    {
      id: "1",
      name: "GPT-4o",
      costPerToken: 0.00002,
      isAvailable: true,
      requiredPlan: "pro"
    },
    {
      id: "2",
      name: "GPT-3.5-turbo",
      costPerToken: 0.000005,
      isAvailable: true,
      requiredPlan: "basic"
    },
    {
      id: "3",
      name: "Claude 3 Opus",
      costPerToken: 0.00003,
      isAvailable: true,
      requiredPlan: "enterprise"
    },
    {
      id: "4",
      name: "LLama 3 70b",
      costPerToken: 0.000008,
      isAvailable: false,
      requiredPlan: "pro"
    }
  ]);
  
  const [temperaturePresets, setTemperaturePresets] = useState<TemperaturePresetType[]>([
    {
      id: "1",
      segment: "Financeiro",
      value: 0.3,
      description: "Mais conservador e preciso para informações sensíveis"
    },
    {
      id: "2",
      segment: "Vendas",
      value: 0.7,
      description: "Mais criativo para engajar clientes"
    },
    {
      id: "3",
      segment: "Suporte",
      value: 0.5,
      description: "Balanceado entre precisão e comunicação natural"
    }
  ]);
  
  const [maxContextSize, setMaxContextSize] = useState("8000");
  const [uploadsPerUser, setUploadsPerUser] = useState("5");
  const [fallbackRule, setFallbackRule] = useState("Se o agente não souber responder, deve dizer: 'Não tenho essa informação no momento. Gostaria que eu consultasse um especialista humano para te ajudar?'");
  
  // Gerenciamento de modelos
  const [newModelName, setNewModelName] = useState("");
  const [newModelCost, setNewModelCost] = useState("");
  const [newModelPlan, setNewModelPlan] = useState("basic");
  
  const [editingTemperature, setEditingTemperature] = useState<TemperaturePresetType | null>(null);
  
  const handleToggleModel = (id: string) => {
    setModels(models.map(model => 
      model.id === id ? { ...model, isAvailable: !model.isAvailable } : model
    ));
  };
  
  const handleAddModel = () => {
    if (newModelName && newModelCost) {
      const newModel = {
        id: Date.now().toString(),
        name: newModelName,
        costPerToken: parseFloat(newModelCost),
        isAvailable: true,
        requiredPlan: newModelPlan as "free" | "basic" | "pro" | "enterprise"
      };
      
      setModels([...models, newModel]);
      setNewModelName("");
      setNewModelCost("");
      setNewModelPlan("basic");
    }
  };
  
  const handleUpdateTemperature = (id: string, newValue: number) => {
    setTemperaturePresets(temperaturePresets.map(preset => 
      preset.id === id ? { ...preset, value: newValue } : preset
    ));
  };
  
  const handleSaveSettings = () => {
    // Simulação de salvamento
    toast({
      title: "Configurações salvas",
      description: "As configurações globais foram atualizadas com sucesso.",
      duration: 3000,
    });
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold">Configurações Globais</h2>
        <p className="text-sm text-aiGray">Defina parâmetros padrão para todos os agentes da plataforma</p>
      </div>
      
      {/* Modelos de IA */}
      <Card className="bg-aiDark-lighter border-white/5">
        <CardHeader>
          <CardTitle className="text-lg">Modelos de IA Disponíveis</CardTitle>
          <CardDescription>Controle quais modelos estão disponíveis e para quais planos</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4">
            {models.map((model) => (
              <div key={model.id} className="flex items-center justify-between p-3 border border-white/10 rounded-md bg-black/20">
                <div>
                  <div className="font-medium">{model.name}</div>
                  <div className="text-xs text-aiGray">
                    {model.costPerToken.toFixed(6)} USD/token • Plano {model.requiredPlan}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={model.isAvailable}
                    onCheckedChange={() => handleToggleModel(model.id)}
                  />
                  <span className={`text-xs ${model.isAvailable ? "text-green-400" : "text-aiGray"}`}>
                    {model.isAvailable ? "Disponível" : "Indisponível"}
                  </span>
                </div>
              </div>
            ))}
          </div>
          
          <div className="pt-4 border-t border-white/10">
            <h3 className="text-sm font-medium mb-3">Adicionar Novo Modelo</h3>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <Label htmlFor="modelName">Nome do Modelo</Label>
                <Input 
                  id="modelName" 
                  className="ai-input mt-1" 
                  value={newModelName}
                  onChange={(e) => setNewModelName(e.target.value)}
                  placeholder="Ex: GPT-4"
                />
              </div>
              <div>
                <Label htmlFor="modelCost">Custo por Token (USD)</Label>
                <Input 
                  id="modelCost" 
                  className="ai-input mt-1" 
                  value={newModelCost}
                  onChange={(e) => setNewModelCost(e.target.value)}
                  placeholder="Ex: 0.00002"
                  type="number"
                  step="0.000001"
                />
              </div>
              <div>
                <Label htmlFor="modelPlan">Plano Mínimo</Label>
                <Select value={newModelPlan} onValueChange={setNewModelPlan}>
                  <SelectTrigger className="ai-input mt-1">
                    <SelectValue placeholder="Selecione o plano" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="free">Free</SelectItem>
                    <SelectItem value="basic">Basic</SelectItem>
                    <SelectItem value="pro">Pro</SelectItem>
                    <SelectItem value="enterprise">Enterprise</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button className="ai-button-outline mt-3" onClick={handleAddModel}>
              Adicionar Modelo
            </Button>
          </div>
        </CardContent>
      </Card>
      
      {/* Temperaturas padrão */}
      <Card className="bg-aiDark-lighter border-white/5">
        <CardHeader>
          <CardTitle className="text-lg">Temperaturas Padrão por Segmento</CardTitle>
          <CardDescription>Configure valores de temperatura recomendados para diferentes tipos de negócio</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {temperaturePresets.map((preset) => (
            <div key={preset.id} className="space-y-3 pb-4 border-b border-white/10 last:border-0">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium">{preset.segment}</h3>
                  <p className="text-xs text-aiGray">{preset.description}</p>
                </div>
                <div className="text-aiBlue font-medium">{preset.value.toFixed(1)}</div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-xs">0.2</span>
                <Slider
                  defaultValue={[preset.value]}
                  max={1}
                  min={0.2}
                  step={0.1}
                  className="flex-1"
                  onValueChange={(value) => handleUpdateTemperature(preset.id, value[0])}
                />
                <span className="text-xs">1.0</span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
      
      {/* Outras configurações */}
      <Card className="bg-aiDark-lighter border-white/5">
        <CardHeader>
          <CardTitle className="text-lg">Outras Configurações</CardTitle>
          <CardDescription>Defina limites e comportamentos globais</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label htmlFor="contextSize">Tamanho Máximo de Contexto (tokens)</Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="w-4 h-4 text-aiGray" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="w-80">Define o número máximo de tokens que o contexto pode ter. Um contexto maior permite mais informações, mas aumenta o custo.</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Input
                id="contextSize"
                className="ai-input"
                value={maxContextSize}
                onChange={(e) => setMaxContextSize(e.target.value)}
                type="number"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label htmlFor="uploadsLimit">Limite de Uploads por Usuário</Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="w-4 h-4 text-aiGray" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Limite máximo de arquivos que um usuário pode enviar para treinar seu agente.</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Input
                id="uploadsLimit"
                className="ai-input"
                value={uploadsPerUser}
                onChange={(e) => setUploadsPerUser(e.target.value)}
                type="number"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Label htmlFor="fallbackRule">Regra de Fallback Global</Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="w-4 h-4 text-aiGray" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="w-80">Define como o agente deve responder quando não souber a resposta. Esta regra se aplica a todos os agentes, a menos que seja sobrescrita.</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <Textarea
              id="fallbackRule"
              className="ai-input min-h-24"
              value={fallbackRule}
              onChange={(e) => setFallbackRule(e.target.value)}
              placeholder="Defina o comportamento quando o agente não souber responder..."
            />
          </div>
          
          <div className="flex justify-end">
            <Button className="ai-button" onClick={handleSaveSettings}>
              <Save className="w-4 h-4 mr-2" />
              Salvar Configurações Globais
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
