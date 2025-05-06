
import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MicroPrompts } from "@/components/manager/micro-prompts";
import { GlobalSettings } from "@/components/manager/global-settings";
import { KnowledgeBase } from "@/components/manager/knowledge-base";
import { DefaultBehaviors } from "@/components/manager/default-behaviors";
import { AgentLogs } from "@/components/manager/agent-logs";
import { Shield, Settings, FileText, MessageCircle, History } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { useEffect } from "react";

export default function ManagerControl() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("micro-prompts");
  
  // Verificar se o usuário tem permissão para acessar esta página
  useEffect(() => {
    const userRole = sessionStorage.getItem('userRole');
    
    if (userRole !== 'manager') {
      toast({
        title: "Acesso negado",
        description: "Você não tem permissão para acessar esta área.",
        variant: "destructive",
      });
      navigate('/dashboard');
    }
  }, [navigate, toast]);
  
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-aiDark">
        <DashboardSidebar />
        
        <div className="flex-1 p-6 overflow-auto">
          <div className="mb-8 flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Shield className="w-6 h-6 text-aiPurple" />
              <h1 className="text-3xl font-bold text-gradient">Painel do Gestor</h1>
            </div>
            <p className="text-aiGray">Controle total sobre o comportamento dos agentes de IA</p>
          </div>
          
          <Card className="glass-morphism border-none overflow-hidden p-1">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="w-full bg-transparent justify-start border-b border-white/10 rounded-none p-0 h-auto">
                <TabsTrigger 
                  value="micro-prompts" 
                  className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-aiPurple rounded-none py-4 px-6"
                >
                  <Shield className="w-4 h-4 mr-2" />
                  Micro-Prompts
                </TabsTrigger>
                <TabsTrigger 
                  value="global-settings" 
                  className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-aiPurple rounded-none py-4 px-6"
                >
                  <Settings className="w-4 h-4 mr-2" />
                  Configurações Globais
                </TabsTrigger>
                <TabsTrigger 
                  value="knowledge-base" 
                  className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-aiPurple rounded-none py-4 px-6"
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Base de Conhecimento
                </TabsTrigger>
                <TabsTrigger 
                  value="default-behaviors" 
                  className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-aiPurple rounded-none py-4 px-6"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Comportamentos Padrão
                </TabsTrigger>
                <TabsTrigger 
                  value="agent-logs" 
                  className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-aiPurple rounded-none py-4 px-6"
                >
                  <History className="w-4 h-4 mr-2" />
                  Logs & Histórico
                </TabsTrigger>
              </TabsList>
              
              <div className="p-6">
                <TabsContent value="micro-prompts" className="mt-0">
                  <MicroPrompts />
                </TabsContent>
                <TabsContent value="global-settings" className="mt-0">
                  <GlobalSettings />
                </TabsContent>
                <TabsContent value="knowledge-base" className="mt-0">
                  <KnowledgeBase />
                </TabsContent>
                <TabsContent value="default-behaviors" className="mt-0">
                  <DefaultBehaviors />
                </TabsContent>
                <TabsContent value="agent-logs" className="mt-0">
                  <AgentLogs />
                </TabsContent>
              </div>
            </Tabs>
          </Card>
        </div>
      </div>
    </SidebarProvider>
  );
}
