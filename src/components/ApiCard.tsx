import { Trash2 } from "lucide-react";
import { ApiEndpoint } from "@/lib/api-store";
import { Button } from "@/components/ui/button";

interface ApiCardProps {
  endpoint: ApiEndpoint;
  onDelete: (id: string) => void;
}

function methodClass(method: string) {
  return `method-badge method-${method.toLowerCase()}`;
}

export default function ApiCard({ endpoint, onDelete }: ApiCardProps) {
  return (
    <div className="bg-card border border-border rounded-lg p-4 space-y-2 animate-fade-in">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 min-w-0">
          <span className={methodClass(endpoint.method)}>{endpoint.method}</span>
          <span className="font-mono text-sm text-foreground truncate">{endpoint.url}</span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="shrink-0 text-muted-foreground hover:text-destructive"
          onClick={() => onDelete(endpoint.id)}
        >
          <Trash2 size={14} />
        </Button>
      </div>
      <p className="text-xs text-muted-foreground">{endpoint.name} — {endpoint.description}</p>
    </div>
  );
}
