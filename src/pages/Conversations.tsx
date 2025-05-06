
import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { ConversationPreview } from "@/components/conversation-preview";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Search,
  Plus,
  User,
  Bot,
  Clock,
  ChevronDown,
  Filter,
  MoreHorizontal
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface Message {
  id: string;
  content: string;
  sender: "agent" | "user" | "bot";
  timestamp: string;
}

interface Conversation {
  id: string;
  title: string;
  agent: {
    name: string;
    type: string;
  };
  lastMessage: string;
  lastActive: string;
  unread: number;
  status: "active" | "completed" | "pending";
  messages: Message[];
}

export default function Conversations() {
  const { toast } = useToast();
  
  // Mock conversation data
  const conversations: Conversation[] = [
    {
      id: "1",
      title: "Dúvida sobre empréstimo consignado",
      agent: {
        name: "Adão",
        type: "financeiro"
      },
      lastMessage: "Enviei os documentos solicitados. Aguardo retorno.",
      lastActive: "há 5 minutos",
      unread: 2,
      status: "active",
      messages: [
        {
          id: "1-1",
          content: "Olá, gostaria de saber mais sobre o empréstimo consignado.",
          sender: "user",
          timestamp: "10:15"
        },
        {
          id: "1-2",
          content: "Claro! Para simular um empréstimo consignado, precisarei de algumas informações. Você é servidor público, militar, ou aposentado/pensionista do INSS?",
          sender: "agent",
          timestamp: "10:16"
        },
        {
          id: "1-3",
          content: "Sou servidor público federal.",
          sender: "user",
          timestamp: "10:18"
        },
        {
          id: "1-4",
          content: "Ótimo! Para avançarmos, vou precisar do seu CPF, data de nascimento, e valor aproximado que você deseja solicitar. Pode me informar esses dados?",
          sender: "agent",
          timestamp: "10:20"
        },
        {
          id: "1-5",
          content: "CPF 123.456.789-00, nascimento 15/05/1975 e gostaria de R$ 15.000,00",
          sender: "user",
          timestamp: "10:22"
        },
        {
          id: "1-6",
          content: "Obrigado pelas informações! Para prosseguir com a simulação, preciso que você envie um comprovante de renda recente (contracheque dos últimos 30 dias) e um documento de identificação com foto (RG ou CNH). Você pode enviar esses documentos?",
          sender: "agent",
          timestamp: "10:25"
        },
        {
          id: "1-7",
          content: "Enviei os documentos solicitados. Aguardo retorno.",
          sender: "user",
          timestamp: "10:30"
        },
      ]
    },
    {
      id: "2",
      title: "Problema com instalação do software",
      agent: {
        name: "Clara",
        type: "suporte"
      },
      lastMessage: "Já reiniciei o computador como solicitado, mas o erro persiste.",
      lastActive: "há 2 horas",
      unread: 0,
      status: "pending",
      messages: [
        {
          id: "2-1",
          content: "Estou com problemas para instalar o software. Aparece um erro código 0x80070057.",
          sender: "user",
          timestamp: "15:05"
        },
        {
          id: "2-2",
          content: "Entendo sua frustração. Esse código de erro geralmente ocorre quando há problemas com permissões ou arquivos corrompidos. Vamos tentar solucionar isso. Primeiro, você poderia fechar o instalador, reiniciar o computador e tentar novamente?",
          sender: "agent",
          timestamp: "15:08"
        },
        {
          id: "2-3",
          content: "Já reiniciei o computador como solicitado, mas o erro persiste.",
          sender: "user",
          timestamp: "15:20"
        }
      ]
    },
    {
      id: "3",
      title: "Cotação de serviços para empresa",
      agent: {
        name: "Lucas",
        type: "vendas"
      },
      lastMessage: "Os valores estão dentro do nosso orçamento. Podemos agendar uma reunião para discutir os detalhes?",
      lastActive: "ontem",
      unread: 0,
      status: "completed",
      messages: [
        {
          id: "3-1",
          content: "Gostaria de solicitar uma cotação para implementação do sistema em nossa empresa.",
          sender: "user",
          timestamp: "09:30"
        },
        {
          id: "3-2",
          content: "Bom dia! Ficarei feliz em ajudar com a cotação. Para fornecer os valores mais precisos, preciso saber: quantos usuários utilizarão o sistema, quais módulos são de interesse e se vocês precisarão de treinamento para a equipe?",
          sender: "agent",
          timestamp: "09:35"
        },
        {
          id: "3-3",
          content: "Serão cerca de 50 usuários. Precisamos dos módulos de gestão de estoque, financeiro e vendas. E sim, precisaremos de treinamento para pelo menos 5 pessoas da equipe.",
          sender: "user",
          timestamp: "09:45"
        },
        {
          id: "3-4",
          content: "Obrigado pelas informações! Com base no que você compartilhou, estou enviando uma cotação detalhada com os valores para cada módulo, licenças para 50 usuários e treinamento para 5 pessoas. O investimento total seria de R$ 25.000,00, incluindo 3 meses de suporte gratuito após a implementação.",
          sender: "agent",
          timestamp: "10:15"
        },
        {
          id: "3-5",
          content: "Os valores estão dentro do nosso orçamento. Podemos agendar uma reunião para discutir os detalhes?",
          sender: "user",
          timestamp: "11:05"
        }
      ]
    }
  ];
  
  const startNewConversation = () => {
    toast({
      title: "Nova funcionalidade",
      description: "A criação de novas conversas será disponibilizada em breve!",
    });
  };
  
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-aiDark">
        <DashboardSidebar />
        
        <div className="flex-1 flex overflow-hidden">
          {/* Conversation list */}
          <div className="w-1/3 border-r border-white/10 p-4 overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold">Conversas</h1>
              <Button onClick={startNewConversation} className="ai-button" size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Nova
              </Button>
            </div>
            
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-aiGray" size={16} />
              <Input
                placeholder="Buscar conversas..."
                className="pl-10 bg-white/5 border-white/10"
              />
            </div>
            
            <div className="flex items-center justify-between mb-4">
              <Button variant="ghost" size="sm" className="text-aiGray flex items-center">
                <Filter className="w-4 h-4 mr-2" />
                Filtrar
                <ChevronDown className="w-3 h-3 ml-1" />
              </Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="text-aiGray">
                    <Clock className="w-4 h-4 mr-2" />
                    Recentes
                    <ChevronDown className="w-3 h-3 ml-1" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>Mais recentes</DropdownMenuItem>
                  <DropdownMenuItem>Mais antigos</DropdownMenuItem>
                  <DropdownMenuItem>Não lidas</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            
            <div className="space-y-2">
              {conversations.map(conversation => (
                <div 
                  key={conversation.id} 
                  className={`p-3 rounded-lg transition-colors cursor-pointer ${
                    conversation.id === "1" ? "bg-white/10" : "hover:bg-white/5"
                  }`}
                >
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-medium truncate flex-1">{conversation.title}</h3>
                    <span className="text-xs text-aiGray">{conversation.lastActive}</span>
                  </div>
                  
                  <div className="flex items-center text-xs text-aiGray mb-2">
                    <span className="flex items-center">
                      <Bot className="w-3 h-3 mr-1" />
                      {conversation.agent.name}
                    </span>
                    <span className="mx-2">•</span>
                    <Badge 
                      className={
                        conversation.status === "active" ? "bg-green-500/20 text-green-400 text-xs" : 
                        conversation.status === "pending" ? "bg-yellow-500/20 text-yellow-400 text-xs" :
                        "bg-blue-500/20 text-blue-400 text-xs"
                      }
                    >
                      {conversation.status === "active" ? "Ativa" : 
                       conversation.status === "pending" ? "Pendente" : "Finalizada"}
                    </Badge>
                  </div>
                  
                  <p className="text-sm text-aiGray truncate">{conversation.lastMessage}</p>
                  
                  {conversation.unread > 0 && (
                    <div className="flex justify-end mt-1">
                      <span className="bg-aiBlue text-xs px-1.5 py-0.5 rounded-full">
                        {conversation.unread}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          {/* Conversation detail */}
          <div className="flex-1 flex flex-col">
            {/* Header */}
            <div className="border-b border-white/10 p-4 flex justify-between items-center">
              <div className="flex items-center">
                <Avatar className="mr-3">
                  <div className="w-10 h-10 rounded-full bg-aiBlue/20 flex items-center justify-center">
                    <User className="w-5 h-5 text-aiBlue" />
                  </div>
                </Avatar>
                <div>
                  <h2 className="font-medium">Dúvida sobre empréstimo consignado</h2>
                  <div className="flex items-center text-xs text-aiGray">
                    <span className="flex items-center">
                      <Bot className="w-3 h-3 mr-1" />
                      Adão
                    </span>
                    <span className="mx-2">•</span>
                    <Badge className="bg-green-500/20 text-green-400 text-xs">
                      Ativa
                    </Badge>
                  </div>
                </div>
              </div>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Transferir conversa</DropdownMenuItem>
                  <DropdownMenuItem>Marcar como finalizada</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-red-500">Excluir conversa</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {conversations[0].messages.map(message => (
                <div 
                  key={message.id} 
                  className={`flex ${message.sender === "user" ? "justify-end" : ""}`}
                >
                  <div 
                    className={`max-w-[80%] rounded-2xl p-3 ${
                      message.sender === "user" 
                        ? "bg-aiBlue text-white rounded-tr-none" 
                        : "bg-white/10 rounded-tl-none"
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <div className="text-right mt-1">
                      <span className={`text-xs ${message.sender === "user" ? "text-white/70" : "text-aiGray"}`}>
                        {message.timestamp}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Input */}
            <div className="p-4 border-t border-white/10">
              <div className="relative">
                <Input 
                  placeholder="Digite uma mensagem..." 
                  className="pr-24 bg-white/5 border-white/10"
                />
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex space-x-1">
                  <Button size="sm" variant="ghost" className="h-7 w-7 p-0 rounded-full">
                    <Plus className="w-4 h-4" />
                  </Button>
                  <Button size="sm" className="h-7 px-3 bg-aiBlue hover:bg-aiBlue/80">
                    Enviar
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}
