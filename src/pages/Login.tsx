
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { ParticleBackground } from "@/components/ui-particles";
import { Bot, Lock, Mail } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Would handle login logic here
    window.location.href = "/dashboard";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-aiDark relative">
      <ParticleBackground />
      
      <div className="w-full max-w-md z-10">
        <div className="glass-morphism rounded-xl p-8">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-full bg-aiBlue flex items-center justify-center">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-xl text-gradient">Conversia AI</span>
            </div>
            
            <h1 className="text-2xl font-semibold mb-2">Bem-vindo de volta</h1>
            <p className="text-aiGray">Entre para acessar sua conta</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 h-4 w-4 text-aiGray" />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  required
                  className="ai-input pl-10"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="password">Senha</Label>
                <Link to="/forgot-password" className="text-xs text-aiBlue hover:underline">
                  Esqueceu a senha?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-2.5 h-4 w-4 text-aiGray" />
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="ai-input pl-10"
                />
              </div>
            </div>
            
            <Button type="submit" className="ai-button w-full">
              Entrar
            </Button>
          </form>
          
          <div className="mt-6 text-center text-sm">
            <span className="text-aiGray">Não tem uma conta? </span>
            <Link to="/register" className="text-aiBlue hover:underline">
              Cadastre-se
            </Link>
          </div>
        </div>
      </div>
      
      {/* Gradient orbs */}
      <div className="absolute bottom-1/4 left-0 w-96 h-96 rounded-full bg-aiPurple/10 blur-[120px] -z-10" />
      <div className="absolute top-1/4 right-0 w-96 h-96 rounded-full bg-aiBlue/10 blur-[120px] -z-10" />
    </div>
  );
}
