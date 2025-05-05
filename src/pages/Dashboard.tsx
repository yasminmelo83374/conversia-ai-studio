
import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { StatCard } from "@/components/stat-card";
import { AgentCard, AgentProps } from "@/components/agent-card";
import { ConversationPreview } from "@/components/conversation-preview";
import { 
  Bot, 
  MessageCircle, 
  Users, 
  BarChart,
  ArrowRight, 
  Plus
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

export default function Dashboard() {
  const { toast } = useToast();
  const [activeConversation, setActiveConversation] = useState({
    messages: [
      {
        id: "1",
        content: "Olá! Estou interessado no crédito consignado. Como funciona?",
        sender: "user",
        timestamp: "10:42"
      },
      {
        id: "2",
        content: "Olá, João! Tudo bem? Sou o Adão, assistente virtual da Financial Credit. O crédito consignado é um empréstimo com desconto direto na folha, com taxas a partir de 1,7% ao mês. Você é servidor público, militar ou aposentado?",
        sender: "bot",
        timestamp: "10:42"
      },
      {
        id: "3",
        content: "Sou aposentado pelo INSS, recebo cerca de R$ 2.800 por mês.",
        sender: "user",
        timestamp: "10:44"
      },
      {
        id: "4",
        content: "Excelente, João! Aposentados pelo INSS podem comprometer até 35% da renda com o consignado. No seu caso, o valor máximo da parcela seria aproximadamente R$ 980. Posso fazer uma simulação rápida para você? Precisaria saber quanto aproximadamente você gostaria de receber emprestado.",
        sender: "bot",
        timestamp: "10:45"
      },
      {
        id: "5",
        content: "Quero R$ 10.000. Mas queria entender melhor como funciona, não quero ter problemas. Não gosto dessas coisas automáticas.",
        sender: "user",
        timestamp: "10:47"
      },
    ] as any[]
  });
  
  const handleTakeOver = () => {
    const newMessage = {
      id: "6",
      content: "Entendo sua preocupação, João. Sou a Ana da equipe de atendimento. Posso te explicar pessoalmente como funciona o processo e tirar todas as suas dúvidas para que você se sinta seguro. O que você gostaria de saber especificamente sobre o processo?",
      sender: "agent",
      timestamp: "10:49"
    };
    
    setActiveConversation(prev => ({
      ...prev,
      messages: [...prev.messages, newMessage]
    }));
    
    toast({
      title: "Você assumiu a conversa",
      description: "Agora você está conversando diretamente com João Silva",
    });
  };
  
  const handleSendMessage = (message: string) => {
    const newMessage = {
      id: String(activeConversation.messages.length + 1),
      content: message,
      sender: "agent",
      timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
    };
    
    setActiveConversation(prev => ({
      ...prev,
      messages: [...prev.messages, newMessage]
    }));
  };
  
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
    }
  ];
  
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-aiDark">
        <DashboardSidebar />
        
        <div className="flex-1 p-6 overflow-auto">
          <div className="mb-8">
            <h1 className="text-2xl font-bold mb-2">Bem-vindo, Rafael</h1>
            <p className="text-aiGray">Veja um resumo de suas atividades e agentes</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard 
              title="Total de Agentes" 
              value="3"
              change={{ value: 50, isPositive: true }}
              icon={Bot}
              color="blue"
            />
            <StatCard 
              title="Conversas Ativas" 
              value="12"
              change={{ value: 25, isPositive: true }}
              icon={MessageCircle}
              color="purple"
            />
            <StatCard 
              title="Clientes Atendidos" 
              value="523"
              change={{ value: 15, isPositive: true }}
              icon={Users}
              color="green"
            />
            <StatCard 
              title="Taxa de Conversão" 
              value="24%"
              change={{ value: 5, isPositive: true }}
              icon={BarChart}
              color="yellow"
            />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Seus Agentes</h2>
                <Button className="ai-button">
                  <Plus className="w-4 h-4 mr-2" />
                  Criar Agente
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {agents.map(agent => (
                  <AgentCard key={agent.id} agent={agent} />
                ))}
                
                <div className="ai-card ai-glow border-dashed">
                  <div className="h-full flex flex-col items-center justify-center text-center p-6">
                    <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
                      <Plus className="w-8 h-8 text-aiGray" />
                    </div>
                    <h3 className="text-xl font-medium mb-2">Crie um Novo Agente</h3>
                    <p className="text-sm text-aiGray mb-6 max-w-xs">
                      Personalize um agente para seu negócio em minutos, com treinamento e configuração simples.
                    </p>
                    <Button className="ai-button-outline">
                      <span>Começar</span>
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Atividade Recente</h2>
                <Button variant="link" className="text-aiBlue">
                  Ver Tudo
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
              
              <div className="glass-morphism rounded-xl p-6">
                <div className="space-y-4">
                  <ActivityItem 
                    icon={MessageCircle}
                    title="Nova conversa iniciada"
                    description="João Silva começou uma conversa com Adão"
                    time="10:42"
                  />
                  <ActivityItem 
                    icon={Users}
                    title="Atendente assumiu conversa"
                    description="Ana Silva assumiu o atendimento de Maria Oliveira"
                    time="09:15"
                  />
                  <ActivityItem 
                    icon={Bot}
                    title="Agente criado"
                    description="O agente Lucas foi criado e está em treinamento"
                    time="Ontem"
                  />
                  <ActivityItem 
                    icon={BarChart}
                    title="Relatório semanal disponível"
                    description="O relatório de desempenho da semana foi gerado"
                    time="Ontem"
                  />
                </div>
              </div>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold mb-6">Conversas Ativas</h2>
              <ConversationPreview 
                messages={activeConversation.messages}
                onSendMessage={handleSendMessage}
                onTakeOver={handleTakeOver}
              />
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}

function ActivityItem({ 
  icon: Icon, 
  title, 
  description, 
  time 
}: { 
  icon: any; 
  title: string; 
  description: string; 
  time: string 
}) {
  return (
    <div className="flex gap-4 items-start py-2">
      <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0">
        <Icon className="w-4 h-4 text-aiBlue" />
      </div>
      <div className="flex-grow">
        <h4 className="text-sm font-medium">{title}</h4>
        <p className="text-xs text-aiGray">{description}</p>
      </div>
      <div className="text-xs text-aiGray">{time}</div>
    </div>
  );
}
