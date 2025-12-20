import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import {
  Shield,
  Search,
  RefreshCw,
  ExternalLink,
  ChevronLeft,
  Loader2,
  FileText,
  Users,
} from "lucide-react";
import { SEOHead } from "@/components/seo";
import { retryFormSubmission } from "@/lib/formSubmit";
import { format } from "date-fns";

interface FormSubmission {
  id: string;
  created_at: string;
  form_type: string;
  name: string | null;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  phone: string | null;
  status: string | null;
  routing_result: string | null;
  advisor: string | null;
  pipedrive_person_id: number | null;
  pipedrive_lead_id: string | null;
  pipedrive_owner_id: number | null;
  error_message: string | null;
  source_url: string | null;
  form_data: Record<string, unknown>;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
}

const AdminFormSubmissions = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [routingFilter, setRoutingFilter] = useState("all");
  const [formTypeFilter, setFormTypeFilter] = useState("all");
  const [selectedSubmission, setSelectedSubmission] = useState<FormSubmission | null>(null);
  const [retryingId, setRetryingId] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { data: submissions = [], isLoading, refetch } = useQuery({
    queryKey: ["admin-form-submissions"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("form_submissions")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(500);
      
      if (error) throw error;
      return data as FormSubmission[];
    },
  });

  const formTypes = useMemo(() => {
    const types = new Set(submissions.map(s => s.form_type));
    return Array.from(types).sort();
  }, [submissions]);

  const filteredSubmissions = useMemo(() => {
    return submissions.filter((submission) => {
      const matchesSearch =
        searchQuery === "" ||
        submission.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        submission.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        submission.phone?.includes(searchQuery);

      const matchesStatus =
        statusFilter === "all" || submission.status === statusFilter;

      const matchesRouting =
        routingFilter === "all" || submission.routing_result === routingFilter;

      const matchesFormType =
        formTypeFilter === "all" || submission.form_type === formTypeFilter;

      return matchesSearch && matchesStatus && matchesRouting && matchesFormType;
    });
  }, [submissions, searchQuery, statusFilter, routingFilter, formTypeFilter]);

  const handleRetry = async (submissionId: string) => {
    setRetryingId(submissionId);
    try {
      const result = await retryFormSubmission(submissionId);
      if (result.ok) {
        toast.success("Submission retried successfully", {
          description: `Routed to: ${result.routed_to}`,
        });
        refetch();
      } else {
        toast.error("Retry failed", {
          description: result.error,
        });
      }
    } catch (err) {
      toast.error("Retry failed", {
        description: err instanceof Error ? err.message : "Unknown error",
      });
    } finally {
      setRetryingId(null);
    }
  };

  const getStatusBadge = (status: string | null) => {
    switch (status) {
      case "created":
        return <Badge className="bg-green-600">Created</Badge>;
      case "updated":
        return <Badge className="bg-blue-600">Updated</Badge>;
      case "failed":
        return <Badge variant="destructive">Failed</Badge>;
      case "processing":
        return <Badge variant="secondary">Processing</Badge>;
      default:
        return <Badge variant="outline">{status || "Unknown"}</Badge>;
    }
  };

  const getRoutingBadge = (routing: string | null) => {
    if (routing === "advisor_match") {
      return <Badge variant="outline" className="border-green-500 text-green-700">Advisor Match</Badge>;
    }
    if (routing === "default_manny") {
      return <Badge variant="outline" className="border-blue-500 text-blue-700">Default (Manny)</Badge>;
    }
    return <Badge variant="outline">—</Badge>;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen py-24 bg-gradient-to-b from-secondary/30 to-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-accent" />
      </div>
    );
  }

  return (
    <>
      <SEOHead
        title="Form Submissions - Admin"
        description="View and manage form submissions"
        noIndex={true}
      />
      <div className="min-h-screen py-24 bg-gradient-to-b from-secondary/30 to-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8 animate-fade-in">
            <div className="flex items-center gap-3">
              <Shield className="h-10 w-10 text-accent" />
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-navy">Form Submissions</h1>
                <p className="text-muted-foreground">View and manage Pipedrive-synced submissions</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" asChild>
                <Link to="/admin">
                  <ChevronLeft className="h-4 w-4 mr-2" />
                  Back to Dashboard
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/admin/applications">
                  <FileText className="h-4 w-4 mr-2" />
                  Life Insurance
                </Link>
              </Button>
            </div>
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
            <div className="relative md:col-span-2">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, email, or phone..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="created">Created</SelectItem>
                <SelectItem value="updated">Updated</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
              </SelectContent>
            </Select>
            <Select value={routingFilter} onValueChange={setRoutingFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Routing" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Routing</SelectItem>
                <SelectItem value="advisor_match">Advisor Match</SelectItem>
                <SelectItem value="default_manny">Default (Manny)</SelectItem>
              </SelectContent>
            </Select>
            <Select value={formTypeFilter} onValueChange={setFormTypeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Form Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Forms</SelectItem>
                {formTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-card rounded-lg p-4 border">
              <p className="text-sm text-muted-foreground">Total Submissions</p>
              <p className="text-2xl font-bold">{submissions.length}</p>
            </div>
            <div className="bg-card rounded-lg p-4 border">
              <p className="text-sm text-muted-foreground">Created</p>
              <p className="text-2xl font-bold text-green-600">
                {submissions.filter((s) => s.status === "created").length}
              </p>
            </div>
            <div className="bg-card rounded-lg p-4 border">
              <p className="text-sm text-muted-foreground">Failed</p>
              <p className="text-2xl font-bold text-red-600">
                {submissions.filter((s) => s.status === "failed").length}
              </p>
            </div>
            <div className="bg-card rounded-lg p-4 border">
              <p className="text-sm text-muted-foreground">Advisor Matches</p>
              <p className="text-2xl font-bold text-blue-600">
                {submissions.filter((s) => s.routing_result === "advisor_match").length}
              </p>
            </div>
          </div>

          {/* Table */}
          <div className="bg-card rounded-lg border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Form</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Routing</TableHead>
                  <TableHead>Pipedrive</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSubmissions.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                      No submissions found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredSubmissions.map((submission) => (
                    <TableRow key={submission.id}>
                      <TableCell className="whitespace-nowrap">
                        {format(new Date(submission.created_at), "MMM d, yyyy")}
                        <br />
                        <span className="text-xs text-muted-foreground">
                          {format(new Date(submission.created_at), "h:mm a")}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{submission.form_type}</Badge>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">
                            {submission.first_name && submission.last_name
                              ? `${submission.first_name} ${submission.last_name}`
                              : submission.name || "—"}
                          </p>
                          <p className="text-sm text-muted-foreground">{submission.email}</p>
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(submission.status)}</TableCell>
                      <TableCell>
                        {getRoutingBadge(submission.routing_result)}
                        {submission.advisor && (
                          <p className="text-xs text-muted-foreground mt-1">{submission.advisor}</p>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="text-xs space-y-1">
                          {submission.pipedrive_person_id && (
                            <p>Person: {submission.pipedrive_person_id}</p>
                          )}
                          {submission.pipedrive_lead_id && (
                            <p>Lead: {submission.pipedrive_lead_id.slice(0, 8)}...</p>
                          )}
                          {!submission.pipedrive_person_id &&
                            !submission.pipedrive_lead_id && (
                              <span className="text-muted-foreground">—</span>
                            )}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setSelectedSubmission(submission)}
                          >
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                          {submission.status === "failed" && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleRetry(submission.id)}
                              disabled={retryingId === submission.id}
                            >
                              {retryingId === submission.id ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                              ) : (
                                <RefreshCw className="h-4 w-4" />
                              )}
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          {/* Detail Modal */}
          <Dialog open={!!selectedSubmission} onOpenChange={() => setSelectedSubmission(null)}>
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Submission Details</DialogTitle>
                <DialogDescription>
                  {selectedSubmission?.form_type} -{" "}
                  {selectedSubmission?.created_at &&
                    format(new Date(selectedSubmission.created_at), "PPpp")}
                </DialogDescription>
              </DialogHeader>
              {selectedSubmission && (
                <div className="space-y-6">
                  {/* Contact Info */}
                  <div>
                    <h4 className="font-medium mb-2">Contact Information</h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="text-muted-foreground">Name:</span>{" "}
                        {selectedSubmission.first_name} {selectedSubmission.last_name}
                      </div>
                      <div>
                        <span className="text-muted-foreground">Email:</span>{" "}
                        {selectedSubmission.email}
                      </div>
                      <div>
                        <span className="text-muted-foreground">Phone:</span>{" "}
                        {selectedSubmission.phone || "—"}
                      </div>
                      <div>
                        <span className="text-muted-foreground">Source:</span>{" "}
                        <a
                          href={selectedSubmission.source_url || "#"}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-accent hover:underline"
                        >
                          View
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Status & Routing */}
                  <div>
                    <h4 className="font-medium mb-2">Status & Routing</h4>
                    <div className="flex items-center gap-4">
                      {getStatusBadge(selectedSubmission.status)}
                      {getRoutingBadge(selectedSubmission.routing_result)}
                      {selectedSubmission.advisor && (
                        <span className="text-sm">→ {selectedSubmission.advisor}</span>
                      )}
                    </div>
                    {selectedSubmission.error_message && (
                      <p className="text-sm text-red-600 mt-2">
                        Error: {selectedSubmission.error_message}
                      </p>
                    )}
                  </div>

                  {/* Pipedrive IDs */}
                  <div>
                    <h4 className="font-medium mb-2">Pipedrive Records</h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="text-muted-foreground">Person ID:</span>{" "}
                        {selectedSubmission.pipedrive_person_id || "—"}
                      </div>
                      <div>
                        <span className="text-muted-foreground">Lead ID:</span>{" "}
                        {selectedSubmission.pipedrive_lead_id || "—"}
                      </div>
                      <div>
                        <span className="text-muted-foreground">Owner ID:</span>{" "}
                        {selectedSubmission.pipedrive_owner_id || "—"}
                      </div>
                    </div>
                  </div>

                  {/* UTM Parameters */}
                  {(selectedSubmission.utm_source ||
                    selectedSubmission.utm_medium ||
                    selectedSubmission.utm_campaign) && (
                    <div>
                      <h4 className="font-medium mb-2">Attribution</h4>
                      <div className="grid grid-cols-3 gap-2 text-sm">
                        <div>
                          <span className="text-muted-foreground">Source:</span>{" "}
                          {selectedSubmission.utm_source || "—"}
                        </div>
                        <div>
                          <span className="text-muted-foreground">Medium:</span>{" "}
                          {selectedSubmission.utm_medium || "—"}
                        </div>
                        <div>
                          <span className="text-muted-foreground">Campaign:</span>{" "}
                          {selectedSubmission.utm_campaign || "—"}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Raw Form Data */}
                  <div>
                    <h4 className="font-medium mb-2">Raw Form Data</h4>
                    <pre className="bg-muted p-4 rounded-lg text-xs overflow-x-auto">
                      {JSON.stringify(selectedSubmission.form_data, null, 2)}
                    </pre>
                  </div>
                </div>
              )}
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </>
  );
};

export default AdminFormSubmissions;
