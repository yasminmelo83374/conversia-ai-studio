
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  change?: {
    value: number;
    isPositive: boolean;
  };
  icon: LucideIcon;
  color: "blue" | "purple" | "green" | "yellow";
}

export function StatCard({ title, value, change, icon: Icon, color }: StatCardProps) {
  const colorVariants = {
    blue: "from-aiBlue/20 to-aiBlue/5 text-aiBlue border-aiBlue/20",
    purple: "from-aiPurple/20 to-aiPurple/5 text-aiPurple border-aiPurple/20",
    green: "from-green-500/20 to-green-500/5 text-green-400 border-green-500/20",
    yellow: "from-yellow-500/20 to-yellow-500/5 text-yellow-400 border-yellow-500/20",
  };
  
  return (
    <div className={`p-6 rounded-xl bg-gradient-to-b ${colorVariants[color]} border backdrop-blur-sm`}>
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm opacity-70">{title}</p>
          <h3 className="text-2xl font-semibold mt-1">{value}</h3>
          
          {change && (
            <div className="flex items-center mt-2 text-xs">
              <span className={change.isPositive ? 'text-green-400' : 'text-red-400'}>
                {change.isPositive ? '↑' : '↓'} {Math.abs(change.value)}%
              </span>
              <span className="ml-1 opacity-60">vs. mês anterior</span>
            </div>
          )}
        </div>
        
        <div className="bg-white/10 p-2 rounded-lg">
          <Icon className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
}
