
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Info, Plus, Trash2, Eye } from "lucide-react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface MicroPromptType {
  id: string;
  name: string;
  agentType: string;
  content: string;
  precedence: number;
  tags: string[];
  isActive: boolean;
}

export function MicroPrompts() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newPromptName, setNewPromptName] = useState("");
  const [newPromptType, setNewPromptType] = useState("");
  const [newPromptContent, setNewPromptContent] = useState("");
  const [newPromptPrecedence, setNewPromptPrecedence] = useState("1");
  const [newPromptTags, setNewPromptTags] = useState("");
  const [selectedPrompt, setSelectedPrompt] = useState<MicroPromptType | null>(null);
  
  // Dados de exemplo
  const [microPrompts, setMicroPrompts] = useState<MicroPromptType[]>([
    {
      id: "1",
      name: "Saudação de Vendas",
      agentType: "vendas",
      content: "Você é um assistente de vendas especializado em produtos financeiros. Seja persuasivo, mas não insistente. Sempre apresente as vantagens competitivas dos nossos produtos no início da conversa.",
      precedence: 1,
      tags: ["saudação", "início", "vendas"],
      isActive: true
    },
    {
      id: "2",
      name: "Objeções de Preço",
      agentType: "vendas",
      content: "Quando o cliente mencionar que o preço está alto, destaque o custo-benefício e o valor agregado das nossas soluções. Nunca ofereça desconto diretamente, mas pergunte o orçamento do cliente e sugira alternativas dentro da faixa de preço.",
      precedence: 3,
      tags: ["objeção", "preço", "negociação"],
      isActive: true
    },
    {
      id: "3",
      name: "Suporte Técnico Base",
      agentType: "suporte",
      content: "Você é um especialista em suporte técnico. Sempre peça informações do sistema operacional e versão do software antes de sugerir soluções. Mantenha um tom paciente e didático.",
      precedence: 1,
      tags: ["suporte", "técnico", "base"],
      isActive: true
    },
  ]);
  
  const handleCreatePrompt = () => {
    const newPrompt = {
      id: Date.now().toString(),
      name: newPromptName,
      agentType: newPromptType,
      content: newPromptContent,
      precedence: parseInt(newPromptPrecedence),
      tags: newPromptTags.split(',').map(tag => tag.trim()),
      isActive: true
    };
    
    setMicroPrompts([...microPrompts, newPrompt]);
    resetForm();
    setIsDialogOpen(false);
  };
  
  const resetForm = () => {
    setNewPromptName("");
    setNewPromptType("");
    setNewPromptContent("");
    setNewPromptPrecedence("1");
    setNewPromptTags("");
  };
  
  const togglePromptStatus = (id: string) => {
    setMicroPrompts(microPrompts.map(prompt => 
      prompt.id === id ? { ...prompt, isActive: !prompt.isActive } : prompt
    ));
  };
  
  const handleDeletePrompt = (id: string) => {
    setMicroPrompts(microPrompts.filter(prompt => prompt.id !== id));
  };
  
  const handleViewPrompt = (prompt: MicroPromptType) => {
    setSelectedPrompt(prompt);
  };
  
  const agentTypes = [
    { value: "vendas", label: "Vendas" },
    { value: "suporte", label: "Suporte" },
    { value: "credito", label: "Crédito" },
    { value: "juridico", label: "Jurídico" },
    { value: "atendimento", label: "Atendimento" },
  ];
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold">Micro-Prompts</h2>
          <p className="text-sm text-aiGray">Gerencie instruções específicas por tipo de agente</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="ai-button">
              <Plus className="w-4 h-4 mr-2" />
              Criar Micro-Prompt
            </Button>
          </DialogTrigger>
          <DialogContent className="glass-morphism border-white/10 sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Criar Novo Micro-Prompt</DialogTitle>
              <DialogDescription>
                Adicione um novo micro-prompt para orientar o comportamento dos agentes.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="promptName">Nome do Prompt</Label>
                  <Input
                    id="promptName"
                    className="ai-input"
                    value={newPromptName}
                    onChange={(e) => setNewPromptName(e.target.value)}
                    placeholder="Ex: Saudação de Vendas"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="promptType">Tipo de Agente</Label>
                  <Select value={newPromptType} onValueChange={setNewPromptType}>
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
                <div className="flex items-center justify-between">
                  <Label htmlFor="promptContent">Texto do Micro-Prompt</Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="w-4 h-4 text-aiGray" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="w-80">Escreva as instruções que serão enviadas ao modelo de IA antes do input do usuário. Essas instruções definem o comportamento, tom e diretrizes do agente.</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <Textarea
                  id="promptContent"
                  className="ai-input min-h-32"
                  value={newPromptContent}
                  onChange={(e) => setNewPromptContent(e.target.value)}
                  placeholder="Descreva detalhadamente como o agente deve se comportar..."
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="precedence">Ordem de Precedência</Label>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info className="w-4 h-4 text-aiGray" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Quanto menor o número, mais prioritário é o prompt. Prompts com precedência 1 são aplicados antes dos demais.</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <Input
                    id="precedence"
                    className="ai-input"
                    value={newPromptPrecedence}
                    onChange={(e) => setNewPromptPrecedence(e.target.value)}
                    type="number"
                    min="1"
                    max="100"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="tags">Tags (separadas por vírgula)</Label>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info className="w-4 h-4 text-aiGray" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Use tags para categorizar e filtrar seus prompts. Ex: saudação, objeção, técnico</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <Input
                    id="tags"
                    className="ai-input"
                    value={newPromptTags}
                    onChange={(e) => setNewPromptTags(e.target.value)}
                    placeholder="Ex: saudação, início, vendas"
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)} className="bg-transparent border-white/10">
                Cancelar
              </Button>
              <Button className="ai-button" onClick={handleCreatePrompt}>
                Salvar Prompt
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      {/* Lista de Micro-Prompts */}
      <Card className="bg-aiDark-lighter border-white/5">
        <CardContent className="p-0">
          <Table>
            <TableCaption>Lista de micro-prompts disponíveis</TableCaption>
            <TableHeader>
              <TableRow className="hover:bg-white/5 border-white/10">
                <TableHead className="w-[250px]">Nome</TableHead>
                <TableHead>Tipo de Agente</TableHead>
                <TableHead>Precedência</TableHead>
                <TableHead>Tags</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {microPrompts.map((prompt) => (
                <TableRow key={prompt.id} className="hover:bg-white/5 border-white/10">
                  <TableCell className="font-medium">{prompt.name}</TableCell>
                  <TableCell className="capitalize">{prompt.agentType}</TableCell>
                  <TableCell>{prompt.precedence}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {prompt.tags.map(tag => (
                        <Badge key={tag} variant="secondary" className="bg-aiPurple/20 text-aiPurple-light">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={prompt.isActive}
                        onCheckedChange={() => togglePromptStatus(prompt.id)}
                      />
                      <span className={`text-xs ${prompt.isActive ? "text-green-400" : "text-aiGray"}`}>
                        {prompt.isActive ? "Ativo" : "Inativo"}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="h-8 w-8 p-0 border-white/10 bg-transparent hover:bg-white/5"
                              onClick={() => handleViewPrompt(prompt)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Visualizar prompt</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="h-8 w-8 p-0 border-white/10 bg-transparent hover:bg-white/5 hover:text-red-400"
                              onClick={() => handleDeletePrompt(prompt.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Excluir prompt</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      {/* Preview Dialog */}
      {selectedPrompt && (
        <Dialog open={!!selectedPrompt} onOpenChange={() => setSelectedPrompt(null)}>
          <DialogContent className="glass-morphism border-white/10 sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>{selectedPrompt.name}</DialogTitle>
              <DialogDescription>
                <span className="capitalize">{selectedPrompt.agentType}</span> •{" "}
                <span>Precedência: {selectedPrompt.precedence}</span> •{" "}
                <span className={selectedPrompt.isActive ? "text-green-400" : "text-red-400"}>
                  {selectedPrompt.isActive ? "Ativo" : "Inativo"}
                </span>
              </DialogDescription>
            </DialogHeader>
            <div className="bg-black/30 p-4 rounded-md border border-white/5">
              <p className="whitespace-pre-wrap">{selectedPrompt.content}</p>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {selectedPrompt.tags.map(tag => (
                <Badge key={tag} variant="secondary" className="bg-aiPurple/20 text-aiPurple-light">
                  {tag}
                </Badge>
              ))}
            </div>
            <DialogFooter>
              <Button onClick={() => setSelectedPrompt(null)} className="ai-button">
                Fechar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
