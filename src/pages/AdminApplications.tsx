import { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, FileText, Filter, ArrowLeft, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { SEOHead } from "@/components/seo";
import { toast } from "sonner";
import {
  useAdminApplications,
  useUpdateApplicationStatus,
  useDeleteApplication,
  type LifeInsuranceApplication,
} from "@/hooks/useLifeInsuranceApplications";
import { ApplicationsTable } from "@/components/admin/ApplicationsTable";
import { ApplicationDetailModal } from "@/components/admin/ApplicationDetailModal";
import type { Database } from "@/integrations/supabase/types";

type ApplicationStatus = Database["public"]["Enums"]["application_status"];

const AdminApplications = () => {
  const { data: applications = [], isLoading } = useAdminApplications();
  const updateStatus = useUpdateApplicationStatus();
  const deleteApplication = useDeleteApplication();

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedApplication, setSelectedApplication] =
    useState<LifeInsuranceApplication | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filteredApplications = useMemo(() => {
    return applications.filter((app) => {
      const matchesSearch =
        searchQuery === "" ||
        app.applicant_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.applicant_email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.applicant_phone?.includes(searchQuery) ||
        app.id.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus =
        statusFilter === "all" || app.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [applications, searchQuery, statusFilter]);

  const stats = useMemo(() => {
    return {
      total: applications.length,
      submitted: applications.filter((a) => a.status === "submitted").length,
      underReview: applications.filter((a) => a.status === "under_review").length,
      approved: applications.filter((a) => a.status === "approved").length,
      rejected: applications.filter((a) => a.status === "rejected").length,
    };
  }, [applications]);

  const handleUpdateStatus = (id: string, status: ApplicationStatus) => {
    updateStatus.mutate(
      { id, status },
      {
        onSuccess: () => toast.success(`Status updated to ${status.replace(/_/g, " ")}`),
        onError: () => toast.error("Failed to update status"),
      }
    );
  };

  const handleDelete = (id: string) => {
    deleteApplication.mutate(id, {
      onSuccess: () => toast.success("Application deleted"),
      onError: () => toast.error("Failed to delete application"),
    });
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
        title="Life Insurance Applications"
        description="Admin view for managing life insurance applications"
        noIndex={true}
      />
      <div className="min-h-screen py-24 bg-gradient-to-b from-secondary/30 to-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8 animate-fade-in">
            <div className="flex items-center gap-3">
              <FileText className="h-10 w-10 text-accent" />
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-navy">
                  Life Insurance Applications
                </h1>
                <p className="text-muted-foreground">
                  Review and manage submitted applications
                </p>
              </div>
            </div>
            <Button variant="outline" asChild>
              <Link to="/admin">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Link>
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
            <Card>
              <CardContent className="pt-6">
                <div className="text-2xl font-bold text-navy">{stats.total}</div>
                <p className="text-sm text-muted-foreground">Total</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-2xl font-bold text-blue-600">
                  {stats.submitted}
                </div>
                <p className="text-sm text-muted-foreground">Submitted</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-2xl font-bold text-yellow-600">
                  {stats.underReview}
                </div>
                <p className="text-sm text-muted-foreground">Under Review</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-2xl font-bold text-green-600">
                  {stats.approved}
                </div>
                <p className="text-sm text-muted-foreground">Approved</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-2xl font-bold text-red-600">
                  {stats.rejected}
                </div>
                <p className="text-sm text-muted-foreground">Rejected</p>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, email, phone, or ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="All Statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="submitted">Submitted</SelectItem>
                  <SelectItem value="under_review">Under Review</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="needs_info">Needs Info</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Results count */}
          <p className="text-sm text-muted-foreground mb-4">
            Showing {filteredApplications.length} of {applications.length}{" "}
            applications
          </p>

          {/* Applications Table */}
          <ApplicationsTable
            applications={filteredApplications}
            onView={setSelectedApplication}
            onDelete={handleDelete}
          />

          {/* Detail Modal */}
          <ApplicationDetailModal
            application={selectedApplication}
            open={!!selectedApplication}
            onClose={() => setSelectedApplication(null)}
            onUpdateStatus={handleUpdateStatus}
          />
        </div>
      </div>
    </>
  );
};

export default AdminApplications;
