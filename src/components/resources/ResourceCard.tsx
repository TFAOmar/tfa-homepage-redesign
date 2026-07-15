import { FileText, Download, Eye, Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";
import { getSignedUrl, formatFileSize, type Resource } from "@/hooks/useResources";

interface Props {
  resource: Resource;
}

const ResourceCard = ({ resource }: Props) => {
  const [busy, setBusy] = useState<"preview" | "download" | null>(null);

  const handleOpen = async (mode: "preview" | "download") => {
    try {
      setBusy(mode);
      const url = await getSignedUrl(
        resource.file_path,
        mode === "download" ? resource.file_name : false,
      );
      if (mode === "preview") {
        window.open(url, "_blank", "noopener,noreferrer");
      } else {
        const a = document.createElement("a");
        a.href = url;
        a.download = resource.file_name;
        document.body.appendChild(a);
        a.click();
        a.remove();
      }
    } catch (err: any) {
      toast.error("Unable to open file", { description: err?.message });
    } finally {
      setBusy(null);
    }
  };

  return (
    <Card className="group flex flex-col hover:shadow-lg transition-shadow border-border/60">
      <CardContent className="p-5 flex flex-col flex-1 gap-4">
        <div className="flex items-start gap-3">
          <div className="shrink-0 w-11 h-11 rounded-lg bg-accent/10 text-accent flex items-center justify-center">
            <FileText className="h-5 w-5" />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="font-semibold text-navy leading-snug line-clamp-2">{resource.title}</h3>
            {resource.category?.name && (
              <Badge variant="secondary" className="mt-1.5 text-xs">
                {resource.category.name}
              </Badge>
            )}
          </div>
        </div>

        {resource.description && (
          <p className="text-sm text-muted-foreground line-clamp-3">{resource.description}</p>
        )}

        <div className="mt-auto flex items-center justify-between text-xs text-muted-foreground">
          <span>{formatFileSize(resource.file_size)}</span>
          <span>Updated {new Date(resource.updated_at).toLocaleDateString()}</span>
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={() => handleOpen("preview")}
            disabled={busy !== null}
          >
            {busy === "preview" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Eye className="h-4 w-4 mr-1.5" />}
            Preview
          </Button>
          <Button
            size="sm"
            className="flex-1"
            onClick={() => handleOpen("download")}
            disabled={busy !== null}
          >
            {busy === "download" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4 mr-1.5" />}
            Download
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResourceCard;