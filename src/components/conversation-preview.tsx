
import { useState } from "react";
import { MessageCircle, Phone, Upload, Bot, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar } from "@/components/ui/avatar";

interface Message {
  id: string;
  content: string;
  sender: "user" | "bot" | "agent";
  timestamp: string;
  status?: "delivered" | "read" | "failed";
}

interface ConversationPreviewProps {
  messages: Message[];
  onSendMessage?: (message: string) => void;
  onTakeOver?: () => void;
}

export function ConversationPreview({ 
  messages = [], 
  onSendMessage,
  onTakeOver
}: ConversationPreviewProps) {
  const [newMessage, setNewMessage] = useState("");
  
  const handleSendMessage = () => {
    if (newMessage.trim()) {
      onSendMessage?.(newMessage);
      setNewMessage("");
    }
  };
  
  return (
    <div className="flex flex-col h-full bg-aiDark-darker rounded-xl border border-white/5 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-white/5">
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8 bg-aiBlue">
            <MessageCircle className="h-4 w-4" />
          </Avatar>
          <div>
            <h3 className="font-medium text-sm">Conversa com João Silva</h3>
            <p className="text-xs text-aiGray">Iniciada há 15 minutos</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" size="icon" className="h-8 w-8 text-aiGray-light">
            <Phone className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-aiGray-light">
            <Upload className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {/* Messages */}
      <div className="flex-grow overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div 
            key={message.id}
            className={`flex ${message.sender !== 'user' ? 'justify-start' : 'justify-end'}`}
          >
            <div 
              className={`
                max-w-[80%] px-4 py-2 rounded-2xl
                ${message.sender === 'user' 
                  ? 'bg-aiPurple text-white rounded-br-none' 
                  : message.sender === 'bot'
                    ? 'bg-aiBlue text-white rounded-bl-none'
                    : 'bg-muted text-white rounded-bl-none'
                }
              `}
            >
              {message.sender === 'bot' && (
                <div className="flex items-center gap-1.5 mb-1">
                  <Bot className="w-3.5 h-3.5" />
                  <span className="text-xs font-medium">Adão (IA)</span>
                </div>
              )}
              {message.sender === 'agent' && (
                <div className="flex items-center gap-1.5 mb-1">
                  <Avatar className="h-3.5 w-3.5">
                    <span className="text-[8px]">AS</span>
                  </Avatar>
                  <span className="text-xs font-medium">Ana Silva</span>
                </div>
              )}
              <p className="text-sm">{message.content}</p>
              <div className="text-right">
                <span className="text-xs opacity-70">{message.timestamp}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Intervention Banner */}
      <div className="p-2 bg-yellow-500/20 border-t border-b border-yellow-500/30">
        <div className="flex items-center justify-between">
          <span className="text-xs text-yellow-400">
            O agente está detectando frustração do cliente
          </span>
          <Button onClick={onTakeOver} size="sm" variant="destructive" className="h-7 text-xs bg-yellow-500/50 hover:bg-yellow-500/70">
            Assumir conversa
          </Button>
        </div>
      </div>
      
      {/* Input */}
      <div className="p-4 border-t border-white/5">
        <div className="flex gap-2">
          <Textarea 
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Digite sua mensagem..."
            className="resize-none bg-aiDark-lighter border-white/10 focus-visible:ring-aiBlue min-h-[60px]"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
          />
          <Button onClick={handleSendMessage} className="bg-aiBlue hover:bg-aiBlue-dark">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
