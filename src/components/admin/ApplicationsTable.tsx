import { useState } from "react";
import { format } from "date-fns";
import { Eye, Download, MoreHorizontal, Trash2, Mail, Loader2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import type { LifeInsuranceApplication } from "@/hooks/useLifeInsuranceApplications";
import { useResendApplicationPdf } from "@/hooks/useLifeInsuranceApplications";
import { downloadApplicationPdf } from "@/lib/lifeInsurancePdfGenerator";
import { toast } from "sonner";

interface ApplicationsTableProps {
  applications: LifeInsuranceApplication[];
  onView: (application: LifeInsuranceApplication) => void;
  onDelete: (id: string) => void;
}

const statusColors: Record<string, string> = {
  draft: "bg-gray-100 text-gray-800",
  submitted: "bg-blue-100 text-blue-800",
  under_review: "bg-yellow-100 text-yellow-800",
  approved: "bg-green-100 text-green-800",
  needs_info: "bg-orange-100 text-orange-800",
  rejected: "bg-red-100 text-red-800",
};

const formatStatus = (status: string): string => {
  return status.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
};

export const ApplicationsTable = ({
  applications,
  onView,
  onDelete,
}: ApplicationsTableProps) => {
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const resendPdfMutation = useResendApplicationPdf();

  const handleDelete = () => {
    if (deleteId) {
      onDelete(deleteId);
      setDeleteId(null);
    }
  };

  const handleResendPdf = (appId: string, advisorName?: string | null) => {
    resendPdfMutation.mutate(appId, {
      onSuccess: (data) => {
        toast.success(data.message);
      },
      onError: (error) => {
        toast.error("Failed to resend PDF: " + (error instanceof Error ? error.message : "Unknown error"));
      },
    });
  };

  if (applications.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        No applications found matching your criteria.
      </div>
    );
  }

  return (
    <>
      <div className="rounded-lg border bg-card overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead>Applicant</TableHead>
              <TableHead>Advisor</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Step</TableHead>
              <TableHead>Submitted</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {applications.map((app) => (
              <TableRow key={app.id} className="hover:bg-muted/30">
                <TableCell className="font-mono text-xs">
                  {app.id.slice(0, 8).toUpperCase()}
                </TableCell>
                <TableCell>
                  <div>
                    <div className="font-medium">
                      {app.applicant_name || "N/A"}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {app.applicant_email || "No email"}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="text-sm">{app.advisor_name || "—"}</div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant="secondary"
                    className={statusColors[app.status] || ""}
                  >
                    {formatStatus(app.status)}
                  </Badge>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{app.current_step} / 9</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm text-muted-foreground">
                    {format(new Date(app.created_at), "MMM d, yyyy")}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onView(app)}
                      title="View Details"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => downloadApplicationPdf(app)}
                      title="Download PDF"
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => onView(app)}>
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => downloadApplicationPdf(app)}
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Download PDF
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleResendPdf(app.id, app.advisor_name)}
                          disabled={resendPdfMutation.isPending}
                        >
                          {resendPdfMutation.isPending ? (
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          ) : (
                            <Mail className="h-4 w-4 mr-2" />
                          )}
                          Resend PDF to Advisor
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-destructive"
                          onClick={() => setDeleteId(app.id)}
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Application</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this application? This action
              cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
