
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ParticleBackground } from "@/components/ui-particles";
import { Bot, MessageCircle, BarChart, Settings, ArrowRight, Users, Zap } from "lucide-react";
import { Link } from "react-router-dom";

export default function Index() {
  const [hoveredFeature, setHoveredFeature] = useState<string | null>(null);
  
  const features = [
    {
      id: "agents",
      icon: Bot,
      title: "Agentes Humanizados",
      description: "Crie agentes com linguagem natural que conversam como humanos no WhatsApp."
    },
    {
      id: "whatsapp",
      icon: MessageCircle,
      title: "WhatsApp Integrado",
      description: "Conexão via QR Code ou API Business oficial para iniciar rapidamente."
    },
    {
      id: "analytics",
      icon: BarChart,
      title: "Análise Inteligente",
      description: "Dashboard com insights sobre conversões, tópicos e comportamento do cliente."
    },
    {
      id: "intervention",
      icon: Users,
      title: "Intervenção Humana",
      description: "Assuma o controle a qualquer momento sem o cliente perceber a mudança."
    },
    {
      id: "customization",
      icon: Settings,
      title: "Personalização Total",
      description: "Ajuste tom, comportamento e conhecimento do agente para seu negócio."
    },
    {
      id: "emotion",
      icon: Zap,
      title: "Detecção de Emoção",
      description: "Identifica frustração e urgência para melhorar a experiência do cliente."
    }
  ];
  
  const preDefinedAgents = [
    {
      name: "Adão",
      specialty: "Especialista em crédito consignado e FGTS",
      description: "Perfeito para empresas financeiras que precisam explicar produtos de crédito e auxiliar em simulações."
    },
    {
      name: "Clara",
      specialty: "Suporte técnico para empresas de software",
      description: "Resolve problemas comuns, guia usuários pelos recursos e escala somente quando necessário."
    },
    {
      name: "Lucas",
      specialty: "Vendedor B2B para serviços",
      description: "Conduz qualificação de leads, agenda demonstrações e mantém o funil de vendas aquecido."
    },
    {
      name: "Lia",
      specialty: "Atendimento para e-commerce e pós-venda",
      description: "Gerencia pedidos, dúvidas sobre produtos e solicitações de suporte com eficiência."
    }
  ];
  
  return (
    <div className="min-h-screen flex flex-col bg-aiDark relative overflow-hidden">
      <ParticleBackground />
      
      {/* Navigation */}
      <nav className="container py-6 flex justify-between items-center relative z-10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-aiBlue flex items-center justify-center">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-xl text-gradient">Conversia AI</span>
        </div>
        
        <div className="flex gap-4 items-center">
          <a href="#features" className="text-sm text-aiGray hover:text-white transition-colors">Recursos</a>
          <a href="#agents" className="text-sm text-aiGray hover:text-white transition-colors">Agentes</a>
          <a href="#" className="text-sm text-aiGray hover:text-white transition-colors">Preços</a>
          <Link to="/login" className="ai-button-outline">Entrar</Link>
          <Link to="/register" className="ai-button">Começar Grátis</Link>
        </div>
      </nav>
      
      {/* Hero Section */}
      <section className="container flex flex-col items-center text-center pt-20 pb-32 relative z-10">
        <h1 className="text-5xl font-bold leading-tight text-gradient max-w-3xl mb-6">
          IA de Agentes Humanizados no WhatsApp
        </h1>
        <p className="text-xl text-aiGray-light max-w-2xl mb-10">
          Um ecossistema completo, intuitivo e inteligente para criar, treinar e 
          operar agentes virtuais com linguagem natural em qualquer segmento.
        </p>
        
        <div className="flex gap-4">
          <Link to="/register" className="ai-button text-base px-8 py-3">
            Começar Agora
          </Link>
          <Link to="/demo" className="ai-button-outline text-base px-8 py-3">
            Ver Demonstração
          </Link>
        </div>
        
        {/* Gradient orbs */}
        <div className="absolute top-1/3 -left-64 w-96 h-96 rounded-full bg-aiBlue/20 blur-[120px] -z-10" />
        <div className="absolute bottom-1/4 -right-64 w-96 h-96 rounded-full bg-aiPurple/20 blur-[120px] -z-10" />
      </section>
      
      {/* Features Section */}
      <section id="features" className="py-20 bg-aiDark-darker relative z-10">
        <div className="container">
          <h2 className="text-3xl font-bold text-center text-gradient-primary mb-16">
            Uma plataforma completa para sua empresa
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature) => (
              <div
                key={feature.id}
                className="glass-morphism p-6 rounded-xl transition-all duration-300 hover:translate-y-[-5px]"
                onMouseEnter={() => setHoveredFeature(feature.id)}
                onMouseLeave={() => setHoveredFeature(null)}
              >
                <div 
                  className={`
                    w-12 h-12 rounded-lg flex items-center justify-center mb-4
                    ${hoveredFeature === feature.id 
                      ? 'bg-aiBlue text-white' 
                      : 'bg-white/5 text-aiBlue'}
                    transition-colors duration-300
                  `}
                >
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-aiGray">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Pre-defined Agents Section */}
      <section id="agents" className="py-20 relative z-10">
        <div className="container">
          <h2 className="text-3xl font-bold text-center text-gradient-primary mb-4">
            Agentes Pré-treinados
          </h2>
          <p className="text-center text-aiGray-light max-w-2xl mx-auto mb-16">
            Comece imediatamente com agentes especializados, prontos para conversar com seus clientes
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {preDefinedAgents.map((agent, index) => (
              <div key={index} className="ai-card flex flex-col">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-aiBlue to-aiPurple flex items-center justify-center">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold">{agent.name}</h3>
                </div>
                
                <p className="text-aiBlue text-sm font-medium mb-2">{agent.specialty}</p>
                <p className="text-sm text-aiGray mb-4 flex-grow">{agent.description}</p>
                
                <div className="mt-auto">
                  <Button variant="outline" className="w-full justify-between border-white/10 hover:bg-white/5">
                    <span>Experimentar</span>
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 relative z-10">
        <div className="container max-w-4xl">
          <div className="glass-morphism rounded-xl p-12 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-ai-grid opacity-20"></div>
            
            <h2 className="text-3xl font-bold text-center mb-4">
              Pronto para revolucionar seu atendimento?
            </h2>
            <p className="text-center text-aiGray-light mb-8 max-w-2xl mx-auto">
              Crie seu primeiro agente em minutos e comece a oferecer atendimento via WhatsApp 24/7 com a inteligência e personalidade que seus clientes merecem.
            </p>
            
            <div className="flex gap-4 justify-center">
              <Link to="/register" className="ai-button text-base px-8 py-3">
                Criar Conta Grátis
              </Link>
              <Link to="/contact" className="ai-button-outline text-base px-8 py-3">
                Falar com Especialista
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="border-t border-white/5 py-10 relative z-10">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-aiBlue flex items-center justify-center">
                <Bot className="w-3 h-3 text-white" />
              </div>
              <span className="font-bold text-lg">Conversia AI</span>
            </div>
            
            <div className="flex gap-8">
              <a href="#" className="text-sm text-aiGray hover:text-white transition-colors">Termos</a>
              <a href="#" className="text-sm text-aiGray hover:text-white transition-colors">Privacidade</a>
              <a href="#" className="text-sm text-aiGray hover:text-white transition-colors">Blog</a>
              <a href="#" className="text-sm text-aiGray hover:text-white transition-colors">Suporte</a>
            </div>
            
            <div className="text-sm text-aiGray">
              © 2025 Conversia AI. Todos os direitos reservados.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
