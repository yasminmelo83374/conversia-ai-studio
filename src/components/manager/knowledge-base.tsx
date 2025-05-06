
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Upload as UploadIcon, FileText, Trash2, Plus, Info } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface KnowledgeFileType {
  id: string;
  name: string;
  description: string;
  fileType: string;
  size: string;
  agentType: string;
  contextUsage: string;
  uploadedAt: string;
}

export function KnowledgeBase() {
  const { toast } = useToast();
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [selectedAgentType, setSelectedAgentType] = useState("");
  const [fileDescription, setFileDescription] = useState("");
  const [contextUsage, setContextUsage] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  
  // Dados de exemplo
  const [files, setFiles] = useState<KnowledgeFileType[]>([
    {
      id: "1",
      name: "Guia de Vendas 2025.pdf",
      description: "Manual completo com scripts e objeções para vendas",
      fileType: "pdf",
      size: "2.4 MB",
      agentType: "vendas",
      contextUsage: "Usar quando o cliente solicitar informações sobre produtos",
      uploadedAt: "2025-05-01"
    },
    {
      id: "2",
      name: "FAQ Suporte Técnico.docx",
      description: "Perguntas frequentes sobre problemas técnicos",
      fileType: "docx",
      size: "1.1 MB",
      agentType: "suporte",
      contextUsage: "Usar para todas as dúvidas técnicas iniciais",
      uploadedAt: "2025-04-28"
    },
    {
      id: "3",
      name: "Políticas de Crédito.pdf",
      description: "Regras e termos para aprovação de crédito",
      fileType: "pdf",
      size: "3.7 MB",
      agentType: "credito",
      contextUsage: "Consultar para validar elegibilidade e limites",
      uploadedAt: "2025-05-03"
    }
  ]);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };
  
  const handleUploadFile = () => {
    if (!selectedFile || !selectedAgentType) {
      toast({
        title: "Erro no upload",
        description: "Por favor, selecione um arquivo e o tipo de agente.",
        variant: "destructive",
      });
      return;
    }
    
    // Simular upload
    const newFile: KnowledgeFileType = {
      id: Date.now().toString(),
      name: selectedFile.name,
      description: fileDescription,
      fileType: selectedFile.name.split('.').pop() || "unknown",
      size: `${(selectedFile.size / (1024 * 1024)).toFixed(1)} MB`,
      agentType: selectedAgentType,
      contextUsage: contextUsage,
      uploadedAt: new Date().toISOString().split('T')[0]
    };
    
    setFiles([...files, newFile]);
    
    toast({
      title: "Arquivo enviado com sucesso",
      description: `${selectedFile.name} foi adicionado à base de conhecimento.`,
    });
    
    // Reset form
    setSelectedFile(null);
    setSelectedAgentType("");
    setFileDescription("");
    setContextUsage("");
    setIsUploadDialogOpen(false);
    
    // Reset file input
    const fileInput = document.getElementById("file-upload") as HTMLInputElement;
    if (fileInput) fileInput.value = "";
  };
  
  const handleDeleteFile = (id: string) => {
    setFiles(files.filter(file => file.id !== id));
    
    toast({
      title: "Arquivo removido",
      description: "O arquivo foi removido da base de conhecimento.",
    });
  };
  
  const agentTypes = [
    { value: "vendas", label: "Vendas" },
    { value: "suporte", label: "Suporte" },
    { value: "credito", label: "Crédito" },
    { value: "juridico", label: "Jurídico" },
    { value: "atendimento", label: "Atendimento" },
  ];
  
  const getFileIcon = (fileType: string) => {
    return <FileText className="h-6 w-6" />;
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold">Base de Conhecimento</h2>
          <p className="text-sm text-aiGray">Arquivos base para treinamento dos agentes</p>
        </div>
        <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
          <DialogTrigger asChild>
            <Button className="ai-button">
              <Plus className="w-4 h-4 mr-2" />
              Adicionar Arquivo
            </Button>
          </DialogTrigger>
          <DialogContent className="glass-morphism border-white/10 sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Upload de Documentação</DialogTitle>
              <DialogDescription>
                Adicione documentos que servirão como base de conhecimento para os agentes.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="border-2 border-dashed border-white/10 rounded-lg p-6 text-center">
                <input
                  id="file-upload"
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                  accept=".pdf,.doc,.docx,.txt,.csv"
                />
                <label 
                  htmlFor="file-upload"
                  className="flex flex-col items-center justify-center cursor-pointer"
                >
                  <UploadIcon className="h-12 w-12 text-aiGray mb-4" />
                  <p className="font-medium text-white">
                    {selectedFile ? selectedFile.name : "Clique para selecionar um arquivo"}
                  </p>
                  <p className="text-xs text-aiGray mt-1">
                    {selectedFile 
                      ? `${(selectedFile.size / (1024 * 1024)).toFixed(2)} MB` 
                      : "PDF, DOC, DOCX, TXT, CSV até 10MB"
                    }
                  </p>
                </label>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="agentType">Tipo de Agente</Label>
                  <Select value={selectedAgentType} onValueChange={setSelectedAgentType}>
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
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="fileDescription">Descrição</Label>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info className="w-4 h-4 text-aiGray" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Descreva brevemente o conteúdo do arquivo</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <Input
                    id="fileDescription"
                    className="ai-input"
                    value={fileDescription}
                    onChange={(e) => setFileDescription(e.target.value)}
                    placeholder="Ex: Manual de produtos 2025"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="contextUsage">Uso Contextual</Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="w-4 h-4 text-aiGray" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="w-80">Especifique quando o agente deve usar este documento no contexto da conversa. Ex: "Usar quando cliente perguntar sobre preços"</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <Textarea
                  id="contextUsage"
                  className="ai-input"
                  value={contextUsage}
                  onChange={(e) => setContextUsage(e.target.value)}
                  placeholder="Ex: Usar quando o cliente solicitar detalhes sobre produtos"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsUploadDialogOpen(false)} className="bg-transparent border-white/10">
                Cancelar
              </Button>
              <Button 
                className="ai-button" 
                onClick={handleUploadFile}
                disabled={!selectedFile || !selectedAgentType}
              >
                <UploadIcon className="w-4 h-4 mr-2" />
                Fazer Upload
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      {/* Lista de arquivos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {files.map((file) => (
          <Card key={file.id} className="bg-aiDark-lighter border-white/5 overflow-hidden">
            <CardHeader className="p-4 pb-2">
              <div className="flex justify-between items-start">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-md bg-white/5">
                    {getFileIcon(file.fileType)}
                  </div>
                  <div>
                    <CardTitle className="text-sm font-medium">{file.name}</CardTitle>
                    <CardDescription className="text-xs mt-1">{file.size} • Enviado em {file.uploadedAt}</CardDescription>
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-8 w-8 p-0 hover:bg-red-500/10 hover:text-red-500"
                  onClick={() => handleDeleteFile(file.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-4 pt-2">
              <p className="text-sm text-aiGray mb-2">{file.description}</p>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-1">
                  <Badge variant="secondary" className="bg-aiPurple/20 text-aiPurple-light capitalize">
                    {file.agentType}
                  </Badge>
                </div>
                <p className="text-xs text-aiGray-dark">
                  <span className="text-aiGray">Uso:</span> {file.contextUsage}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {files.length === 0 && (
        <div className="text-center py-12">
          <FileText className="h-16 w-16 mx-auto text-aiGray mb-4" />
          <h3 className="text-xl font-medium mb-2">Nenhum arquivo na base de conhecimento</h3>
          <p className="text-sm text-aiGray mb-6 max-w-md mx-auto">
            Adicione documentos para que os agentes possam utilizá-los como referência durante as conversas.
          </p>
          <Button 
            className="ai-button-outline"
            onClick={() => setIsUploadDialogOpen(true)}
          >
            <UploadIcon className="w-4 h-4 mr-2" />
            Adicionar Primeiro Arquivo
          </Button>
        </div>
      )}
    </div>
  );
}
