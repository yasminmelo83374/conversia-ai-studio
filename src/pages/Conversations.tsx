
import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { ConversationPreview } from "@/components/conversation-preview";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Search, Filter } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

export default function Conversations() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("ativas");
  
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
    ]
  });
  
  const conversations = [
    {
      id: "1",
      name: "João Silva",
      lastMessage: "Quero R$ 10.000. Mas queria entender melhor como funciona...",
      time: "10:47",
      status: "active",
      agent: "Adão",
      unread: 1
    },
    {
      id: "2",
      name: "Maria Oliveira",
      lastMessage: "Obrigada pelo atendimento, vou pensar e retorno.",
      time: "09:32",
      status: "active",
      agent: "Clara",
      unread: 0
    },
    {
      id: "3",
      name: "Carlos Pereira",
      lastMessage: "Preciso de ajuda com a instalação do software.",
      time: "Ontem",
      status: "active",
      agent: "Clara",
      unread: 0
    }
  ];
  
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
  
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-aiDark">
        <DashboardSidebar />
        
        <div className="flex-1 flex">
          <div className="w-1/3 border-r border-white/5 p-4 overflow-auto">
            <div className="mb-6">
              <h1 className="text-xl font-bold mb-2">Conversas</h1>
              <div className="relative">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-aiGray" />
                <input 
                  type="text" 
                  placeholder="Buscar conversas..."
                  className="ai-input pl-10 w-full"
                />
              </div>
            </div>
            
            <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
              <TabsList className="grid grid-cols-3 w-full bg-white/5">
                <TabsTrigger value="ativas" className="data-[state=active]:bg-aiBlue/20">
                  <span className="flex items-center gap-2">
                    Ativas
                    <Badge className="bg-aiBlue/20 text-aiBlue">{conversations.length}</Badge>
                  </span>
                </TabsTrigger>
                <TabsTrigger value="arquivadas" className="data-[state=active]:bg-aiBlue/20">Arquivadas</TabsTrigger>
                <TabsTrigger value="todas" className="data-[state=active]:bg-aiBlue/20">Todas</TabsTrigger>
              </TabsList>
            </Tabs>
            
            <div className="space-y-2">
              {conversations.map(conv => (
                <div 
                  key={conv.id}
                  className={`p-3 rounded-lg cursor-pointer transition-all hover:bg-white/5 ${conv.id === "1" ? "bg-white/10" : ""}`}
                >
                  <div className="flex justify-between items-start mb-1">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-aiPurple/30 flex items-center justify-center mr-2">
                        <MessageCircle className="w-4 h-4 text-aiPurple" />
                      </div>
                      <span className="font-medium">{conv.name}</span>
                    </div>
                    <span className="text-xs text-aiGray">{conv.time}</span>
                  </div>
                  
                  <div className="flex items-center ml-10">
                    <span className="text-xs text-aiBlue mr-2">{conv.agent}:</span>
                    <p className="text-xs text-aiGray truncate">{conv.lastMessage}</p>
                  </div>
                  
                  {conv.unread > 0 && (
                    <div className="flex justify-end">
                      <span className="bg-aiBlue text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                        {conv.unread}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          <div className="w-2/3 p-4">
            <ConversationPreview 
              messages={activeConversation.messages}
              onSendMessage={handleSendMessage}
              onTakeOver={handleTakeOver}
            />
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}
