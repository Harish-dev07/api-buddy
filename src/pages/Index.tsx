import { useState, useEffect } from "react";
import { Database, MessageSquare, Zap } from "lucide-react";
import { ApiEndpoint, loadEndpoints, saveEndpoints } from "@/lib/api-store";
import ApiForm from "@/components/ApiForm";
import ApiCard from "@/components/ApiCard";
import ChatBot from "@/components/ChatBot";

export default function Index() {
  const [endpoints, setEndpoints] = useState<ApiEndpoint[]>([]);

  useEffect(() => {
    setEndpoints(loadEndpoints());
  }, []);

  useEffect(() => {
    if (endpoints.length > 0) saveEndpoints(endpoints);
  }, [endpoints]);

  const addEndpoint = (ep: Omit<ApiEndpoint, "id">) => {
    setEndpoints((prev) => [...prev, { ...ep, id: crypto.randomUUID() }]);
  };

  const deleteEndpoint = (id: string) => {
    setEndpoints((prev) => prev.filter((e) => e.id !== id));
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <header className="border-b border-border px-6 py-3 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center glow-primary">
            <Zap size={16} className="text-primary" />
          </div>
          <h1 className="font-semibold text-foreground tracking-tight">API Knowledge Hub</h1>
        </div>
        <span className="text-xs font-mono text-muted-foreground">{endpoints.length} endpoints stored</span>
      </header>

      {/* Split View */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left: API Manager */}
        <div className="w-1/2 border-r border-border flex flex-col overflow-hidden">
          <div className="px-5 py-3 border-b border-border flex items-center gap-2 shrink-0">
            <Database size={14} className="text-primary" />
            <span className="text-sm font-medium text-foreground">API Manager</span>
          </div>
          <div className="flex-1 overflow-y-auto p-5 space-y-6">
            <ApiForm onAdd={addEndpoint} />

            <div className="space-y-2">
              <h3 className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
                Stored Endpoints
              </h3>
              {endpoints.length === 0 ? (
                <p className="text-sm text-muted-foreground py-8 text-center">
                  No endpoints yet. Add one above!
                </p>
              ) : (
                endpoints.map((ep) => (
                  <ApiCard key={ep.id} endpoint={ep} onDelete={deleteEndpoint} />
                ))
              )}
            </div>
          </div>
        </div>

        {/* Right: Chat */}
        <div className="w-1/2 flex flex-col overflow-hidden">
          <div className="px-5 py-3 border-b border-border flex items-center gap-2 shrink-0">
            <MessageSquare size={14} className="text-accent" />
            <span className="text-sm font-medium text-foreground">API Assistant</span>
          </div>
          <ChatBot endpoints={endpoints} />
        </div>
      </div>
    </div>
  );
}
