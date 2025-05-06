
import { useEffect, useState } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Link, useLocation } from "react-router-dom";
import { Bot, Layout, MessageCircle, BarChart, Settings, Users, Bot as BotIcon, Shield } from "lucide-react";

export function DashboardSidebar() {
  const [isManager, setIsManager] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    const userRole = sessionStorage.getItem('userRole');
    setIsManager(userRole === 'manager');
  }, []);
  
  return (
    <Sidebar className="border-r border-white/5">
      <SidebarHeader className="flex items-center pl-6 h-14">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-aiBlue flex items-center justify-center">
            <Bot className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-lg text-gradient">Conversia AI</span>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link 
                    to="/dashboard" 
                    className={`flex gap-2 items-center ${location.pathname === '/dashboard' ? 'text-aiBlue' : ''}`}
                  >
                    <Layout className="h-4 w-4" />
                    <span>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link 
                    to="/agents" 
                    className={`flex gap-2 items-center ${location.pathname === '/agents' ? 'text-aiBlue' : ''}`}
                  >
                    <BotIcon className="h-4 w-4" />
                    <span>Agentes</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link 
                    to="/conversations" 
                    className={`flex gap-2 items-center ${location.pathname === '/conversations' ? 'text-aiBlue' : ''}`}
                  >
                    <MessageCircle className="h-4 w-4" />
                    <span>Conversas</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link 
                    to="/analytics" 
                    className={`flex gap-2 items-center ${location.pathname === '/analytics' ? 'text-aiBlue' : ''}`}
                  >
                    <BarChart className="h-4 w-4" />
                    <span>Análises</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link 
                    to="/team" 
                    className={`flex gap-2 items-center ${location.pathname === '/team' ? 'text-aiBlue' : ''}`}
                  >
                    <Users className="h-4 w-4" />
                    <span>Equipe</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              {isManager && (
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link 
                      to="/manager" 
                      className={`flex gap-2 items-center ${location.pathname === '/manager' ? 'text-aiBlue' : ''}`}
                    >
                      <Shield className="h-4 w-4" />
                      <span>Painel do Gestor</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        <SidebarGroup>
          <SidebarGroupLabel>Configurações</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link 
                    to="/settings" 
                    className={`flex gap-2 items-center ${location.pathname === '/settings' ? 'text-aiBlue' : ''}`}
                  >
                    <Settings className="h-4 w-4" />
                    <span>Configurações</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="p-4">
        <div className="glass-morphism rounded-lg p-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-aiPurple flex items-center justify-center">
              <Users className="w-4 h-4 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium">Plano Pro</span>
              <span className="text-xs text-gray-400">Ativo até 05/06/2025</span>
            </div>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
