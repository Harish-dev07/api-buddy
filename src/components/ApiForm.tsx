import { useState } from "react";
import { Plus } from "lucide-react";
import { ApiEndpoint } from "@/lib/api-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ApiFormProps {
  onAdd: (endpoint: Omit<ApiEndpoint, "id">) => void;
}

const methods = ["GET", "POST", "PUT", "DELETE", "PATCH"] as const;

export default function ApiForm({ onAdd }: ApiFormProps) {
  const [name, setName] = useState("");
  const [keywords, setKeywords] = useState("");
  const [method, setMethod] = useState<ApiEndpoint["method"]>("GET");
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");
  const [requestBody, setRequestBody] = useState("");
  const [responseBody, setResponseBody] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !url.trim()) return;
    onAdd({ name, keywords, method, url, description, requestBody, responseBody });
    setName("");
    setKeywords("");
    setMethod("GET");
    setUrl("");
    setDescription("");
    setRequestBody("");
    setResponseBody("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <Label className="text-muted-foreground text-xs uppercase tracking-wider">API Name</Label>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. User Add API"
            className="bg-muted border-border font-mono text-sm"
          />
        </div>
        <div className="space-y-1.5">
          <Label className="text-muted-foreground text-xs uppercase tracking-wider">Keywords</Label>
          <Input
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
            placeholder="e.g. user add create"
            className="bg-muted border-border font-mono text-sm"
          />
        </div>
      </div>

      <div className="grid grid-cols-[120px_1fr] gap-3">
        <div className="space-y-1.5">
          <Label className="text-muted-foreground text-xs uppercase tracking-wider">Method</Label>
          <Select value={method} onValueChange={(v) => setMethod(v as ApiEndpoint["method"])}>
            <SelectTrigger className="bg-muted border-border font-mono text-sm font-bold">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {methods.map((m) => (
                <SelectItem key={m} value={m} className="font-mono font-bold">
                  {m}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1.5">
          <Label className="text-muted-foreground text-xs uppercase tracking-wider">Endpoint URL</Label>
          <Input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="/api/v1/resource"
            className="bg-muted border-border font-mono text-sm"
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <Label className="text-muted-foreground text-xs uppercase tracking-wider">Description</Label>
        <Input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="What does this endpoint do?"
          className="bg-muted border-border text-sm"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <Label className="text-muted-foreground text-xs uppercase tracking-wider">Request Body (JSON)</Label>
          <Textarea
            value={requestBody}
            onChange={(e) => setRequestBody(e.target.value)}
            placeholder='{"key": "type"}'
            rows={4}
            className="bg-muted border-border font-mono text-xs resize-none"
          />
        </div>
        <div className="space-y-1.5">
          <Label className="text-muted-foreground text-xs uppercase tracking-wider">Response Body (JSON)</Label>
          <Textarea
            value={responseBody}
            onChange={(e) => setResponseBody(e.target.value)}
            placeholder='{"id": "number"}'
            rows={4}
            className="bg-muted border-border font-mono text-xs resize-none"
          />
        </div>
      </div>

      <Button type="submit" className="w-full gap-2">
        <Plus size={16} />
        Add Endpoint
      </Button>
    </form>
  );
}
