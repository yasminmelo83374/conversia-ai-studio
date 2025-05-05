
import { Bot, MessageCircle, Zap, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

export interface AgentProps {
  id: string;
  name: string;
  description: string;
  type: string;
  status: "active" | "inactive" | "training";
  messageCount: number;
  conversionRate: number;
  lastActive: string;
}

export function AgentCard({ agent }: { agent: AgentProps }) {
  return (
    <div className="ai-card ai-glow group">
      <div className="absolute top-0 right-0 p-2">
        <StatusBadge status={agent.status} />
      </div>
      
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-aiBlue to-aiPurple flex items-center justify-center flex-shrink-0">
          <Bot className="w-5 h-5 text-white" />
        </div>
        
        <div className="flex flex-col gap-2 flex-grow">
          <div>
            <h3 className="text-lg font-medium">{agent.name}</h3>
            <p className="text-sm text-aiGray line-clamp-2">{agent.description}</p>
          </div>
          
          <div className="grid grid-cols-3 gap-3 my-3">
            <div className="flex flex-col">
              <span className="text-xs text-aiGray">Mensagens</span>
              <div className="flex items-center gap-1.5">
                <MessageCircle className="w-3.5 h-3.5 text-aiBlue" />
                <span className="font-medium">{agent.messageCount}</span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-aiGray">Conversão</span>
              <div className="flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-aiPurple" />
                <span className="font-medium">{agent.conversionRate}%</span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-aiGray">Tipo</span>
              <div className="flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-aiGray-light" />
                <span className="font-medium capitalize">{agent.type}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex justify-between items-center mt-4 pt-4 border-t border-white/5">
        <span className="text-xs text-aiGray">Ativo {agent.lastActive}</span>
        <Link to={`/agents/${agent.id}`} className="ai-button-outline text-xs">
          Gerenciar
        </Link>
      </div>
      
      <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-aiBlue/0 via-aiBlue to-aiPurple/0 w-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </div>
  );
}

function StatusBadge({ status }: { status: "active" | "inactive" | "training" }) {
  const variants = {
    active: "bg-green-500/20 text-green-400 border-green-500/30",
    inactive: "bg-gray-500/20 text-gray-400 border-gray-500/30",
    training: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
  };
  
  const labels = {
    active: "Ativo",
    inactive: "Inativo",
    training: "Em treinamento"
  };
  
  return (
    <Badge 
      className={`${variants[status]} border animate-pulse-subtle`}
      variant="outline"
    >
      {labels[status]}
    </Badge>
  );
}
