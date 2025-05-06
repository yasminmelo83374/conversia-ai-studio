
import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { AgentCard, AgentProps } from "@/components/agent-card";
import { Plus, ArrowRight, Search, Filter, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { CreateAgentModal } from "@/components/create-agent-modal";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

export default function Agents() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Mock agents data
  const agents: AgentProps[] = [
    {
      id: "1",
      name: "Adão",
      description: "Especialista em crédito consignado e FGTS",
      type: "financeiro",
      status: "active",
      messageCount: 1823,
      conversionRate: 24,
      lastActive: "há 2 minutos"
    },
    {
      id: "2",
      name: "Clara",
      description: "Suporte técnico para empresas de software",
      type: "suporte",
      status: "inactive",
      messageCount: 452,
      conversionRate: 18,
      lastActive: "há 2 dias"
    },
    {
      id: "3",
      name: "Lucas",
      description: "Vendedor B2B para serviços",
      type: "vendas",
      status: "training",
      messageCount: 0,
      conversionRate: 0,
      lastActive: "nunca"
    },
    {
      id: "4",
      name: "Lia",
      description: "Atendimento para e-commerce e pós-venda",
      type: "suporte",
      status: "active",
      messageCount: 356,
      conversionRate: 22,
      lastActive: "há 1 hora"
    }
  ];
  
  const openCreateModal = () => {
    setIsCreateModalOpen(true);
  };

  // Filter agents based on search query
  const filteredAgents = agents.filter(agent => 
    agent.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    agent.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    agent.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Stats data
  const stats = [
    { label: "Total de Agentes", value: agents.length },
    { label: "Ativos", value: agents.filter(a => a.status === "active").length },
    { label: "Mensagens", value: agents.reduce((sum, a) => sum + a.messageCount, 0).toLocaleString() },
    { label: "Taxa Média de Conversão", value: `${Math.round(agents.reduce((sum, a) => sum + a.conversionRate, 0) / agents.length)}%` }
  ];
  
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-aiDark">
        <DashboardSidebar />
        
        <div className="flex-1 p-6 overflow-auto">
          <div className="mb-8 flex flex-col gap-2">
            <h1 className="text-3xl font-bold text-gradient">Seus Agentes</h1>
            <p className="text-aiGray">Crie, gerencie e monitore seus agentes de IA para WhatsApp</p>
          </div>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, index) => (
              <Card key={index} className="glass-morphism border-none overflow-hidden">
                <CardContent className="p-4">
                  <div className="text-xs uppercase text-aiGray tracking-wider">{stat.label}</div>
                  <div className="text-2xl font-bold mt-1">{stat.value}</div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* Search and filters */}
          <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 mb-6">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-aiGray" />
              <Input 
                className="pl-10 bg-white/5 border-white/10"
                placeholder="Buscar agentes..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex gap-3">
              <Button variant="outline" className="bg-transparent border-white/10 hover:bg-white/5">
                <Filter className="w-4 h-4 mr-2" />
                Filtros
              </Button>
              <Button className="ai-button" onClick={openCreateModal}>
                <Plus className="w-4 h-4 mr-2" />
                Criar Agente
              </Button>
            </div>
          </div>
          
          {/* Agent cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAgents.map(agent => (
              <AgentCard key={agent.id} agent={agent} />
            ))}
            
            <div className="ai-card ai-glow border-dashed h-full hover:bg-white/5 transition-all cursor-pointer" onClick={openCreateModal}>
              <div className="h-full flex flex-col items-center justify-center text-center p-6">
                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
                  <Plus className="w-8 h-8 text-aiGray" />
                </div>
                <h3 className="text-xl font-medium mb-2">Criar Novo Agente</h3>
                <p className="text-sm text-aiGray mb-6 max-w-xs">
                  Personalize um agente para seu negócio em minutos, com treinamento e configuração simples.
                </p>
                <Button className="ai-button-outline" onClick={openCreateModal}>
                  <span>Começar</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <CreateAgentModal 
        open={isCreateModalOpen}
        onOpenChange={setIsCreateModalOpen}
      />
    </SidebarProvider>
  );
}
