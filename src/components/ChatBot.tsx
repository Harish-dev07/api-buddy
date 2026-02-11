import { useState, useRef, useEffect } from "react";
import { Send, Bot, User } from "lucide-react";
import { ApiEndpoint, searchEndpoints } from "@/lib/api-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Message {
  role: "user" | "bot";
  text: string;
  results?: ApiEndpoint[];
}

interface ChatBotProps {
  endpoints: ApiEndpoint[];
}

function methodClass(method: string) {
  return `method-badge method-${method.toLowerCase()}`;
}

function formatGreeting(): Message {
  return {
    role: "bot",
    text: "👋 Hey! I'm your API Assistant. Ask me about any stored endpoint — try something like \"give me the user add api\" or \"show delete endpoints\".",
  };
}

export default function ChatBot({ endpoints }: ChatBotProps) {
  const [messages, setMessages] = useState<Message[]>([formatGreeting()]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    const q = input.trim();
    if (!q) return;

    const userMsg: Message = { role: "user", text: q };
    const results = searchEndpoints(q, endpoints);

    const botMsg: Message = results.length > 0
      ? { role: "bot", text: `Found **${results.length}** matching endpoint${results.length > 1 ? "s" : ""}:`, results }
      : { role: "bot", text: "No endpoints matched your query. Try different keywords or add a new API first." };

    setMessages((prev) => [...prev, userMsg, botMsg]);
    setInput("");
  };

  return (
    <div className="flex flex-col h-full">
      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, i) => (
          <div key={i} className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"} animate-fade-in`}>
            {msg.role === "bot" && (
              <div className="shrink-0 w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center mt-1">
                <Bot size={14} className="text-primary" />
              </div>
            )}
            <div className={`max-w-[85%] space-y-3 ${msg.role === "user" ? "chat-bubble-user" : "chat-bubble-bot"}`}>
              <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
              {msg.results?.map((ep) => (
                <div key={ep.id} className="code-block space-y-2">
                  <div className="flex items-center gap-2">
                    <span className={methodClass(ep.method)}>{ep.method}</span>
                    <span className="font-mono text-sm text-foreground">{ep.url}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{ep.description}</p>
                  {ep.requestBody && (
                    <div>
                      <p className="text-xs text-primary font-semibold mb-1">Request Body:</p>
                      <pre className="text-xs text-secondary-foreground">{ep.requestBody}</pre>
                    </div>
                  )}
                  {ep.responseBody && (
                    <div>
                      <p className="text-xs text-accent font-semibold mb-1">Response Body:</p>
                      <pre className="text-xs text-secondary-foreground">{ep.responseBody}</pre>
                    </div>
                  )}
                </div>
              ))}
            </div>
            {msg.role === "user" && (
              <div className="shrink-0 w-7 h-7 rounded-full bg-secondary flex items-center justify-center mt-1">
                <User size={14} className="text-secondary-foreground" />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="border-t border-border p-4">
        <form
          onSubmit={(e) => { e.preventDefault(); handleSend(); }}
          className="flex gap-2"
        >
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about an API... e.g. 'give me the user add api'"
            className="bg-muted border-border font-mono text-sm"
          />
          <Button type="submit" size="icon" className="shrink-0">
            <Send size={16} />
          </Button>
        </form>
      </div>
    </div>
  );
}
