
import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { Button } from "@/components/ui/button";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  User, 
  Building, 
  CreditCard, 
  Bell, 
  Shield, 
  CheckCircle
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";

export default function Settings() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("perfil");
  
  const handleSaveProfile = () => {
    toast({
      title: "Perfil atualizado",
      description: "Suas informações foram atualizadas com sucesso!",
    });
  };
  
  const handleSaveCompany = () => {
    toast({
      title: "Empresa atualizada",
      description: "As informações da empresa foram atualizadas com sucesso!",
    });
  };
  
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-aiDark">
        <DashboardSidebar />
        
        <div className="flex-1 p-6 overflow-auto">
          <div className="mb-8">
            <h1 className="text-2xl font-bold mb-2">Configurações</h1>
            <p className="text-aiGray">Gerencie suas preferências e dados da conta</p>
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
            <TabsList className="bg-white/5 mb-6 grid grid-cols-5 w-full max-w-3xl">
              <TabsTrigger value="perfil" className="data-[state=active]:bg-aiBlue/20 flex gap-2 items-center">
                <User className="w-4 h-4" />
                <span>Perfil</span>
              </TabsTrigger>
              <TabsTrigger value="empresa" className="data-[state=active]:bg-aiBlue/20 flex gap-2 items-center">
                <Building className="w-4 h-4" />
                <span>Empresa</span>
              </TabsTrigger>
              <TabsTrigger value="planos" className="data-[state=active]:bg-aiBlue/20 flex gap-2 items-center">
                <CreditCard className="w-4 h-4" />
                <span>Planos</span>
              </TabsTrigger>
              <TabsTrigger value="notificacoes" className="data-[state=active]:bg-aiBlue/20 flex gap-2 items-center">
                <Bell className="w-4 h-4" />
                <span>Notificações</span>
              </TabsTrigger>
              <TabsTrigger value="seguranca" className="data-[state=active]:bg-aiBlue/20 flex gap-2 items-center">
                <Shield className="w-4 h-4" />
                <span>Segurança</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="perfil" className="max-w-3xl">
              <div className="glass-morphism rounded-xl p-6">
                <h2 className="text-xl font-semibold mb-6">Informações Pessoais</h2>
                
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nome completo</Label>
                      <Input id="name" defaultValue="Rafael Silva" className="ai-input" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" defaultValue="rafael.silva@gmail.com" className="ai-input" />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Telefone</Label>
                      <Input id="phone" defaultValue="(11) 98765-4321" className="ai-input" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="position">Cargo</Label>
                      <Input id="position" defaultValue="Gerente de Marketing" className="ai-input" />
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-white/10">
                    <Button className="ai-button" onClick={handleSaveProfile}>Salvar Alterações</Button>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="empresa" className="max-w-3xl">
              <div className="glass-morphism rounded-xl p-6">
                <h2 className="text-xl font-semibold mb-6">Dados da Empresa</h2>
                
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="companyName">Nome da empresa</Label>
                      <Input id="companyName" defaultValue="Financial Credit" className="ai-input" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cnpj">CNPJ</Label>
                      <Input id="cnpj" defaultValue="12.345.678/0001-90" className="ai-input" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="address">Endereço</Label>
                    <Input id="address" defaultValue="Av. Paulista, 1000, São Paulo - SP" className="ai-input" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="segment">Segmento</Label>
                      <Input id="segment" defaultValue="Serviços Financeiros" className="ai-input" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="website">Website</Label>
                      <Input id="website" defaultValue="https://financialcredit.com.br" className="ai-input" />
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-white/10">
                    <Button className="ai-button" onClick={handleSaveCompany}>Salvar Alterações</Button>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="planos" className="max-w-4xl">
              <div className="glass-morphism rounded-xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold">Plano Atual</h2>
                  <Badge className="bg-aiPurple/20 text-aiPurple">Plano Pro</Badge>
                </div>
                
                <div className="mb-8">
                  <div className="flex items-center mb-2">
                    <CheckCircle className="w-4 h-4 text-aiPurple mr-2" />
                    <span>Ativo até 05/06/2025</span>
                  </div>
                  <div className="flex items-center mb-2">
                    <CheckCircle className="w-4 h-4 text-aiPurple mr-2" />
                    <span>10 agentes incluídos</span>
                  </div>
                  <div className="flex items-center mb-2">
                    <CheckCircle className="w-4 h-4 text-aiPurple mr-2" />
                    <span>Conversas ilimitadas</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-aiPurple mr-2" />
                    <span>Análises avançadas</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-6">
                  <div className="bg-white/5 rounded-xl p-6 border border-white/10 relative">
                    <div className="mb-4">
                      <div className="text-lg font-semibold">Plano Starter</div>
                      <div className="text-2xl font-bold mt-2">R$99<span className="text-sm text-aiGray">/mês</span></div>
                    </div>
                    <ul className="mb-6 space-y-2 text-sm">
                      <li className="flex items-center">
                        <CheckCircle className="w-3 h-3 text-aiBlue mr-2" />
                        <span>3 agentes</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-3 h-3 text-aiBlue mr-2" />
                        <span>500 conversas/mês</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-3 h-3 text-aiBlue mr-2" />
                        <span>Análises básicas</span>
                      </li>
                    </ul>
                    <Button variant="outline" className="w-full">Fazer Downgrade</Button>
                  </div>
                  
                  <div className="bg-aiBlue/10 rounded-xl p-6 border border-aiBlue/30 relative">
                    <div className="absolute -top-3 right-6 bg-aiBlue text-xs px-3 py-1 rounded-full">
                      Atual
                    </div>
                    <div className="mb-4">
                      <div className="text-lg font-semibold">Plano Pro</div>
                      <div className="text-2xl font-bold mt-2">R$249<span className="text-sm text-aiGray">/mês</span></div>
                    </div>
                    <ul className="mb-6 space-y-2 text-sm">
                      <li className="flex items-center">
                        <CheckCircle className="w-3 h-3 text-aiBlue mr-2" />
                        <span>10 agentes</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-3 h-3 text-aiBlue mr-2" />
                        <span>Conversas ilimitadas</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-3 h-3 text-aiBlue mr-2" />
                        <span>Análises avançadas</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-3 h-3 text-aiBlue mr-2" />
                        <span>Intervenção em tempo real</span>
                      </li>
                    </ul>
                    <Button className="ai-button w-full" disabled>Plano Atual</Button>
                  </div>
                  
                  <div className="bg-white/5 rounded-xl p-6 border border-white/10 relative">
                    <div className="mb-4">
                      <div className="text-lg font-semibold">Plano Enterprise</div>
                      <div className="text-2xl font-bold mt-2">R$499<span className="text-sm text-aiGray">/mês</span></div>
                    </div>
                    <ul className="mb-6 space-y-2 text-sm">
                      <li className="flex items-center">
                        <CheckCircle className="w-3 h-3 text-aiBlue mr-2" />
                        <span>Agentes ilimitados</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-3 h-3 text-aiBlue mr-2" />
                        <span>Conversas ilimitadas</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-3 h-3 text-aiBlue mr-2" />
                        <span>API personalizada</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-3 h-3 text-aiBlue mr-2" />
                        <span>Suporte dedicado</span>
                      </li>
                    </ul>
                    <Button variant="outline" className="w-full">Fazer Upgrade</Button>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="notificacoes" className="max-w-3xl">
              <div className="glass-morphism rounded-xl p-6">
                <h2 className="text-xl font-semibold mb-6">Preferências de Notificação</h2>
                
                <div className="space-y-6">
                  <NotificationSetting
                    title="Novas conversas"
                    description="Receba notificações quando um cliente iniciar uma nova conversa"
                    defaultChecked={true}
                  />
                  
                  <NotificationSetting
                    title="Transferências de agente"
                    description="Seja notificado quando um agente transferir uma conversa para você"
                    defaultChecked={true}
                  />
                  
                  <NotificationSetting
                    title="Relatórios semanais"
                    description="Receba um resumo semanal do desempenho dos seus agentes"
                    defaultChecked={true}
                  />
                  
                  <NotificationSetting
                    title="Atualizações da plataforma"
                    description="Seja informado sobre novas funcionalidades e atualizações"
                    defaultChecked={false}
                  />
                  
                  <NotificationSetting
                    title="Dicas e melhores práticas"
                    description="Receba dicas para melhorar o desempenho dos seus agentes"
                    defaultChecked={false}
                  />
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="seguranca" className="max-w-3xl">
              <div className="glass-morphism rounded-xl p-6">
                <h2 className="text-xl font-semibold mb-6">Segurança da Conta</h2>
                
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Senha atual</Label>
                    <Input id="currentPassword" type="password" placeholder="••••••••" className="ai-input" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="newPassword">Nova senha</Label>
                      <Input id="newPassword" type="password" placeholder="••••••••" className="ai-input" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirmar senha</Label>
                      <Input id="confirmPassword" type="password" placeholder="••••••••" className="ai-input" />
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-white/10">
                    <Button className="ai-button">Atualizar Senha</Button>
                  </div>
                  
                  <div className="pt-6 border-t border-white/10 mt-6">
                    <h3 className="text-lg font-medium mb-4">Autenticação de dois fatores</h3>
                    <p className="text-sm text-aiGray mb-4">
                      Adicione uma camada extra de segurança à sua conta ativando a autenticação de dois fatores.
                    </p>
                    <Button variant="outline">Configurar 2FA</Button>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </SidebarProvider>
  );
}

function NotificationSetting({ title, description, defaultChecked }: { title: string, description: string, defaultChecked: boolean }) {
  return (
    <div className="flex items-start justify-between py-4 border-b border-white/10">
      <div>
        <h3 className="font-medium">{title}</h3>
        <p className="text-sm text-aiGray">{description}</p>
      </div>
      <div className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background bg-aiBlue">
        <span className="inline-block h-5 w-5 transform rounded-full bg-white transition-transform translate-x-5"></span>
      </div>
    </div>
  );
}
