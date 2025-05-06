
import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { StatCard } from "@/components/stat-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  MessageCircle, 
  Users, 
  BarChart, 
  TrendingUp,
  Calendar,
  Clock
} from "lucide-react";
import { Bar, BarChart as RechartsBarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export default function Analytics() {
  const conversionData = [
    { name: 'Jan', Adão: 42, Clara: 24, Lucas: 0 },
    { name: 'Fev', Adão: 38, Clara: 28, Lucas: 0 },
    { name: 'Mar', Adão: 45, Clara: 31, Lucas: 0 },
    { name: 'Abr', Adão: 40, Clara: 26, Lucas: 0 },
    { name: 'Mai', Adão: 52, Clara: 22, Lucas: 12 },
    { name: 'Jun', Adão: 48, Clara: 30, Lucas: 18 },
  ];
  
  const engagementData = [
    { name: 'Jan', mensagens: 1245, conversas: 342 },
    { name: 'Fev', mensagens: 1388, conversas: 378 },
    { name: 'Mar', mensagens: 1520, conversas: 412 },
    { name: 'Abr', mensagens: 1350, conversas: 365 },
    { name: 'Mai', mensagens: 1680, conversas: 458 },
    { name: 'Jun', mensagens: 1840, conversas: 502 },
  ];
  
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-aiDark">
        <DashboardSidebar />
        
        <div className="flex-1 p-6 overflow-auto">
          <div className="mb-8">
            <h1 className="text-2xl font-bold mb-2">Análises</h1>
            <p className="text-aiGray">Métricas e insights sobre seus agentes</p>
            
            <div className="flex items-center gap-4 mt-4">
              <div className="glass-morphism rounded-lg p-3 flex gap-2 items-center">
                <Calendar className="w-4 h-4 text-aiBlue" />
                <span>Últimos 30 dias</span>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard 
              title="Total de Conversas" 
              value="523"
              change={{ value: 12, isPositive: true }}
              icon={MessageCircle}
              color="blue"
            />
            <StatCard 
              title="Clientes Atendidos" 
              value="412"
              change={{ value: 8, isPositive: true }}
              icon={Users}
              color="purple"
            />
            <StatCard 
              title="Taxa de Conversão" 
              value="24%"
              change={{ value: 3, isPositive: true }}
              icon={BarChart}
              color="green"
            />
            <StatCard 
              title="Tempo Médio" 
              value="4.2 min"
              change={{ value: 15, isPositive: false }}
              icon={Clock}
              color="yellow"
            />
          </div>
          
          <Tabs defaultValue="conversoes" className="mb-8">
            <TabsList className="bg-white/5 mb-6">
              <TabsTrigger value="conversoes" className="data-[state=active]:bg-aiBlue/20">Conversões</TabsTrigger>
              <TabsTrigger value="engajamento" className="data-[state=active]:bg-aiBlue/20">Engajamento</TabsTrigger>
              <TabsTrigger value="sentimento" className="data-[state=active]:bg-aiBlue/20">Sentimento</TabsTrigger>
            </TabsList>
            
            <TabsContent value="conversoes" className="glass-morphism p-6 rounded-xl">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-aiBlue" />
                <span>Conversões por Agente</span>
              </h3>
              
              <ResponsiveContainer width="100%" height={400}>
                <RechartsBarChart data={conversionData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                  <XAxis dataKey="name" stroke="#aaa" />
                  <YAxis stroke="#aaa" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1A1F2C', 
                      borderColor: '#333',
                      color: '#fff' 
                    }} 
                  />
                  <Legend />
                  <Bar dataKey="Adão" name="Adão" fill="#6366f1" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="Clara" name="Clara" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="Lucas" name="Lucas" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </RechartsBarChart>
              </ResponsiveContainer>
            </TabsContent>
            
            <TabsContent value="engajamento" className="glass-morphism p-6 rounded-xl">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-aiBlue" />
                <span>Engajamento</span>
              </h3>
              
              <ResponsiveContainer width="100%" height={400}>
                <RechartsBarChart data={engagementData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                  <XAxis dataKey="name" stroke="#aaa" />
                  <YAxis stroke="#aaa" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1A1F2C', 
                      borderColor: '#333',
                      color: '#fff' 
                    }} 
                  />
                  <Legend />
                  <Bar dataKey="mensagens" name="Mensagens" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="conversas" name="Conversas" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                </RechartsBarChart>
              </ResponsiveContainer>
            </TabsContent>
            
            <TabsContent value="sentimento" className="glass-morphism p-6 rounded-xl">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Users className="w-5 h-5 text-aiBlue" />
                <span>Sentimento dos Usuários</span>
              </h3>
              
              <div className="flex items-center justify-center h-80">
                <p className="text-aiGray">Análise de sentimento em breve</p>
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="glass-morphism rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4">Melhores Tópicos</h3>
              <div className="space-y-4">
                <TopicItem
                  topic="Crédito Consignado"
                  conversion={42}
                  trend={8}
                />
                <TopicItem
                  topic="Antecipação FGTS"
                  conversion={38}
                  trend={5}
                />
                <TopicItem
                  topic="Empréstimo Pessoal"
                  conversion={28}
                  trend={-2}
                />
                <TopicItem
                  topic="Cartão de Crédito"
                  conversion={24}
                  trend={3}
                />
              </div>
            </div>
            
            <div className="glass-morphism rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4">Palavras-chave Efetivas</h3>
              <div className="flex flex-wrap gap-2">
                <KeywordBadge keyword="desconto em folha" count={86} />
                <KeywordBadge keyword="aposentado" count={72} />
                <KeywordBadge keyword="aprovação rápida" count={65} />
                <KeywordBadge keyword="simulação" count={58} />
                <KeywordBadge keyword="taxas baixas" count={52} />
                <KeywordBadge keyword="sem burocracia" count={48} />
                <KeywordBadge keyword="parcelas fixas" count={44} />
                <KeywordBadge keyword="servidor público" count={42} />
                <KeywordBadge keyword="atendimento personalizado" count={38} />
                <KeywordBadge keyword="INSS" count={36} />
                <KeywordBadge keyword="sem consulta" count={34} />
                <KeywordBadge keyword="liberação" count={32} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}

function TopicItem({ topic, conversion, trend }: { topic: string, conversion: number, trend: number }) {
  return (
    <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
      <span>{topic}</span>
      <div className="flex items-center gap-4">
        <span className="text-sm">{conversion}%</span>
        <div className={`flex items-center ${trend >= 0 ? 'text-green-400' : 'text-red-400'}`}>
          {trend >= 0 ? (
            <TrendingUp className="w-3 h-3 mr-1" />
          ) : (
            <TrendingUp className="w-3 h-3 mr-1 transform rotate-180" />
          )}
          <span className="text-xs">{Math.abs(trend)}%</span>
        </div>
      </div>
    </div>
  );
}

function KeywordBadge({ keyword, count }: { keyword: string, count: number }) {
  return (
    <div className="bg-white/5 px-3 py-1.5 rounded-full flex items-center gap-2 text-sm">
      <span>{keyword}</span>
      <span className="bg-aiBlue/20 text-aiBlue text-xs px-2 py-0.5 rounded-full">{count}</span>
    </div>
  );
}
