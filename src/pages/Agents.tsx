
import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { AgentCard, AgentProps } from "@/components/agent-card";
import { Plus, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { CreateAgentModal } from "@/components/create-agent-modal";

export default function Agents() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  
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
  
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-aiDark">
        <DashboardSidebar />
        
        <div className="flex-1 p-6 overflow-auto">
          <div className="mb-8">
            <h1 className="text-2xl font-bold mb-2">Seus Agentes</h1>
            <p className="text-aiGray">Gerencie e crie novos agentes de IA</p>
          </div>
          
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center">
              <h2 className="text-xl font-semibold">Todos os Agentes</h2>
              <span className="ml-3 bg-white/10 text-aiGray text-xs px-2 py-1 rounded-full">{agents.length}</span>
            </div>
            <Button className="ai-button" onClick={openCreateModal}>
              <Plus className="w-4 h-4 mr-2" />
              Criar Agente
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {agents.map(agent => (
              <AgentCard key={agent.id} agent={agent} />
            ))}
            
            <div className="ai-card ai-glow border-dashed h-full">
              <div className="h-full flex flex-col items-center justify-center text-center p-6">
                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
                  <Plus className="w-8 h-8 text-aiGray" />
                </div>
                <h3 className="text-xl font-medium mb-2">Crie um Novo Agente</h3>
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
