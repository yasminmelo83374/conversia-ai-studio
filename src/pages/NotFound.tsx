
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ParticleBackground } from "@/components/ui-particles";
import { Bot } from "lucide-react";

export default function NotFound() {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-aiDark relative">
      <ParticleBackground />
      
      <div className="text-center z-10 glass-morphism p-12 rounded-xl max-w-md">
        <div className="w-16 h-16 rounded-full bg-aiBlue mx-auto flex items-center justify-center mb-6">
          <Bot className="w-8 h-8 text-white" />
        </div>
        
        <h1 className="text-4xl font-bold mb-4 text-gradient">404</h1>
        <p className="text-xl text-aiGray mb-8">
          Oops! Esta página não foi encontrada
        </p>
        
        <Link to="/">
          <Button className="ai-button">
            Voltar para o Início
          </Button>
        </Link>
      </div>
      
      {/* Gradient orbs */}
      <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-aiPurple/10 blur-[120px] -z-10" />
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-aiBlue/10 blur-[120px] -z-10" />
    </div>
  );
}
