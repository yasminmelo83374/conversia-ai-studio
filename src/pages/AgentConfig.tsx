
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
import { ArrowLeft, Upload, Save, Bot, Trash2, MessageCircle } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "O nome do agente deve ter pelo menos 2 caracteres",
  }),
  description: z.string().min(10, {
    message: "A descrição deve ter pelo menos 10 caracteres",
  }),
  companyName: z.string().min(2, {
    message: "O nome da empresa deve ter pelo menos 2 caracteres",
  }),
  tone: z.string(),
  industry: z.string(),
  objective: z.string().min(10, {
    message: "O objetivo deve ter pelo menos 10 caracteres",
  }),
  keywords: z.string(),
  responseTime: z.string().optional(),
});

type AgentType = "financeiro" | "suporte" | "vendas";

export default function AgentConfig() {
  const { id } = useParams();
  const { toast } = useToast();
  const [selectedTab, setSelectedTab] = useState("configuracao");
  const [agentType, setAgentType] = useState<AgentType>("financeiro");
  
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
    companyName: "Financial Credit",
    tone: "consultivo",
    industry: id === "1" ? "financeiro" : id === "2" ? "suporte" : id === "3" ? "vendas" : "",
    objective: id === "1" 
      ? "Realizar atendimento inicial para clientes interessados em crédito consignado e FGTS, qualificar leads e transferir para consultores quando necessário." 
      : id === "2" 
      ? "Fornecer suporte técnico inicial, resolver problemas comuns e escalar para equipe técnica quando necessário." 
      : id === "3" 
      ? "Prospectar novos clientes B2B, entender necessidades e agendar demonstrações com vendedores." 
      : "",
    keywords: id === "1" ? "consignado, empréstimo, FGTS, aposentado, INSS" : id === "2" ? "suporte, ajuda, bug, problema, erro" : id === "3" ? "serviço, solução, orçamento, proposta, demonstração" : "",
    responseTime: "30"
  };
  
  // Initialize form with agent data
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: agentData.name,
      description: agentData.description,
      companyName: agentData.companyName,
      tone: agentData.tone,
      industry: agentData.industry,
      objective: agentData.objective,
      keywords: agentData.keywords,
      responseTime: agentData.responseTime,
    },
  });
  
  const handleSave = (values: z.infer<typeof formSchema>) => {
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
      const fileName = event.target.files[0].name;
      toast({
        title: "Documento carregado",
        description: `O arquivo ${fileName} foi carregado com sucesso`,
      });
    }
  };
  
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-aiDark">
        <DashboardSidebar />
        
        <div className="flex-1 p-6 overflow-auto">
          <div className="mb-8 flex items-center">
            <Link to="/dashboard" className="flex items-center text-aiGray hover:text-white mr-4">
              <ArrowLeft className="w-5 h-5 mr-2" />
              <span>Voltar</span>
            </Link>
            <h1 className="text-2xl font-bold">{agentData.name}</h1>
          </div>
          
          <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
            <TabsList className="grid grid-cols-3 max-w-md mb-8">
              <TabsTrigger value="configuracao">Configuração</TabsTrigger>
              <TabsTrigger value="treinamento">Treinamento</TabsTrigger>
              <TabsTrigger value="conversas">Conversas</TabsTrigger>
            </TabsList>
            
            <TabsContent value="configuracao" className="space-y-8">
              <div className="glass-morphism p-8 rounded-xl">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(handleSave)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nome do Agente</FormLabel>
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
                        control={form.control}
                        name="companyName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nome da Empresa</FormLabel>
                            <FormControl>
                              <Input placeholder="Ex: Financial Credit" {...field} />
                            </FormControl>
                            <FormDescription>
                              A empresa que o agente representa
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
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
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="tone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Tom de Voz</FormLabel>
                            <FormControl>
                              <select
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                                {...field}
                              >
                                <option value="consultivo">Consultivo</option>
                                <option value="direto">Direto</option>
                                <option value="animado">Animado</option>
                                <option value="técnico">Técnico</option>
                              </select>
                            </FormControl>
                            <FormDescription>
                              Como o agente se comunica com os clientes
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="industry"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Segmento de Atuação</FormLabel>
                            <FormControl>
                              <select
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                                {...field}
                                onChange={(e) => {
                                  field.onChange(e);
                                  setAgentType(e.target.value as AgentType);
                                }}
                              >
                                <option value="financeiro">Financeiro</option>
                                <option value="suporte">Suporte Técnico</option>
                                <option value="vendas">Vendas</option>
                                <option value="ecommerce">E-commerce</option>
                                <option value="saude">Saúde</option>
                                <option value="educacao">Educação</option>
                                <option value="juridico">Jurídico</option>
                                <option value="outros">Outros</option>
                              </select>
                            </FormControl>
                            <FormDescription>
                              Área de atuação do agente
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="objective"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Objetivo do Agente</FormLabel>
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
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="keywords"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Palavras-chave</FormLabel>
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
                      
                      <FormField
                        control={form.control}
                        name="responseTime"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Tempo de Resposta (segundos)</FormLabel>
                            <FormControl>
                              <Input type="number" placeholder="30" {...field} />
                            </FormControl>
                            <FormDescription>
                              Tempo médio ideal de resposta do agente
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
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
            
            <TabsContent value="treinamento" className="space-y-8">
              <div className="glass-morphism p-8 rounded-xl">
                <h2 className="text-xl font-semibold mb-6">Treinamento do Agente</h2>
                
                <div className="space-y-6">
                  <div className="ai-card ai-glow">
                    <div className="p-6">
                      <h3 className="font-medium text-lg mb-2">Upload de Documentos</h3>
                      <p className="text-aiGray mb-4">
                        Faça upload de PDFs, manuais ou roteiros para treinar seu agente.
                      </p>
                      
                      <div className="border-2 border-dashed border-white/10 rounded-lg p-8 text-center">
                        <Upload className="w-10 h-10 mx-auto mb-4 text-aiGray" />
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
                    </div>
                  </div>
                  
                  <div className="ai-card">
                    <div className="p-6">
                      <h3 className="font-medium text-lg mb-2">Instruções Diretas</h3>
                      <p className="text-aiGray mb-4">
                        Escreva instruções específicas para o comportamento do agente.
                      </p>
                      
                      <Textarea 
                        placeholder="Descreva como o agente deve se comportar, o que deve fazer e como responder a situações específicas..."
                        className="min-h-[150px]"
                      />
                      
                      <Button className="ai-button-outline mt-4">
                        Salvar Instruções
                      </Button>
                    </div>
                  </div>
                  
                  <div className="ai-card">
                    <div className="p-6">
                      <h3 className="font-medium text-lg mb-2">Treinamento Assistido por IA</h3>
                      <p className="text-aiGray mb-4">
                        Nossa IA irá sugerir melhorias e complementos para o treinamento do seu agente.
                      </p>
                      
                      <Button className="ai-button mt-4 w-full">
                        <Bot className="w-4 h-4 mr-2" />
                        Iniciar Treinamento Assistido
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="conversas" className="space-y-8">
              <div className="glass-morphism p-8 rounded-xl">
                <h2 className="text-xl font-semibold mb-6">Histórico de Conversas</h2>
                
                <div className="space-y-4">
                  <div className="ai-card hover:bg-white/5 transition-colors cursor-pointer">
                    <div className="p-4 flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">João Silva</h3>
                        <p className="text-sm text-aiGray">Última mensagem: Olá! Estou interessado no crédito consignado...</p>
                      </div>
                      <div className="text-right">
                        <span className="text-sm text-aiGray">10:42</span>
                        <div className="text-xs px-2 py-1 rounded-full bg-green-500/20 text-green-400 mt-1">Ativo</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="ai-card hover:bg-white/5 transition-colors cursor-pointer">
                    <div className="p-4 flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Maria Oliveira</h3>
                        <p className="text-sm text-aiGray">Última mensagem: Obrigada pelo atendimento!</p>
                      </div>
                      <div className="text-right">
                        <span className="text-sm text-aiGray">Ontem</span>
                        <div className="text-xs px-2 py-1 rounded-full bg-blue-500/20 text-blue-400 mt-1">Concluído</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="ai-card hover:bg-white/5 transition-colors cursor-pointer">
                    <div className="p-4 flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Pedro Santos</h3>
                        <p className="text-sm text-aiGray">Última mensagem: Vou pensar e retorno depois...</p>
                      </div>
                      <div className="text-right">
                        <span className="text-sm text-aiGray">Ontem</span>
                        <div className="text-xs px-2 py-1 rounded-full bg-yellow-500/20 text-yellow-400 mt-1">Em espera</div>
                      </div>
                    </div>
                  </div>
                  
                  <Button className="w-full ai-button-outline mt-4">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Ver Todas as Conversas
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </SidebarProvider>
  );
}
