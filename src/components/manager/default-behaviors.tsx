
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Info, Save, Plus, Trash2, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useToast } from "@/components/ui/use-toast";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";

interface DefaultBehavior {
  id: string;
  name: string;
  agentType: string;
  welcomeMessage: string;
  responseDelay: number;
  language: string;
  prohibitedPhrases: string[];
}

export function DefaultBehaviors() {
  const { toast } = useToast();
  
  // Dados de exemplo
  const [behaviors, setBehaviors] = useState<DefaultBehavior[]>([
    {
      id: "1",
      name: "Agente de Vendas",
      agentType: "vendas",
      welcomeMessage: "Olá! Eu sou o assistente virtual de vendas. Como posso ajudar você a encontrar o produto perfeito para suas necessidades?",
      responseDelay: 2,
      language: "pt-BR",
      prohibitedPhrases: ["não sei", "impossível", "não podemos"]
    },
    {
      id: "2",
      name: "Agente de Suporte",
      agentType: "suporte",
      welcomeMessage: "Olá! Sou o assistente de suporte técnico. Estou aqui para ajudar a resolver seu problema da maneira mais eficiente possível.",
      responseDelay: 3,
      language: "pt-BR",
      prohibitedPhrases: ["culpa sua", "erro seu", "você deveria"]
    },
    {
      id: "3",
      name: "Agente de Crédito",
      agentType: "credito",
      welcomeMessage: "Olá! Sou seu assistente virtual de crédito. Como posso ajudar você com produtos financeiros ou empréstimos hoje?",
      responseDelay: 2,
      language: "pt-BR",
      prohibitedPhrases: ["garantido", "aprovação certa", "sem análise"]
    }
  ]);
  
  const [newBehavior, setNewBehavior] = useState<Partial<DefaultBehavior>>({
    name: "",
    agentType: "",
    welcomeMessage: "",
    responseDelay: 2,
    language: "pt-BR",
    prohibitedPhrases: []
  });
  
  const [prohibitedPhrase, setProhibitedPhrase] = useState("");
  const [isAddingNew, setIsAddingNew] = useState(false);
  
  const handleAddBehavior = () => {
    if (!newBehavior.name || !newBehavior.agentType || !newBehavior.welcomeMessage) {
      toast({
        title: "Campos obrigatórios",
        description: "Nome, tipo de agente e mensagem de boas-vindas são obrigatórios.",
        variant: "destructive",
      });
      return;
    }
    
    const behavior: DefaultBehavior = {
      id: Date.now().toString(),
      name: newBehavior.name || "",
      agentType: newBehavior.agentType || "",
      welcomeMessage: newBehavior.welcomeMessage || "",
      responseDelay: newBehavior.responseDelay || 2,
      language: newBehavior.language || "pt-BR",
      prohibitedPhrases: newBehavior.prohibitedPhrases || []
    };
    
    setBehaviors([...behaviors, behavior]);
    
    // Reset form
    setNewBehavior({
      name: "",
      agentType: "",
      welcomeMessage: "",
      responseDelay: 2,
      language: "pt-BR",
      prohibitedPhrases: []
    });
    
    setIsAddingNew(false);
    
    toast({
      title: "Comportamento padrão adicionado",
      description: `${behavior.name} foi configurado com sucesso.`,
    });
  };
  
  const handleDeleteBehavior = (id: string) => {
    setBehaviors(behaviors.filter(behavior => behavior.id !== id));
    
    toast({
      title: "Comportamento removido",
      description: "O comportamento padrão foi removido com sucesso.",
    });
  };
  
  const handleAddProhibitedPhrase = () => {
    if (!prohibitedPhrase) return;
    
    setNewBehavior({
      ...newBehavior, 
      prohibitedPhrases: [...(newBehavior.prohibitedPhrases || []), prohibitedPhrase]
    });
    
    setProhibitedPhrase("");
  };
  
  const handleRemoveProhibitedPhrase = (phrase: string) => {
    setNewBehavior({
      ...newBehavior, 
      prohibitedPhrases: (newBehavior.prohibitedPhrases || []).filter(p => p !== phrase)
    });
  };
  
  const agentTypes = [
    { value: "vendas", label: "Vendas" },
    { value: "suporte", label: "Suporte" },
    { value: "credito", label: "Crédito" },
    { value: "juridico", label: "Jurídico" },
    { value: "atendimento", label: "Atendimento" },
  ];
  
  const languages = [
    { value: "pt-BR", label: "Português (Brasil)" },
    { value: "en-US", label: "Inglês (EUA)" },
    { value: "es", label: "Espanhol" },
    { value: "fr", label: "Francês" },
    { value: "de", label: "Alemão" },
    { value: "auto", label: "Detecção Automática" },
  ];
  
  const handleSaveSettings = () => {
    toast({
      title: "Configurações salvas",
      description: "As configurações de comportamento foram atualizadas com sucesso.",
      duration: 3000,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold">Comportamentos Padrão</h2>
          <p className="text-sm text-aiGray">Configure comportamentos padrão por tipo de agente</p>
        </div>
        <Button 
          className="ai-button" 
          onClick={() => setIsAddingNew(!isAddingNew)}
        >
          {isAddingNew ? "Cancelar" : (
            <>
              <Plus className="w-4 h-4 mr-2" />
              Novo Comportamento
            </>
          )}
        </Button>
      </div>
      
      {isAddingNew && (
        <Card className="bg-aiDark-lighter border-white/5">
          <CardHeader>
            <CardTitle className="text-lg">Novo Comportamento Padrão</CardTitle>
            <CardDescription>Configure os parâmetros comportamentais para um tipo de agente</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="behaviorName">Nome</Label>
                <Input
                  id="behaviorName"
                  className="ai-input"
                  value={newBehavior.name || ""}
                  onChange={(e) => setNewBehavior({...newBehavior, name: e.target.value})}
                  placeholder="Ex: Agente de Vendas"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="behaviorType">Tipo de Agente</Label>
                <Select
                  value={newBehavior.agentType}
                  onValueChange={(value) => setNewBehavior({...newBehavior, agentType: value})}
                >
                  <SelectTrigger className="ai-input">
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    {agentTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="welcomeMessage">Mensagem de Boas-Vindas</Label>
              <Textarea
                id="welcomeMessage"
                className="ai-input min-h-24"
                value={newBehavior.welcomeMessage || ""}
                onChange={(e) => setNewBehavior({...newBehavior, welcomeMessage: e.target.value})}
                placeholder="Escreva a mensagem que o agente enviará ao iniciar a conversa..."
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="responseDelay">Delay de Resposta (segundos)</Label>
                  <span className="text-sm font-medium text-aiBlue">
                    {newBehavior.responseDelay}s
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <Clock className="h-4 w-4 text-aiGray" />
                  <Slider
                    id="responseDelay"
                    defaultValue={[newBehavior.responseDelay || 2]}
                    max={10}
                    min={1}
                    step={1}
                    className="flex-1"
                    onValueChange={(value) => setNewBehavior({...newBehavior, responseDelay: value[0]})}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="language">Idioma Padrão</Label>
                <Select
                  value={newBehavior.language}
                  onValueChange={(value) => setNewBehavior({...newBehavior, language: value})}
                >
                  <SelectTrigger className="ai-input">
                    <SelectValue placeholder="Selecione o idioma" />
                  </SelectTrigger>
                  <SelectContent>
                    {languages.map((lang) => (
                      <SelectItem key={lang.value} value={lang.value}>
                        {lang.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label>Frases Proibidas</Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="w-4 h-4 text-aiGray" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="w-80">O agente evitará usar estas frases em suas respostas.</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              
              <div className="flex gap-2">
                <Input
                  className="ai-input"
                  value={prohibitedPhrase}
                  onChange={(e) => setProhibitedPhrase(e.target.value)}
                  placeholder="Ex: não sei"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && prohibitedPhrase) {
                      e.preventDefault();
                      handleAddProhibitedPhrase();
                    }
                  }}
                />
                <Button 
                  className="ai-button-outline" 
                  onClick={handleAddProhibitedPhrase}
                  disabled={!prohibitedPhrase}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {(newBehavior.prohibitedPhrases || []).map((phrase) => (
                  <Badge 
                    key={phrase} 
                    variant="secondary" 
                    className="bg-red-500/20 text-red-300 pl-2 pr-1 py-1 flex items-center gap-1"
                  >
                    {phrase}
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-5 w-5 p-0 hover:bg-red-500/20 rounded-full"
                      onClick={() => handleRemoveProhibitedPhrase(phrase)}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
            </div>
            
            <div className="pt-3 flex justify-end">
              <Button className="ai-button" onClick={handleAddBehavior}>
                <Save className="w-4 h-4 mr-2" />
                Salvar Comportamento
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
      
      {/* Lista de comportamentos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {behaviors.map((behavior) => (
          <Card key={behavior.id} className="bg-aiDark-lighter border-white/5">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-lg">{behavior.name}</CardTitle>
                  <CardDescription className="capitalize">Tipo: {behavior.agentType}</CardDescription>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-8 w-8 p-0 hover:bg-red-500/10 hover:text-red-500"
                  onClick={() => handleDeleteBehavior(behavior.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1">
                <Label className="text-xs text-aiGray">Mensagem de Boas-Vindas</Label>
                <div className="bg-black/20 p-3 rounded-md text-sm">
                  {behavior.welcomeMessage}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs text-aiGray">Delay de Resposta</Label>
                  <div className="text-sm flex items-center gap-2 mt-1">
                    <Clock className="h-4 w-4 text-aiGray" />
                    <span>{behavior.responseDelay} segundos</span>
                  </div>
                </div>
                <div>
                  <Label className="text-xs text-aiGray">Idioma Padrão</Label>
                  <div className="text-sm mt-1">
                    {languages.find(l => l.value === behavior.language)?.label || behavior.language}
                  </div>
                </div>
              </div>
              
              <div>
                <Label className="text-xs text-aiGray">Frases Proibidas</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {behavior.prohibitedPhrases.map((phrase) => (
                    <Badge 
                      key={phrase} 
                      variant="secondary" 
                      className="bg-red-500/20 text-red-300"
                    >
                      {phrase}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="pt-4 flex justify-end">
        <Button className="ai-button" onClick={handleSaveSettings}>
          <Save className="w-4 h-4 mr-2" />
          Salvar Todas as Configurações
        </Button>
      </div>
    </div>
  );
}
