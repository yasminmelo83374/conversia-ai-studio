import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { 
  ArrowLeft, Upload, Save, Bot, Trash2, MessageCircle, 
  Clock, FileText, Zap, Settings, Shield, Info,
  Upload as UploadIcon, AlertTriangle
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const configFormSchema = z.object({
  name: z.string().min(2, {
    message: "O nome do agente deve ter pelo menos 2 caracteres",
  }),
  description: z.string().min(10, {
    message: "A descrição deve ter pelo menos 10 caracteres",
  }),
  objective: z.string().min(10, {
    message: "O objetivo deve ter pelo menos 10 caracteres",
  }),
  model: z.string(),
  temperature: z.number().min(0.2).max(1),
  tone: z.string(),
  responseDelay: z.string(),
  keywords: z.string(),
});

const personalizationSchema = z.object({
  instructions: z.string(),
  prohibitedPhrases: z.string(),
  priorityPhrases: z.string(),
});

const settingsSchema = z.object({
  workingHoursStart: z.string(),
  workingHoursEnd: z.string(),
  transferKeyword: z.string(),
  errorMessage: z.string(),
  isActive: z.boolean(),
});

type AgentType = "financeiro" | "suporte" | "vendas" | "atendimento" | "customizado";

export default function AgentConfig() {
  const { id } = useParams();
  const { toast } = useToast();
  const [selectedTab, setSelectedTab] = useState("configuracao");
  const [agentType, setAgentType] = useState<AgentType>("financeiro");
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const [isAdminUser, setIsAdminUser] = useState(true); // For demo, assume admin access
  
  // Mock model costs
  const modelCosts = {
    "gpt-4o": { input: "0.01", output: "0.03" },
    "gpt-4o-mini": { input: "0.00", output: "0.01" },
    "gpt-3.5-turbo": { input: "0.001", output: "0.002" },
  };
  
  // Mock agent data based on id
  const agentData = {
    id: id,
    name: id === "1" ? "Adão" : id === "2" ? "Clara" : id === "3" ? "Lucas" : "Novo Agente",
    description: id === "1" 
      ? "Especialista em crédito consignado e FGTS" 
      : id === "2" 
      ? "Suporte técnico para empresas de software" 
      : id === "3" 
      ? "Vendedor B2B para serviços" 
      : "",
    model: "gpt-4o-mini",
    temperature: 0.7,
    tone: id === "1" ? "consultivo" : id === "2" ? "direto" : id === "3" ? "informal" : "consultivo",
    industry: id === "1" ? "financeiro" : id === "2" ? "suporte" : id === "3" ? "vendas" : "",
    objective: id === "1" 
      ? "Realizar atendimento inicial para clientes interessados em crédito consignado e FGTS, qualificar leads e transferir para consultores quando necessário." 
      : id === "2" 
      ? "Fornecer suporte técnico inicial, resolver problemas comuns e escalar para equipe técnica quando necessário." 
      : id === "3" 
      ? "Prospectar novos clientes B2B, entender necessidades e agendar demonstrações com vendedores." 
      : "",
    keywords: id === "1" ? "consignado, empréstimo, FGTS, aposentado, INSS" : id === "2" ? "suporte, ajuda, bug, problema, erro" : id === "3" ? "serviço, solução, orçamento, proposta, demonstração" : "",
    responseDelay: "5",
    language: "auto",
    workingHoursStart: "09:00",
    workingHoursEnd: "18:00",
    transferKeyword: "#humano",
    errorMessage: "Desculpe, não entendi sua pergunta. Poderia reformular?",
    isActive: id === "1" || id === "4" ? true : false,
    instructions: id === "1" 
      ? "Atuar como consultor de crédito consignado, explicando condições, taxas e processo."
      : id === "2"
      ? "Resolver problemas técnicos de software, orientando passo a passo e coletando informações relevantes."
      : id === "3"
      ? "Atuar como vendedor B2B, entendendo necessidades do cliente e apresentando soluções."
      : "",
    prohibitedPhrases: "garantido, certeza absoluta, aprovação imediata",
    priorityPhrases: "taxas competitivas, atendimento personalizado, análise rápida"
  };
  
  // Microflow mock data
  const microflowSteps = [
    { 
      id: "step1", 
      title: "Saudação Inicial", 
      description: "Cumprimentar o usuário e se apresentar como assistente virtual" 
    },
    { 
      id: "step2", 
      title: "Identificação da Intenção", 
      description: "Determinar o que o usuário deseja (informação, compra, suporte)" 
    },
    { 
      id: "step3", 
      title: "Coleta de Informações", 
      description: "Obter dados relevantes do usuário conforme sua necessidade" 
    },
    { 
      id: "step4", 
      title: "Processamento e Resposta", 
      description: "Analisar informações e fornecer respostas ou soluções adequadas" 
    },
    { 
      id: "step5", 
      title: "Verificação de Satisfação", 
      description: "Confirmar se o usuário está satisfeito com a resposta ou precisa de mais informações" 
    },
    { 
      id: "step6", 
      title: "Encerramento ou Escalação", 
      description: "Finalizar conversa ou transferir para atendente humano se necessário" 
    },
  ];
  
  // Initialize configuration form
  const configForm = useForm<z.infer<typeof configFormSchema>>({
    resolver: zodResolver(configFormSchema),
    defaultValues: {
      name: agentData.name,
      description: agentData.description,
      objective: agentData.objective,
      model: agentData.model,
      temperature: agentData.temperature,
      tone: agentData.tone,
      responseDelay: agentData.responseDelay,
      keywords: agentData.keywords,
    },
  });
  
  // Initialize personalization form
  const personalizationForm = useForm<z.infer<typeof personalizationSchema>>({
    resolver: zodResolver(personalizationSchema),
    defaultValues: {
      instructions: agentData.instructions,
      prohibitedPhrases: agentData.prohibitedPhrases,
      priorityPhrases: agentData.priorityPhrases,
    },
  });
  
  // Initialize settings form
  const settingsForm = useForm<z.infer<typeof settingsSchema>>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      workingHoursStart: agentData.workingHoursStart,
      workingHoursEnd: agentData.workingHoursEnd,
      transferKeyword: agentData.transferKeyword,
      errorMessage: agentData.errorMessage,
      isActive: agentData.isActive,
    },
  });
  
  // Get temperature value from the form
  const watchTemperature = configForm.watch("temperature");
  const watchModel = configForm.watch("model");
  
  // Temperature descriptions
  const getTemperatureDescription = (temp: number) => {
    if (temp < 0.4) return "Preciso e determinístico - Respostas consistentes e seguras";
    if (temp < 0.8) return "Balanceado - Mix de criatividade e precisão";
    return "Criativo e variado - Respostas mais diversificadas";
  };
  
  const handleSaveConfig = (values: z.infer<typeof configFormSchema>) => {
    toast({
      title: "Configurações salvas",
      description: "As configurações do agente foram salvas com sucesso",
    });
    console.log(values);
  };
  
  const handleSavePersonalization = (values: z.infer<typeof personalizationSchema>) => {
    toast({
      title: "Personalização salva",
      description: "As configurações de personalização foram salvas com sucesso",
    });
    console.log(values);
  };
  
  const handleSaveSettings = (values: z.infer<typeof settingsSchema>) => {
    toast({
      title: "Configurações salvas",
      description: "As configurações do agente foram salvas com sucesso",
    });
    console.log(values);
  };
  
  const handleDeleteAgent = () => {
    toast({
      title: "Agente excluído",
      description: "O agente foi excluído com sucesso",
      variant: "destructive",
    });
  };
  
  const handleUploadDocument = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setUploadedFiles(prev => [...prev, file.name]);
      toast({
        title: "Documento carregado",
        description: `O arquivo ${file.name} foi carregado com sucesso`,
      });
    }
  };
  
  // Handle tab change
  const handleTabChange = (value: string) => {
    setSelectedTab(value);
  };
  
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-aiDark">
        <DashboardSidebar />
        
        <div className="flex-1 p-6 overflow-auto">
          <div className="mb-8 flex items-center justify-between">
            <div className="flex items-center">
              <Link to="/agents" className="flex items-center text-aiGray hover:text-white mr-4">
                <ArrowLeft className="w-5 h-5 mr-2" />
                <span>Voltar</span>
              </Link>
              <h1 className="text-2xl font-bold text-gradient">{agentData.name}</h1>
              {agentData.isActive ? (
                <Badge className="ml-3 bg-green-500/20 text-green-400 border-green-500/30">Ativo</Badge>
              ) : (
                <Badge className="ml-3 bg-yellow-500/20 text-yellow-400 border-yellow-500/30">Inativo</Badge>
              )}
            </div>
            
            <Button 
              className={`${agentData.isActive ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'}`}
              onClick={() => {
                toast({
                  title: agentData.isActive ? "Agente desativado" : "Agente ativado",
                  description: agentData.isActive 
                    ? "O agente foi desativado e não responderá no WhatsApp" 
                    : "O agente foi ativado e já está respondendo no WhatsApp",
                });
                
                // Toggle isActive for demo
                agentData.isActive = !agentData.isActive;
              }}
            >
              <Zap className="w-4 h-4 mr-2" />
              {agentData.isActive ? "Desativar Agente" : "Ativar Agente"}
            </Button>
          </div>
          
          <Tabs value={selectedTab} onValueChange={handleTabChange} className="w-full">
            <TabsList className="grid grid-cols-5 max-w-4xl mb-8">
              <TabsTrigger value="configuracao">
                <Settings className="w-4 h-4 mr-2" />
                Configuração
              </TabsTrigger>
              <TabsTrigger value="personalizacao">
                <Bot className="w-4 h-4 mr-2" />
                Personalização
              </TabsTrigger>
              <TabsTrigger value="logica">
                <Zap className="w-4 h-4 mr-2" />
                Lógica
              </TabsTrigger>
              <TabsTrigger value="configuracoes">
                <Clock className="w-4 h-4 mr-2" />
                Configurações
              </TabsTrigger>
              {isAdminUser && (
                <TabsTrigger value="admin">
                  <Shield className="w-4 h-4 mr-2" />
                  Admin
                </TabsTrigger>
              )}
            </TabsList>
            
            {/* TAB 1: Configuração Básica */}
            <TabsContent value="configuracao" className="space-y-8">
              <div className="glass-morphism p-8 rounded-xl">
                <Form {...configForm}>
                  <form onSubmit={configForm.handleSubmit(handleSaveConfig)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={configForm.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center gap-2">
                              Nome do Agente
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                                  </TooltipTrigger>
                                  <TooltipContent className="w-80 p-3">
                                    <p>Nome que seu cliente verá durante a conversa no WhatsApp.</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            </FormLabel>
                            <FormControl>
                              <Input placeholder="Ex: João da Silva" {...field} />
                            </FormControl>
                            <FormDescription>
                              O nome que será exibido para os clientes
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={configForm.control}
                        name="tone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center gap-2">
                              Tom de Voz
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                                  </TooltipTrigger>
                                  <TooltipContent className="w-80 p-3">
                                    <p>Define como seu agente se comunica com os clientes.</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            </FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Selecione o tom de voz" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="direto">Direto e Objetivo</SelectItem>
                                <SelectItem value="consultivo">Consultivo</SelectItem>
                                <SelectItem value="informal">Informal</SelectItem>
                                <SelectItem value="engraçado">Engraçado</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormDescription>
                              Como o agente se comunica com os clientes
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={configForm.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Descrição</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Ex: Especialista em crédito consignado e FGTS"
                              className="min-h-[80px]"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            Breve descrição do papel e especialidade do agente
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={configForm.control}
                      name="model"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2">
                            Modelo
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                                </TooltipTrigger>
                                <TooltipContent className="w-80 p-3">
                                  <p>Modelos mais avançados têm melhor compreensão, mas custam mais por token.</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Selecione o modelo" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="gpt-4o">GPT-4o (Avançado)</SelectItem>
                              <SelectItem value="gpt-4o-mini">GPT-4o Mini (Recomendado)</SelectItem>
                              <SelectItem value="gpt-3.5-turbo">GPT-3.5 Turbo (Econômico)</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormDescription className="flex justify-between text-xs">
                            <span>Entrada: ${modelCosts[field.value as keyof typeof modelCosts]?.input || "0.00"}/1K tokens</span>
                            <span>Saída: ${modelCosts[field.value as keyof typeof modelCosts]?.output || "0.00"}/1K tokens</span>
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={configForm.control}
                      name="temperature"
                      render={({ field: { onChange, value } }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2">
                            Temperatura: {value.toFixed(1)}
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                                </TooltipTrigger>
                                <TooltipContent className="w-80 p-3">
                                  <p>Temperatura define a criatividade do agente. Valores mais baixos (0.2) geram respostas mais precisas e consistentes. Valores mais altos (1.0) geram respostas mais criativas e diversificadas.</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </FormLabel>
                          <div className="pt-2">
                            <Slider
                              defaultValue={[value]}
                              min={0.2}
                              max={1}
                              step={0.1}
                              onValueChange={([newVal]) => onChange(newVal)}
                            />
                          </div>
                          <div className="flex justify-between text-xs text-muted-foreground mt-1">
                            <span>0.2 (Preciso)</span>
                            <span>1.0 (Criativo)</span>
                          </div>
                          <p className="text-sm mt-2 text-muted-foreground italic">{getTemperatureDescription(value)}</p>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={configForm.control}
                        name="responseDelay"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center gap-2">
                              Delay de Resposta
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                                  </TooltipTrigger>
                                  <TooltipContent className="w-80 p-3">
                                    <p>Tempo para o agente começar a responder. Um pequeno delay torna a conversa mais natural.</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            </FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Selecione o tempo" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="2">2 segundos</SelectItem>
                                <SelectItem value="5">5 segundos</SelectItem>
                                <SelectItem value="10">10 segundos</SelectItem>
                                <SelectItem value="15">15 segundos</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={configForm.control}
                      name="objective"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2">
                            Objetivo do Agente
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                                </TooltipTrigger>
                                <TooltipContent className="w-80 p-3">
                                  <p>Defina claramente o que o agente deve realizar em suas interações.</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Ex: Realizar atendimento inicial para clientes interessados em crédito consignado..."
                              className="min-h-[100px]"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            O que o agente deve alcançar em suas interações
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={configForm.control}
                      name="keywords"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2">
                            Palavras-chave
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                                </TooltipTrigger>
                                <TooltipContent className="w-80 p-3">
                                  <p>Palavras que seu agente deve priorizar ao responder.</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Ex: consignado, empréstimo, FGTS, aposentado..."
                              className="min-h-[80px]"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            Palavras a priorizar ou evitar, separadas por vírgula
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="flex justify-between pt-4">
                      <Button 
                        type="button" 
                        variant="destructive"
                        onClick={handleDeleteAgent}
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Excluir Agente
                      </Button>
                      
                      <Button type="submit" className="ai-button">
                        <Save className="w-4 h-4 mr-2" />
                        Salvar Configurações
                      </Button>
                    </div>
                  </form>
                </Form>
              </div>
            </TabsContent>
            
            {/* TAB 2: Personalização */}
            <TabsContent value="personalizacao" className="space-y-8">
              <div className="glass-morphism p-8 rounded-xl">
                <Form {...personalizationForm}>
                  <form onSubmit={personalizationForm.handleSubmit(handleSavePersonalization)} className="space-y-6">
                    <FormField
                      control={personalizationForm.control}
                      name="instructions"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2">
                            Instruções Específicas
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                                </TooltipTrigger>
                                <TooltipContent className="w-80 p-3">
                                  <p>Instruções detalhadas sobre como o agente deve se comportar e responder.</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Descreva como o agente deve se comportar, o que deve fazer e como responder a situações específicas..."
                              className="min-h-[150px]"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            Instruções detalhadas que guiam o comportamento do agente
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={personalizationForm.control}
                        name="prohibitedPhrases"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center gap-2">
                              Frases Proibidas
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                                  </TooltipTrigger>
                                  <TooltipContent className="w-80 p-3">
                                    <p>Frases ou palavras que o agente deve evitar usar.</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            </FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Ex: garantido, certeza absoluta, aprovação imediata..."
                                className="min-h-[100px]"
                                {...field}
                              />
                            </FormControl>
                            <FormDescription>
                              Palavras ou frases que o agente não deve usar
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={personalizationForm.control}
                        name="priorityPhrases"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center gap-2">
                              Frases Prioritárias
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                                  </TooltipTrigger>
                                  <TooltipContent className="w-80 p-3">
                                    <p>Frases ou palavras que o agente deve priorizar ao responder.</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            </FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Ex: taxas competitivas, atendimento personalizado..."
                                className="min-h-[100px]"
                                {...field}
                              />
                            </FormControl>
                            <FormDescription>
                              Palavras ou frases que o agente deve priorizar
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="ai-card ai-glow">
                      <div className="p-6">
                        <h3 className="font-medium text-lg mb-2">Upload de Documentos</h3>
                        <p className="text-aiGray mb-4">
                          Faça upload de PDFs, manuais ou roteiros para treinar seu agente.
                        </p>
                        
                        <div className="border-2 border-dashed border-white/10 rounded-lg p-6 text-center">
                          <UploadIcon className="w-10 h-10 mx-auto mb-4 text-aiGray" />
                          <p className="text-sm text-aiGray mb-4">
                            Arraste arquivos aqui ou clique para selecionar
                          </p>
                          <div className="relative">
                            <Button variant="outline" className="relative z-10">
                              Selecionar Arquivo
                            </Button>
                            <input
                              type="file"
                              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                              onChange={handleUploadDocument}
                              accept=".pdf,.doc,.docx,.txt"
                            />
                          </div>
                        </div>
                        
                        {uploadedFiles.length > 0 && (
                          <div className="mt-4 space-y-2">
                            <h4 className="text-sm font-medium">Arquivos Carregados:</h4>
                            <ul className="space-y-2">
                              {uploadedFiles.map((file, index) => (
                                <li key={index} className="bg-white/5 px-3 py-2 rounded-md flex justify-between items-center">
                                  <div className="flex items-center space-x-2">
                                    <FileText className="h-4 w-4 text-blue-400" />
                                    <span className="text-sm">{file}</span>
                                  </div>
                                  <Button 
                                    variant="ghost" 
                                    size="sm" 
                                    className="h-6 w-6 p-0"
                                    onClick={() => {
                                      setUploadedFiles(prev => prev.filter(f => f !== file));
                                    }}
                                  >
                                    <Trash2 className="h-4 w-4 text-red-400" />
                                  </Button>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <Button type="submit" className="ai-button w-full mt-4">
                      <Save className="w-4 h-4 mr-2" />
                      Salvar Personalizações
                    </Button>
                  </form>
                </Form>
              </div>
            </TabsContent>
            
            {/* TAB 3: Lógica */}
            <TabsContent value="logica" className="space-y-8">
              <div className="glass-morphism p-8 rounded-xl">
                <h2 className="text-xl font-semibold mb-6">Lógica do Agente</h2>
                
                <div className="space-y-6">
                  <div className="bg-white/5 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="h-5 w-5 text-yellow-400 mt-0.5" />
                      <div>
                        <h4 className="font-medium">Visualização do Fluxo</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          Esta visualização simplifica o comportamento do agente. A IA ajusta dinamicamente suas respostas 
                          com base no contexto completo da conversa.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    {microflowSteps.map((step, index) => (
                      <Card key={step.id} className="glass-morphism border-none overflow-hidden">
                        <CardContent className="p-0">
                          <details className="group">
                            <summary className="flex justify-between items-center p-4 cursor-pointer">
                              <div className="flex items-center gap-3">
                                <div className="bg-white/10 h-8 w-8 rounded-full flex items-center justify-center">
                                  <span className="text-sm font-medium">{index + 1}</span>
                                </div>
                                <h3 className="font-medium">{step.title}</h3>
                              </div>
                              <div className="text-sm text-muted-foreground">Clique para expandir</div>
                            </summary>
                            <div className="p-4 pt-0 pl-[60px] space-y-3">
                              <p className="text-sm text-muted-foreground">{step.description}</p>
                              
                              <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                                <h4 className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Exemplo de Entrada</h4>
                                <p className="text-sm">{
                                  index === 0 ? "Olá, bom dia!" : 
                                  index === 1 ? "Gostaria de saber mais sobre crédito consignado" :
                                  index === 2 ? "Sou aposentado pelo INSS" :
                                  index === 3 ? "Qual o valor máximo que posso conseguir?" :
                                  index === 4 ? "E qual a taxa de juros?" :
                                  "Obrigado pelas informações"
                                }</p>
                              </div>
                              
                              <div className="bg-blue-900/20 rounded-lg p-3 border border-blue-500/30">
                                <h4 className="text-xs uppercase tracking-wider text-blue-400 mb-2">Exemplo de Saída</h4>
                                <p className="text-sm">{
                                  index === 0 ? "Olá, bom dia! Sou o Adão, assistente virtual especializado em crédito consignado e FGTS. Como posso ajudar você hoje?" : 
                                  index === 1 ? "Será um prazer falar sobre crédito consignado. Você é aposentado, pensionista ou servidor público?" :
                                  index === 2 ? "Ótimo! Para aposentados do INSS, oferecemos condições especiais. Posso verificar suas possibilidades de crédito. Você saberia me informar aproximadamente qual o valor do seu benefício mensal?" :
                                  index === 3 ? "Com base no seu benefício, você poderia conseguir até 40% do valor mensal em empréstimo consignado, que seria descontado diretamente na folha. Para valores exatos, nosso consultor pode fazer uma simulação personalizada para você." :
                                  index === 4 ? "Nossas taxas para aposentados do INSS são a partir de 1,6% ao mês, uma das mais competitivas do mercado. Gostaria que um de nossos consultores entrasse em contato para uma simulação personalizada?" :
                                  "Eu que agradeço pelo seu interesse! Um consultor entrará em contato em breve para auxiliá-lo com a simulação personalizada. Tenha um ótimo dia!"
                                }</p>
                              </div>
                            </div>
                          </details>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  
                  <div className="mt-8">
                    <h3 className="text-lg font-medium mb-4">Preview do Comportamento</h3>
                    <div className="ai-card">
                      <div className="p-5 space-y-4">
                        <div className="flex flex-col space-y-2">
                          <div className="bg-white/10 self-start max-w-[80%] rounded-lg px-4 py-2">
                            <p className="text-sm">Olá, gostaria de saber sobre empréstimo consignado</p>
                          </div>
                          <div className="bg-blue-600/30 self-end max-w-[80%] rounded-lg px-4 py-2">
                            <p className="text-sm">Olá! Sou Adão, especialista em crédito consignado. Posso ajudar você a entender as opções disponíveis. Você é aposentado, pensionista ou servidor público?</p>
                          </div>
                          <div className="bg-white/10 self-start max-w-[80%] rounded-lg px-4 py-2">
                            <p className="text-sm">Sou aposentada pelo INSS</p>
                          </div>
                          <div className="bg-blue-600/30 self-end max-w-[80%] rounded-lg px-4 py-2">
                            <p className="text-sm">Excelente! Para aposentados do INSS, temos condições especiais. Você saberia me informar o valor aproximado do seu benefício mensal? Isso me ajudará a explicar melhor suas opções.</p>
                          </div>
                        </div>
                        <div className="flex justify-center mt-4">
                          <Button variant="outline" className="text-sm">
                            Ver Conversa Completa
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            {/* TAB 4: Configurações */}
            <TabsContent value="configuracoes" className="space-y-8">
              <div className="glass-morphism p-8 rounded-xl">
                <Form {...settingsForm}>
                  <form onSubmit={settingsForm.handleSubmit(handleSaveSettings)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-6">
                        <h3 className="text-xl font-medium mb-4">Horário de Funcionamento</h3>
                        
                        <FormField
                          control={settingsForm.control}
                          name="workingHoursStart"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Horário de Início</FormLabel>
                              <FormControl>
                                <Input type="time" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={settingsForm.control}
                          name="workingHoursEnd"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Horário de Término</FormLabel>
                              <FormControl>
                                <Input type="time" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <div className="space-y-6">
                        <h3 className="text-xl font-medium mb-4">Transferência para Humano</h3>
                        <FormField
                          control={settingsForm.control}
                          name="transferKeyword"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="flex items-center gap-2">
                                Palavra-chave para Transferência
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                                    </TooltipTrigger>
                                    <TooltipContent className="w-80 p-3">
                                      <p>Quando o cliente usar esta palavra, o atendimento será transferido para um atendente humano.</p>
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                              </FormLabel>
                              <FormControl>
                                <Input placeholder="Ex: #humano" {...field} />
                              </FormControl>
                              <FormDescription>
                                Palavra ou frase que o cliente pode usar para falar com um humano
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                    
                    <FormField
                      control={settingsForm.control}
                      name="errorMessage"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Mensagem de Erro</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Ex: Desculpe, não entendi sua pergunta. Poderia reformular?"
                              className="min-h-[80px]"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            Mensagem que o agente enviará quando não entender uma pergunta
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={settingsForm.control}
                      name="isActive"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Status do Agente</FormLabel>
                            <FormDescription>
                              {field.value 
                                ? "O agente está ativo e respondendo no WhatsApp" 
                                : "O agente está inativo e não responderá mensagens"}
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <Button type="submit" className="ai-button w-full">
                      <Save className="w-4 h-4 mr-2" />
                      Salvar Configurações
                    </Button>
                  </form>
                </Form>
              </div>
            </TabsContent>
            
            {/* TAB 5: Admin (Visível apenas para gestores) */}
            {isAdminUser && (
              <TabsContent value="admin" className="space-y-8">
                <div className="glass-morphism p-8 rounded-xl">
                  <h2 className="text-xl font-semibold mb-6">Configurações de Administrador</h2>
                  
                  <div className="space-y-6">
                    <div className="bg-yellow-500/20 rounded-lg p-4 border border-yellow-500/30">
                      <div className="flex items-start gap-3">
                        <AlertTriangle className="h-5 w-5 text-yellow-400 mt-0.5" />
                        <div>
                          <h4 className="font-medium">Área Restrita</h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            Esta seção contém configurações avançadas que afetam o comportamento fundamental do agente.
                            Alterações aqui serão aplicadas a todos os agentes do mesmo tipo.
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Editor de Micro-prompts</h3>
                      <p className="text-sm text-muted-foreground">
                        Estes prompts são inseridos antes de cada interação do usuário para definir o comportamento base do agente.
                      </p>
                      
                      <div className="space-y-4">
                        <div className="ai-card">
                          <div className="p-4">
                            <h4 className="font-medium mb-2">Prompt Base</h4>
                            <Textarea 
                              className="min-h-[150px]"
                              defaultValue={`Você é um assistente ${agentType} chamado ${agentData.name} e trabalha para ${agentData.description}. Você deve ser ${agentData.tone}, fornecendo respostas claras e objetivas. Seu objetivo é ${agentData.objective}. Sempre priorize as seguintes palavras em suas respostas: ${agentData.keywords}.`}
                            />
                          </div>
                        </div>
                        
                        <div className="ai-card">
                          <div className="p-4">
                            <h4 className="font-medium mb-2">Lógica de Fallback</h4>
                            <Textarea 
                              className="min-h-[100px]"
                              placeholder="Se você não souber a resposta ou não entender a pergunta, diga que..."
                              defaultValue="Se você não souber a resposta ou não entender a pergunta, diga que precisa de mais informações para ajudar adequadamente. Não invente dados ou informações. Se o usuário pedir informações muito específicas sobre valores, peça para aguardar contato de um consultor humano."
                            />
                          </div>
                        </div>
                        
                        <div className="ai-card">
                          <div className="p-4">
                            <h4 className="font-medium mb-2">Arquivos Base por Padrão</h4>
                            <div className="space-y-2">
                              <div className="flex justify-between items-center bg-white/5 p-2 rounded">
                                <div className="flex items-center">
                                  <FileText className="h-4 w-4 text-blue-400 mr-2" />
                                  <span className="text-sm">Manual de Procedimentos.pdf</span>
                                </div>
                                <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                  <Trash2 className="h-4 w-4 text-red-400" />
                                </Button>
                              </div>
                              <div className="flex justify-between items-center bg-white/5 p-2 rounded">
                                <div className="flex items-center">
                                  <FileText className="h-4 w-4 text-blue-400 mr-2" />
                                  <span className="text-sm">Perguntas Frequentes.pdf</span>
                                </div>
                                <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                  <Trash2 className="h-4 w-4 text-red-400" />
                                </Button>
                              </div>
                              <div className="border-2 border-dashed border-white/10 rounded p-4 text-center">
                                <div className="relative">
                                  <Button variant="outline" className="relative z-10">
                                    <UploadIcon className="w-4 h-4 mr-2" />
                                    Adicionar Arquivo Base
                                  </Button>
                                  <input
                                    type="file"
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    accept=".pdf,.doc,.docx,.txt"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <Button className="ai-button w-full mt-4">
                        <Save className="w-4 h-4 mr-2" />
                        Salvar Configurações de Administrador
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>
            )}
          </Tabs>
        </div>
      </div>
    </SidebarProvider>
  );
}
