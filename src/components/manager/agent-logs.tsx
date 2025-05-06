
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Eye, Filter, Search, Download, CalendarIcon } from "lucide-react";
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
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface AgentLog {
  id: string;
  agentName: string;
  createdBy: string;
  model: string;
  temperature: number;
  tokensConsumed: number;
  microPrompts: string[];
  createdAt: string;
}

export function AgentLogs() {
  const [logs, setLogs] = useState<AgentLog[]>([
    {
      id: "1",
      agentName: "Adão",
      createdBy: "Carlos Silva",
      model: "GPT-4o",
      temperature: 0.4,
      tokensConsumed: 12583,
      microPrompts: ["Saudação de Vendas", "Objeções de Preço"],
      createdAt: "2025-05-02 14:32:45"
    },
    {
      id: "2",
      agentName: "Clara",
      createdBy: "Ana Mendes",
      model: "GPT-3.5-turbo",
      temperature: 0.7,
      tokensConsumed: 8745,
      microPrompts: ["Suporte Técnico Base"],
      createdAt: "2025-05-01 09:15:22"
    },
    {
      id: "3",
      agentName: "Lucas",
      createdBy: "Rafael Costa",
      model: "GPT-4o",
      temperature: 0.5,
      tokensConsumed: 0,
      microPrompts: [],
      createdAt: "2025-05-03 16:45:10"
    },
    {
      id: "4",
      agentName: "Lia",
      createdBy: "Mariana Alves",
      model: "GPT-3.5-turbo",
      temperature: 0.6,
      tokensConsumed: 5421,
      microPrompts: ["Saudação de Vendas"],
      createdAt: "2025-05-02 11:28:36"
    }
  ]);
  
  const [selectedLog, setSelectedLog] = useState<AgentLog | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [modelFilter, setModelFilter] = useState<string>("all");
  const [date, setDate] = useState<Date | undefined>(undefined);
  
  // Simulação de detalhes adicionais do log
  const logDetails = {
    id: "1",
    promptsDetails: [
      {
        name: "Saudação de Vendas",
        content: "Você é um assistente de vendas especializado em produtos financeiros. Seja persuasivo, mas não insistente. Sempre apresente as vantagens competitivas dos nossos produtos no início da conversa.",
        precedence: 1
      },
      {
        name: "Objeções de Preço",
        content: "Quando o cliente mencionar que o preço está alto, destaque o custo-benefício e o valor agregado das nossas soluções. Nunca ofereça desconto diretamente, mas pergunte o orçamento do cliente e sugira alternativas dentro da faixa de preço.",
        precedence: 3
      }
    ],
    conversations: [
      { id: "conv1", date: "2025-05-02 14:45:22", tokensUsed: 1245, status: "completed" },
      { id: "conv2", date: "2025-05-02 16:32:18", tokensUsed: 2356, status: "completed" },
      { id: "conv3", date: "2025-05-03 09:12:05", tokensUsed: 1872, status: "completed" },
      { id: "conv4", date: "2025-05-03 11:47:30", tokensUsed: 3214, status: "completed" },
      { id: "conv5", date: "2025-05-04 10:23:14", tokensUsed: 3896, status: "completed" }
    ],
    settings: {
      responseDelay: "2s",
      language: "pt-BR",
      transferKeyword: "atendente humano",
      welcomeMessage: "Olá! Eu sou o assistente virtual de vendas. Como posso ajudar você a encontrar o produto perfeito para suas necessidades?"
    }
  };
  
  const handleViewLog = (log: AgentLog) => {
    setSelectedLog(log);
  };
  
  const handleExportLogs = () => {
    // Simulação de exportação de logs
    console.log("Exportando logs...");
    // Na versão real, geraria um arquivo CSV/Excel
  };
  
  // Filtrar logs
  const filteredLogs = logs.filter(log => {
    let matchesSearch = true;
    let matchesModel = true;
    let matchesDate = true;
    
    // Filtro de busca
    if (searchQuery) {
      matchesSearch = log.agentName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                      log.createdBy.toLowerCase().includes(searchQuery.toLowerCase());
    }
    
    // Filtro de modelo
    if (modelFilter !== "all") {
      matchesModel = log.model === modelFilter;
    }
    
    // Filtro de data
    if (date) {
      const logDate = new Date(log.createdAt.split(" ")[0]);
      matchesDate = format(logDate, "yyyy-MM-dd") === format(date, "yyyy-MM-dd");
    }
    
    return matchesSearch && matchesModel && matchesDate;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold">Logs & Histórico</h2>
          <p className="text-sm text-aiGray">Monitoramento de atividade dos agentes</p>
        </div>
        <Button className="ai-button-outline" onClick={handleExportLogs}>
          <Download className="w-4 h-4 mr-2" />
          Exportar Logs
        </Button>
      </div>
      
      {/* Filtros */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-aiGray" />
          <Input 
            className="pl-10 bg-white/5 border-white/10"
            placeholder="Buscar por agente ou criador..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2">
          <Select value={modelFilter} onValueChange={setModelFilter}>
            <SelectTrigger className="w-40 bg-white/5 border-white/10">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                <SelectValue placeholder="Modelo" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os Modelos</SelectItem>
              <SelectItem value="GPT-4o">GPT-4o</SelectItem>
              <SelectItem value="GPT-3.5-turbo">GPT-3.5-turbo</SelectItem>
              <SelectItem value="Claude 3 Opus">Claude 3 Opus</SelectItem>
            </SelectContent>
          </Select>
          
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "bg-white/5 border-white/10 w-[260px] justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "dd/MM/yyyy") : <span>Filtrar por data</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          
          {(date || modelFilter !== "all" || searchQuery) && (
            <Button 
              variant="ghost" 
              className="px-2 hover:bg-white/5"
              onClick={() => {
                setDate(undefined);
                setModelFilter("all");
                setSearchQuery("");
              }}
            >
              Limpar
            </Button>
          )}
        </div>
      </div>
      
      {/* Tabela de Logs */}
      <Card className="bg-aiDark-lighter border-white/5">
        <CardContent className="p-0">
          <Table>
            <TableCaption>Histórico de criação e uso de agentes</TableCaption>
            <TableHeader>
              <TableRow className="hover:bg-white/5 border-white/10">
                <TableHead>Agente</TableHead>
                <TableHead>Criado por</TableHead>
                <TableHead>Modelo</TableHead>
                <TableHead>Temperatura</TableHead>
                <TableHead>Tokens</TableHead>
                <TableHead>Criado em</TableHead>
                <TableHead>Micro-Prompts</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLogs.map((log) => (
                <TableRow key={log.id} className="hover:bg-white/5 border-white/10">
                  <TableCell className="font-medium">{log.agentName}</TableCell>
                  <TableCell>{log.createdBy}</TableCell>
                  <TableCell>{log.model}</TableCell>
                  <TableCell>{log.temperature}</TableCell>
                  <TableCell>{log.tokensConsumed.toLocaleString()}</TableCell>
                  <TableCell>{log.createdAt}</TableCell>
                  <TableCell>
                    {log.microPrompts.length > 0 ? (
                      <div className="flex items-center">
                        <Badge className="bg-aiBlue/20 text-aiBlue-light">
                          {log.microPrompts.length}
                        </Badge>
                      </div>
                    ) : (
                      <span className="text-aiGray">Nenhum</span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-8 w-8 p-0 hover:bg-white/5"
                      onClick={() => handleViewLog(log)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              
              {filteredLogs.length === 0 && (
                <TableRow>
                  <TableCell colSpan={8} className="h-24 text-center">
                    Nenhum log encontrado.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      {/* Dialog de detalhes */}
      {selectedLog && (
        <Dialog open={!!selectedLog} onOpenChange={() => setSelectedLog(null)}>
          <DialogContent className="glass-morphism border-white/10 sm:max-w-[700px]">
            <DialogHeader>
              <DialogTitle className="flex items-center justify-between">
                <span>Detalhes do Agente: {selectedLog.agentName}</span>
                <Badge className={selectedLog.tokensConsumed > 0 ? "bg-green-500/20 text-green-300" : "bg-yellow-500/20 text-yellow-300"}>
                  {selectedLog.tokensConsumed > 0 ? "Ativo" : "Treinamento"}
                </Badge>
              </DialogTitle>
            </DialogHeader>
            
            <div className="space-y-6">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div>
                  <div className="text-xs text-aiGray">Criado por</div>
                  <div className="text-sm font-medium">{selectedLog.createdBy}</div>
                </div>
                <div>
                  <div className="text-xs text-aiGray">Modelo</div>
                  <div className="text-sm font-medium">{selectedLog.model}</div>
                </div>
                <div>
                  <div className="text-xs text-aiGray">Temperatura</div>
                  <div className="text-sm font-medium">{selectedLog.temperature}</div>
                </div>
                <div>
                  <div className="text-xs text-aiGray">Criado em</div>
                  <div className="text-sm font-medium">{selectedLog.createdAt}</div>
                </div>
                <div>
                  <div className="text-xs text-aiGray">Tokens consumidos</div>
                  <div className="text-sm font-medium">{selectedLog.tokensConsumed.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-xs text-aiGray">Micro-Prompts</div>
                  <div className="text-sm font-medium">{selectedLog.microPrompts.length}</div>
                </div>
              </div>
              
              {selectedLog.microPrompts.length > 0 && (
                <div>
                  <div className="text-xs text-aiGray mb-2">Micro-Prompts Aplicados</div>
                  <div className="space-y-3">
                    {logDetails.promptsDetails.map((prompt, index) => (
                      <div key={index} className="bg-black/30 p-3 rounded-md border border-white/5">
                        <div className="flex justify-between items-center mb-1">
                          <div className="font-medium text-sm">{prompt.name}</div>
                          <Badge className="bg-aiPurple/20 text-aiPurple-light">
                            Precedência: {prompt.precedence}
                          </Badge>
                        </div>
                        <p className="text-xs text-aiGray">{prompt.content}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              <div>
                <div className="text-xs text-aiGray mb-2">Conversas Recentes</div>
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-white/5 border-white/10">
                      <TableHead>ID</TableHead>
                      <TableHead>Data</TableHead>
                      <TableHead>Tokens</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {logDetails.conversations.map((conv) => (
                      <TableRow key={conv.id} className="hover:bg-white/5 border-white/10">
                        <TableCell className="font-medium">{conv.id}</TableCell>
                        <TableCell>{conv.date}</TableCell>
                        <TableCell>{conv.tokensUsed}</TableCell>
                        <TableCell>
                          <Badge className="bg-green-500/20 text-green-300 capitalize">
                            {conv.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              
              <div>
                <div className="text-xs text-aiGray mb-2">Configurações do Agente</div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-xs text-aiGray">Delay de Resposta</div>
                    <div className="text-sm font-medium">{logDetails.settings.responseDelay}</div>
                  </div>
                  <div>
                    <div className="text-xs text-aiGray">Idioma</div>
                    <div className="text-sm font-medium">{logDetails.settings.language}</div>
                  </div>
                  <div>
                    <div className="text-xs text-aiGray">Palavra para Transferência</div>
                    <div className="text-sm font-medium">"{logDetails.settings.transferKeyword}"</div>
                  </div>
                </div>
              </div>
            </div>
            
            <DialogFooter>
              <Button className="ai-button" onClick={() => setSelectedLog(null)}>
                Fechar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
