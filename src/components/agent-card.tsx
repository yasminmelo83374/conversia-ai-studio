
import { Bot, Users, BarChart, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

export interface AgentProps {
  id: string;
  name: string;
  description: string;
  type: "financeiro" | "suporte" | "vendas";
  status: "active" | "inactive" | "training";
  messageCount: number;
  conversionRate: number;
  lastActive: string;
}

interface AgentCardProps {
  agent: AgentProps;
}

export function AgentCard({ agent }: AgentCardProps) {
  const getStatusLabel = (status: string) => {
    switch (status) {
      case "active":
        return "Ativo";
      case "inactive":
        return "Inativo";
      case "training":
        return "Em treinamento";
      default:
        return status;
    }
  };
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500/20 text-green-400";
      case "inactive":
        return "bg-yellow-500/20 text-yellow-400";
      case "training":
        return "bg-blue-500/20 text-blue-400";
      default:
        return "bg-gray-500/20 text-gray-400";
    }
  };
  
  const getTypeIcon = (type: string) => {
    switch (type) {
      case "financeiro":
        return <Bot className="w-5 h-5 text-aiBlue" />;
      case "suporte":
        return <Bot className="w-5 h-5 text-green-400" />;
      case "vendas":
        return <Bot className="w-5 h-5 text-purple-400" />;
      default:
        return <Bot className="w-5 h-5" />;
    }
  };
  
  return (
    <Link to={`/agent/${agent.id}`} className="block">
      <div className="ai-card ai-glow h-full transition-all hover:scale-[1.02] cursor-pointer">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center mr-3">
                {getTypeIcon(agent.type)}
              </div>
              <div>
                <h3 className="text-lg font-medium">{agent.name}</h3>
                <p className="text-sm text-aiGray">{agent.description}</p>
              </div>
            </div>
            <Badge className={`${getStatusColor(agent.status)}`}>
              {getStatusLabel(agent.status)}
            </Badge>
          </div>
          
          <div className="grid grid-cols-3 gap-2 mb-4">
            <div className="flex flex-col items-center p-2 rounded-lg bg-white/5">
              <Users className="w-4 h-4 text-aiGray mb-1" />
              <p className="text-xs text-aiGray">Conversas</p>
              <p className="text-lg font-medium">{agent.messageCount}</p>
            </div>
            <div className="flex flex-col items-center p-2 rounded-lg bg-white/5">
              <BarChart className="w-4 h-4 text-aiGray mb-1" />
              <p className="text-xs text-aiGray">Conversão</p>
              <p className="text-lg font-medium">{agent.conversionRate}%</p>
            </div>
            <div className="flex flex-col items-center p-2 rounded-lg bg-white/5">
              <Clock className="w-4 h-4 text-aiGray mb-1" />
              <p className="text-xs text-aiGray">Atividade</p>
              <p className="text-[10px] text-center">{agent.lastActive}</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
