
import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Plus,
  Users,
  Mail,
  MessageCircle, 
  User,
  BarChart,
  Settings
} from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { useToast } from "@/components/ui/use-toast";

export default function Team() {
  const { toast } = useToast();
  
  const teamMembers = [
    {
      id: "1",
      name: "Rafael Silva",
      email: "rafael.silva@gmail.com",
      role: "Administrador",
      avatar: "https://i.pravatar.cc/150?img=33",
      conversationCount: 145,
      conversionRate: 28,
      status: "online"
    },
    {
      id: "2",
      name: "Ana Oliveira",
      email: "ana.oliveira@gmail.com",
      role: "Agente",
      avatar: "https://i.pravatar.cc/150?img=23",
      conversationCount: 124,
      conversionRate: 24,
      status: "online"
    },
    {
      id: "3",
      name: "Carlos Pereira",
      email: "carlos.pereira@gmail.com",
      role: "Agente",
      avatar: "https://i.pravatar.cc/150?img=11",
      conversationCount: 98,
      conversionRate: 21,
      status: "offline"
    },
    {
      id: "4",
      name: "Mariana Santos",
      email: "mariana.santos@gmail.com",
      role: "Supervisor",
      avatar: "https://i.pravatar.cc/150?img=25",
      conversationCount: 112,
      conversionRate: 26,
      status: "offline"
    }
  ];
  
  const handleAddMember = () => {
    toast({
      title: "Nova funcionalidade",
      description: "A adição de membros estará disponível em breve!",
    });
  };
  
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-aiDark">
        <DashboardSidebar />
        
        <div className="flex-1 p-6 overflow-auto">
          <div className="mb-8">
            <h1 className="text-2xl font-bold mb-2">Equipe</h1>
            <p className="text-aiGray">Gerencie os membros da sua equipe e suas permissões</p>
          </div>
          
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center">
              <h2 className="text-xl font-semibold">Membros</h2>
              <span className="ml-3 bg-white/10 text-aiGray text-xs px-2 py-1 rounded-full">{teamMembers.length}</span>
            </div>
            <Button className="ai-button" onClick={handleAddMember}>
              <Plus className="w-4 h-4 mr-2" />
              Adicionar Membro
            </Button>
          </div>
          
          <div className="glass-morphism rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="px-6 py-4 text-left text-sm text-aiGray">Membro</th>
                    <th className="px-6 py-4 text-left text-sm text-aiGray">Função</th>
                    <th className="px-6 py-4 text-left text-sm text-aiGray">Status</th>
                    <th className="px-6 py-4 text-left text-sm text-aiGray">Conversas</th>
                    <th className="px-6 py-4 text-left text-sm text-aiGray">Taxa de Conversão</th>
                    <th className="px-6 py-4 text-right text-sm text-aiGray">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {teamMembers.map((member) => (
                    <tr key={member.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <Avatar className="mr-3">
                            <img 
                              src={member.avatar} 
                              alt={member.name}
                              className="w-10 h-10 rounded-full"
                            />
                          </Avatar>
                          <div>
                            <div className="font-medium">{member.name}</div>
                            <div className="text-sm text-aiGray flex items-center">
                              <Mail className="w-3 h-3 mr-1" />
                              {member.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <Badge className={member.role === "Administrador" ? "bg-purple-500/20 text-purple-400" : member.role === "Supervisor" ? "bg-blue-500/20 text-blue-400" : "bg-green-500/20 text-green-400"}>
                          {member.role}
                        </Badge>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className={`w-2 h-2 rounded-full mr-2 ${member.status === "online" ? "bg-green-400" : "bg-gray-400"}`}></div>
                          <span className="text-sm">{member.status === "online" ? "Online" : "Offline"}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <MessageCircle className="w-4 h-4 mr-2 text-aiBlue" />
                          {member.conversationCount}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <BarChart className="w-4 h-4 mr-2 text-green-400" />
                          {member.conversionRate}%
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Button variant="ghost" size="sm">
                          <User className="w-4 h-4 text-aiBlue" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Settings className="w-4 h-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="p-4 border-t border-white/5 flex justify-between items-center">
              <div className="text-sm text-aiGray">
                Exibindo {teamMembers.length} membros
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" disabled>Anterior</Button>
                <Button variant="outline" size="sm" disabled>Próximo</Button>
              </div>
            </div>
          </div>
          
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-4">Convites Pendentes</h3>
            <div className="glass-morphism rounded-xl p-6 flex items-center justify-center h-32">
              <p className="text-aiGray text-sm">Nenhum convite pendente</p>
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}
