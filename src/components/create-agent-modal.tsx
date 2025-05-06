import * as React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Slider } from "@/components/ui/slider";
import { Info, AlertCircle } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "O nome do agente precisa ter pelo menos 2 caracteres.",
  }),
  description: z.string().min(10, {
    message: "A descrição precisa ter pelo menos 10 caracteres.",
  }),
  type: z.enum(["financeiro", "suporte", "vendas", "atendimento", "customizado"], {
    required_error: "Por favor selecione um tipo de agente.",
  }),
  temperature: z.number().min(0.2).max(1).default(0.7),
  model: z.enum(["gpt-4o", "gpt-4o-mini", "gpt-3.5-turbo"], {
    required_error: "Por favor selecione um modelo de linguagem.",
  }),
  tone: z.enum(["direto", "consultivo", "informal", "engraçado"], {
    required_error: "Por favor selecione um tom de voz.",
  }),
  responseDelay: z.enum(["2", "5", "10", "15"], {
    required_error: "Por favor selecione um tempo de resposta.",
  }),
  language: z.enum(["auto", "pt-br", "en", "es"], {
    required_error: "Por favor selecione um idioma.",
  }),
});

type FormValues = z.infer<typeof formSchema>;

interface CreateAgentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const modelCostInfo = {
  "gpt-4o": { input: "0.01", output: "0.03" },
  "gpt-4o-mini": { input: "0.00", output: "0.01" },
  "gpt-3.5-turbo": { input: "0.001", output: "0.002" },
};

export function CreateAgentModal({ open, onOpenChange }: CreateAgentModalProps) {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      type: "suporte",
      temperature: 0.7,
      model: "gpt-4o-mini",
      tone: "consultivo",
      responseDelay: "5",
      language: "auto",
    },
  });

  const watchModel = form.watch("model");
  const selectedModel = watchModel as keyof typeof modelCostInfo;
  
  const temperatureDescriptions = {
    low: "Preciso e determinístico - Respostas consistentes e seguras",
    medium: "Balanceado - Mix de criatividade e precisão",
    high: "Criativo e variado - Respostas mais diversificadas"
  };
  
  const getTemperatureDescription = (temp: number) => {
    if (temp < 0.4) return temperatureDescriptions.low;
    if (temp < 0.8) return temperatureDescriptions.medium;
    return temperatureDescriptions.high;
  };
  
  const watchTemperature = form.watch("temperature");

  const onSubmit = (data: FormValues) => {
    // Here we would typically make an API call to create the agent
    
    toast({
      title: "Agente criado com sucesso!",
      description: `O agente ${data.name} foi criado e está em treinamento.`,
    });
    
    // Close the dialog
    onOpenChange(false);
    
    // Reset the form
    form.reset();
    
    // Generate a random ID for demo purposes
    const newAgentId = Math.floor(Math.random() * 1000).toString();
    
    // Navigate to the new agent's configuration page
    navigate(`/agent/${newAgentId}`);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] glass-morphism">
        <DialogHeader>
          <DialogTitle className="text-xl">Criar Novo Agente</DialogTitle>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      Nome do Agente
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                          </TooltipTrigger>
                          <TooltipContent className="w-80 p-3">
                            <p>Nome que seu cliente verá durante a conversa no WhatsApp.</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: Assistente de Vendas" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      Tipo de Agente
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                          </TooltipTrigger>
                          <TooltipContent className="w-80 p-3">
                            <p>Define o comportamento base e recomendações para seu agente.</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o tipo de agente" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="financeiro">Financeiro</SelectItem>
                        <SelectItem value="suporte">Suporte</SelectItem>
                        <SelectItem value="vendas">Vendas</SelectItem>
                        <SelectItem value="atendimento">Atendimento</SelectItem>
                        <SelectItem value="customizado">Customizado</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Descreva a função deste agente..." 
                      className="resize-none min-h-[80px]" 
                      {...field} 
                    />
                  </FormControl>
                  <FormDescription>
                    Uma breve descrição do propósito do agente e suas funções principais
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="model"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      Modelo
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                          </TooltipTrigger>
                          <TooltipContent className="w-80 p-3">
                            <p>Modelos mais avançados têm melhor compreensão, mas custam mais por token.</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o modelo" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="gpt-4o">GPT-4o (Avançado)</SelectItem>
                        <SelectItem value="gpt-4o-mini">GPT-4o Mini (Recomendado)</SelectItem>
                        <SelectItem value="gpt-3.5-turbo">GPT-3.5 Turbo (Econômico)</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription className="flex justify-between text-xs">
                      <span>Entrada: ${modelCostInfo[selectedModel].input}/1K tokens</span>
                      <span>Saída: ${modelCostInfo[selectedModel].output}/1K tokens</span>
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="tone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      Tom de Voz
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                          </TooltipTrigger>
                          <TooltipContent className="w-80 p-3">
                            <p>Define como seu agente se comunica com os clientes.</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o tom de voz" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="direto">Direto e Objetivo</SelectItem>
                        <SelectItem value="consultivo">Consultivo</SelectItem>
                        <SelectItem value="informal">Informal</SelectItem>
                        <SelectItem value="engraçado">Engraçado</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="temperature"
              render={({ field: { onChange, value } }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    Temperatura: {value.toFixed(1)}
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                        </TooltipTrigger>
                        <TooltipContent className="w-80 p-3">
                          <p>Temperatura define a criatividade do agente. Valores mais baixos (0.2) geram respostas mais precisas e consistentes. Valores mais altos (1.0) geram respostas mais criativas e diversificadas.</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </FormLabel>
                  <div className="pt-2">
                    <Slider
                      defaultValue={[value]}
                      min={0.2}
                      max={1}
                      step={0.1}
                      onValueChange={([newVal]) => onChange(newVal)}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>0.2 (Preciso)</span>
                    <span>1.0 (Criativo)</span>
                  </div>
                  <p className="text-sm mt-2 text-muted-foreground italic">{getTemperatureDescription(value)}</p>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="responseDelay"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      Delay de Resposta
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                          </TooltipTrigger>
                          <TooltipContent className="w-80 p-3">
                            <p>Tempo para o agente começar a responder. Um pequeno delay torna a conversa mais natural.</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o tempo" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="2">2 segundos</SelectItem>
                        <SelectItem value="5">5 segundos</SelectItem>
                        <SelectItem value="10">10 segundos</SelectItem>
                        <SelectItem value="15">15 segundos</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="language"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      Idioma
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                          </TooltipTrigger>
                          <TooltipContent className="w-80 p-3">
                            <p>Idioma principal do agente. Detecção automática responde no idioma da mensagem do cliente.</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o idioma" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="auto">Detecção automática (Recomendado)</SelectItem>
                        <SelectItem value="pt-br">Português (Brasil)</SelectItem>
                        <SelectItem value="en">Inglês</SelectItem>
                        <SelectItem value="es">Espanhol</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="bg-white/5 rounded-lg p-4 mt-4 border border-white/10">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-blue-400 mt-0.5" />
                <div>
                  <h4 className="font-medium text-sm">Após criar seu agente</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Você poderá personalizar instruções específicas, definir comportamentos, 
                    carregar documentos e conectar ao WhatsApp.
                  </p>
                </div>
              </div>
            </div>
            
            <DialogFooter className="pt-4">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancelar
              </Button>
              <Button type="submit" className="ai-button">
                Criar Agente
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
