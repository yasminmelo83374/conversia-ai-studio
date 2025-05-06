
import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  User,
  Building,
  Key,
  Bell,
  Shield,
  CreditCard,
  ChevronRight,
  Mail,
  Phone,
  Globe,
  Users,
  HardDrive
} from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

export default function Settings() {
  const { toast } = useToast();
  
  const saveSettings = () => {
    toast({
      title: "Configurações salvas",
      description: "Suas alterações foram salvas com sucesso.",
    });
  };
  
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-aiDark">
        <DashboardSidebar />
        
        <div className="flex-1 p-6 overflow-auto">
          <div className="mb-8">
            <h1 className="text-2xl font-bold mb-2">Configurações</h1>
            <p className="text-aiGray">Gerencie as configurações da sua conta e empresa</p>
          </div>
          
          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid grid-cols-5 mb-8">
              <TabsTrigger value="profile" className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>Perfil</span>
              </TabsTrigger>
              <TabsTrigger value="company" className="flex items-center gap-2">
                <Building className="w-4 h-4" />
                <span>Empresa</span>
              </TabsTrigger>
              <TabsTrigger value="security" className="flex items-center gap-2">
                <Key className="w-4 h-4" />
                <span>Segurança</span>
              </TabsTrigger>
              <TabsTrigger value="notifications" className="flex items-center gap-2">
                <Bell className="w-4 h-4" />
                <span>Notificações</span>
              </TabsTrigger>
              <TabsTrigger value="billing" className="flex items-center gap-2">
                <CreditCard className="w-4 h-4" />
                <span>Faturamento</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="profile">
              <div className="glass-morphism p-6 rounded-xl mb-6">
                <h2 className="text-lg font-semibold mb-4">Informações Pessoais</h2>
                <div className="flex items-start gap-6">
                  <Avatar className="h-20 w-20">
                    <img src="https://i.pravatar.cc/150?img=33" alt="Profile" className="rounded-full" />
                  </Avatar>
                  
                  <div className="flex-1 grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-aiGray">Nome</label>
                      <Input defaultValue="Rafael Silva" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-aiGray">Sobrenome</label>
                      <Input defaultValue="Oliveira" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-aiGray">Email</label>
                      <Input defaultValue="rafael.silva@gmail.com" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-aiGray">Telefone</label>
                      <Input defaultValue="(11) 98765-4321" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-aiGray">Cargo</label>
                      <Input defaultValue="CEO" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-aiGray">Departamento</label>
                      <Input defaultValue="Diretoria" />
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end mt-6">
                  <Button onClick={saveSettings} className="ai-button">
                    Salvar Alterações
                  </Button>
                </div>
              </div>
              
              <div className="glass-morphism p-6 rounded-xl">
                <h2 className="text-lg font-semibold mb-4">Preferências</h2>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Idioma</h3>
                      <p className="text-sm text-aiGray">Selecione seu idioma preferido</p>
                    </div>
                    <div className="flex items-center">
                      <span className="mr-2">Português (Brasil)</span>
                      <ChevronRight className="h-4 w-4 text-aiGray" />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Fuso horário</h3>
                      <p className="text-sm text-aiGray">Defina seu fuso horário</p>
                    </div>
                    <div className="flex items-center">
                      <span className="mr-2">América/São Paulo (UTC-3)</span>
                      <ChevronRight className="h-4 w-4 text-aiGray" />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Tema escuro</h3>
                      <p className="text-sm text-aiGray">Ativar tema escuro</p>
                    </div>
                    <Switch defaultChecked id="dark-mode" />
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="company">
              <div className="glass-morphism p-6 rounded-xl mb-6">
                <h2 className="text-lg font-semibold mb-4">Informações da Empresa</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-aiGray">Nome da Empresa</label>
                    <Input defaultValue="Tech Solutions SA" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-aiGray">CNPJ</label>
                    <Input defaultValue="12.345.678/0001-90" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-aiGray">Segmento</label>
                    <Input defaultValue="Tecnologia" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-aiGray">Tamanho</label>
                    <Input defaultValue="50-100 funcionários" />
                  </div>
                  <div className="space-y-2 col-span-2">
                    <label className="text-sm font-medium text-aiGray">Endereço</label>
                    <Input defaultValue="Av. Paulista, 1000 - Bela Vista, São Paulo - SP, 01310-100" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-aiGray">Website</label>
                    <Input defaultValue="https://techsolutions.com.br" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-aiGray">Email Comercial</label>
                    <Input defaultValue="contato@techsolutions.com.br" />
                  </div>
                </div>
                
                <div className="flex justify-end mt-6">
                  <Button onClick={saveSettings} className="ai-button">
                    Salvar Alterações
                  </Button>
                </div>
              </div>
              
              <div className="glass-morphism p-6 rounded-xl">
                <h2 className="text-lg font-semibold mb-4">Integrações</h2>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded bg-white/10 flex items-center justify-center mr-4">
                        <Mail className="h-5 w-5 text-aiBlue" />
                      </div>
                      <div>
                        <h3 className="font-medium">Email</h3>
                        <p className="text-sm text-aiGray">Integração com serviços de email</p>
                      </div>
                    </div>
                    <Badge className="bg-green-500/20 text-green-400">Conectado</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded bg-white/10 flex items-center justify-center mr-4">
                        <Phone className="h-5 w-5 text-aiBlue" />
                      </div>
                      <div>
                        <h3 className="font-medium">WhatsApp</h3>
                        <p className="text-sm text-aiGray">Integração com WhatsApp Business</p>
                      </div>
                    </div>
                    <Badge className="bg-yellow-500/20 text-yellow-400">Pendente</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded bg-white/10 flex items-center justify-center mr-4">
                        <Globe className="h-5 w-5 text-aiBlue" />
                      </div>
                      <div>
                        <h3 className="font-medium">Website</h3>
                        <p className="text-sm text-aiGray">Widget para seu website</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Configurar</Button>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="security">
              <div className="glass-morphism p-6 rounded-xl mb-6">
                <h2 className="text-lg font-semibold mb-4">Senha e Autenticação</h2>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Alterar senha</h3>
                      <p className="text-sm text-aiGray">Última alteração há 3 meses</p>
                    </div>
                    <Button variant="outline">Alterar senha</Button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Autenticação de dois fatores</h3>
                      <p className="text-sm text-aiGray">Adicione uma camada extra de segurança</p>
                    </div>
                    <Switch id="2fa" />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Sessões ativas</h3>
                      <p className="text-sm text-aiGray">Gerencie seus dispositivos conectados</p>
                    </div>
                    <Button variant="outline">Ver sessões</Button>
                  </div>
                </div>
              </div>
              
              <div className="glass-morphism p-6 rounded-xl">
                <h2 className="text-lg font-semibold mb-4">Permissões</h2>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded bg-white/10 flex items-center justify-center mr-4">
                        <Users className="h-5 w-5 text-aiBlue" />
                      </div>
                      <div>
                        <h3 className="font-medium">Convites de equipe</h3>
                        <p className="text-sm text-aiGray">Controle quem pode convidar novos membros</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <span className="mr-2">Apenas administradores</span>
                      <ChevronRight className="h-4 w-4 text-aiGray" />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded bg-white/10 flex items-center justify-center mr-4">
                        <Shield className="h-5 w-5 text-aiBlue" />
                      </div>
                      <div>
                        <h3 className="font-medium">Papéis e permissões</h3>
                        <p className="text-sm text-aiGray">Configure as permissões de cada papel</p>
                      </div>
                    </div>
                    <Button variant="outline">Configurar</Button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded bg-white/10 flex items-center justify-center mr-4">
                        <HardDrive className="h-5 w-5 text-aiBlue" />
                      </div>
                      <div>
                        <h3 className="font-medium">Logs de Atividade</h3>
                        <p className="text-sm text-aiGray">Veja o histórico de ações de usuários</p>
                      </div>
                    </div>
                    <Button variant="outline">Ver logs</Button>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="notifications">
              <div className="glass-morphism p-6 rounded-xl">
                <h2 className="text-lg font-semibold mb-6">Preferências de Notificação</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium mb-4">Notificações por Email</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Novas conversas</p>
                          <p className="text-sm text-aiGray">Quando uma nova conversa é iniciada</p>
                        </div>
                        <Switch id="email-new-conversations" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Mensagens não lidas</p>
                          <p className="text-sm text-aiGray">Quando há mensagens não lidas por mais de 1 hora</p>
                        </div>
                        <Switch id="email-unread" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Relatórios semanais</p>
                          <p className="text-sm text-aiGray">Resumo semanal de atividades</p>
                        </div>
                        <Switch id="email-reports" />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-4">Notificações no Aplicativo</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Novas mensagens</p>
                          <p className="text-sm text-aiGray">Quando receber novas mensagens</p>
                        </div>
                        <Switch id="app-new-messages" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Menções</p>
                          <p className="text-sm text-aiGray">Quando você for mencionado por um colega</p>
                        </div>
                        <Switch id="app-mentions" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Atualizações do sistema</p>
                          <p className="text-sm text-aiGray">Notificações sobre atualizações da plataforma</p>
                        </div>
                        <Switch id="app-updates" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end pt-2">
                    <Button onClick={saveSettings} className="ai-button">
                      Salvar Preferências
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="billing">
              <div className="glass-morphism p-6 rounded-xl mb-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold">Plano Atual</h2>
                  <Badge className="bg-aiBlue/20 text-aiBlue">Pro</Badge>
                </div>
                
                <div className="bg-white/5 rounded-lg p-4 mb-6">
                  <div className="flex justify-between items-center mb-3">
                    <div>
                      <h3 className="font-medium">Plano Pro</h3>
                      <p className="text-sm text-aiGray">Faturamento mensal</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold">R$ 199,00/mês</p>
                      <p className="text-sm text-aiGray">Próxima cobrança em 15/06/2023</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <div className="w-4 h-4 rounded-full bg-green-400 mr-2"></div>
                      <p className="text-sm">5 agentes ativos</p>
                    </div>
                    <div className="flex items-center">
                      <div className="w-4 h-4 rounded-full bg-green-400 mr-2"></div>
                      <p className="text-sm">10.000 mensagens/mês</p>
                    </div>
                    <div className="flex items-center">
                      <div className="w-4 h-4 rounded-full bg-green-400 mr-2"></div>
                      <p className="text-sm">Suporte prioritário</p>
                    </div>
                    <div className="flex items-center">
                      <div className="w-4 h-4 rounded-full bg-green-400 mr-2"></div>
                      <p className="text-sm">Análises avançadas</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-4">
                  <Button variant="outline">Alterar plano</Button>
                  <Button variant="outline" className="text-red-400 hover:text-red-300">Cancelar assinatura</Button>
                </div>
              </div>
              
              <div className="glass-morphism p-6 rounded-xl mb-6">
                <h2 className="text-lg font-semibold mb-4">Método de Pagamento</h2>
                
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <div className="w-12 h-8 bg-white/10 rounded flex items-center justify-center mr-3">
                      <CreditCard className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium">•••• •••• •••• 4242</p>
                      <p className="text-sm text-aiGray">Expira em 12/2025</p>
                    </div>
                  </div>
                  <div>
                    <Button variant="ghost" size="sm">Editar</Button>
                  </div>
                </div>
                
                <Button variant="outline">Adicionar novo método</Button>
              </div>
              
              <div className="glass-morphism p-6 rounded-xl">
                <h2 className="text-lg font-semibold mb-4">Histórico de Faturas</h2>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="px-4 py-3 text-left text-sm text-aiGray">Data</th>
                        <th className="px-4 py-3 text-left text-sm text-aiGray">Descrição</th>
                        <th className="px-4 py-3 text-left text-sm text-aiGray">Valor</th>
                        <th className="px-4 py-3 text-left text-sm text-aiGray">Status</th>
                        <th className="px-4 py-3 text-right text-sm text-aiGray">Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-white/5">
                        <td className="px-4 py-3 text-sm">15/05/2023</td>
                        <td className="px-4 py-3 text-sm">Plano Pro - Mensal</td>
                        <td className="px-4 py-3 text-sm">R$ 199,00</td>
                        <td className="px-4 py-3">
                          <Badge className="bg-green-500/20 text-green-400">Pago</Badge>
                        </td>
                        <td className="px-4 py-3 text-right">
                          <Button variant="ghost" size="sm">
                            Ver fatura
                          </Button>
                        </td>
                      </tr>
                      <tr className="border-b border-white/5">
                        <td className="px-4 py-3 text-sm">15/04/2023</td>
                        <td className="px-4 py-3 text-sm">Plano Pro - Mensal</td>
                        <td className="px-4 py-3 text-sm">R$ 199,00</td>
                        <td className="px-4 py-3">
                          <Badge className="bg-green-500/20 text-green-400">Pago</Badge>
                        </td>
                        <td className="px-4 py-3 text-right">
                          <Button variant="ghost" size="sm">
                            Ver fatura
                          </Button>
                        </td>
                      </tr>
                      <tr className="border-b border-white/5">
                        <td className="px-4 py-3 text-sm">15/03/2023</td>
                        <td className="px-4 py-3 text-sm">Plano Pro - Mensal</td>
                        <td className="px-4 py-3 text-sm">R$ 199,00</td>
                        <td className="px-4 py-3">
                          <Badge className="bg-green-500/20 text-green-400">Pago</Badge>
                        </td>
                        <td className="px-4 py-3 text-right">
                          <Button variant="ghost" size="sm">
                            Ver fatura
                          </Button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </SidebarProvider>
  );
}
