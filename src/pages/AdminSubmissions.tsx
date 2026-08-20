import { useState, useMemo, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Search, FileText, Filter, ArrowLeft, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SEOHead } from "@/components/seo";
import { toast } from "sonner";
import {
  useAdminApplications, useUpdateApplicationStatus, useDeleteApplication,
  type LifeInsuranceApplication,
} from "@/hooks/useLifeInsuranceApplications";
import {
  useAdminPrequalifications, useUpdatePrequalificationStatus, useDeletePrequalification,
  type PrequalificationApplication,
} from "@/hooks/usePrequalificationApplications";
import {
  useAdminEstatePlanningApplications, useUpdateEstatePlanningStatus, useDeleteEstatePlanningApplication,
  type EstatePlanningApplication,
} from "@/hooks/useEstatePlanningApplications";
import { ApplicationsTable } from "@/components/admin/ApplicationsTable";
import { ApplicationDetailModal } from "@/components/admin/ApplicationDetailModal";
import { SubmissionsTable } from "@/components/admin/SubmissionsTable";
import { SubmissionDetailModal } from "@/components/admin/SubmissionDetailModal";
import AdminTopBar from "@/components/admin/AdminTopBar";
import type { Database } from "@/integrations/supabase/types";

type LifeStatus = Database["public"]["Enums"]["application_status"];
type EstateStatus = Database["public"]["Enums"]["estate_planning_status"];

const lifeStatusOptions = [
  { value: "all", label: "All Statuses" },
  { value: "draft", label: "Draft" },
  { value: "submitted", label: "Submitted" },
  { value: "under_review", label: "Under Review" },
  { value: "approved", label: "Approved" },
  { value: "needs_info", label: "Needs Info" },
  { value: "rejected", label: "Rejected" },
];

const prequalStatusOptions = [
  { value: "all", label: "All Statuses" },
  { value: "draft", label: "Draft" },
  { value: "submitted", label: "Submitted" },
  { value: "reviewed", label: "Reviewed" },
];

const estateStatusOptions = [
  { value: "all", label: "All Statuses" },
  { value: "draft", label: "Draft" },
  { value: "submitted", label: "Submitted" },
  { value: "in_review", label: "In Review" },
  { value: "completed", label: "Completed" },
];

const StatCard = ({ value, label, color = "text-navy" }: { value: number; label: string; color?: string }) => (
  <Card>
    <CardContent className="pt-6">
      <div className={`text-2xl font-bold ${color}`}>{value}</div>
      <p className="text-sm text-muted-foreground">{label}</p>
    </CardContent>
  </Card>
);

const SearchBar = ({
  search, setSearch, status, setStatus, options,
}: {
  search: string; setSearch: (s: string) => void;
  status: string; setStatus: (s: string) => void;
  options: { value: string; label: string }[];
}) => (
  <div className="flex flex-col sm:flex-row gap-4 mb-6">
    <div className="relative flex-1">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        placeholder="Search by name, email, phone, or ID..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="pl-10"
      />
    </div>
    <div className="flex items-center gap-2">
      <Filter className="h-4 w-4 text-muted-foreground" />
      <Select value={status} onValueChange={setStatus}>
        <SelectTrigger className="w-44"><SelectValue /></SelectTrigger>
        <SelectContent>
          {options.map((o) => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}
        </SelectContent>
      </Select>
    </div>
  </div>
);

const matchesSearch = (q: string, ...vals: (string | null | undefined)[]) => {
  if (!q) return true;
  const s = q.toLowerCase();
  return vals.some((v) => v?.toLowerCase().includes(s));
};

const AdminSubmissions = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialTab = searchParams.get("tab") || "life";
  const [tab, setTab] = useState(initialTab);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  useEffect(() => {
    const next = new URLSearchParams(searchParams);
    next.set("tab", tab);
    setSearchParams(next, { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab]);

  // ----- Life Insurance -----
  const { data: lifeApps = [], isLoading: lifeLoading } = useAdminApplications();
  const updateLifeStatus = useUpdateApplicationStatus();
  const deleteLife = useDeleteApplication();
  const [lifeSearch, setLifeSearch] = useState("");
  const [lifeStatus, setLifeStatus] = useState("all");
  const [selectedLife, setSelectedLife] = useState<LifeInsuranceApplication | null>(null);

  const filteredLife = useMemo(() => lifeApps.filter((a) =>
    matchesSearch(lifeSearch, a.applicant_name, a.applicant_email, a.applicant_phone, a.id) &&
    (lifeStatus === "all" || a.status === lifeStatus)
  ), [lifeApps, lifeSearch, lifeStatus]);

  const lifeStats = useMemo(() => ({
    total: lifeApps.length,
    submitted: lifeApps.filter((a) => a.status === "submitted").length,
    review: lifeApps.filter((a) => a.status === "under_review").length,
    approved: lifeApps.filter((a) => a.status === "approved").length,
    rejected: lifeApps.filter((a) => a.status === "rejected").length,
  }), [lifeApps]);

  // ----- Pre-Qualification -----
  const { data: prequalApps = [], isLoading: prequalLoading } = useAdminPrequalifications();
  const updatePrequalStatus = useUpdatePrequalificationStatus();
  const deletePrequal = useDeletePrequalification();
  const [prequalSearch, setPrequalSearch] = useState("");
  const [prequalStatusFilter, setPrequalStatusFilter] = useState("all");
  const [selectedPrequal, setSelectedPrequal] = useState<PrequalificationApplication | null>(null);

  const filteredPrequal = useMemo(() => prequalApps.filter((a) =>
    matchesSearch(prequalSearch, a.applicant_name, a.applicant_email, a.applicant_phone, a.id) &&
    (prequalStatusFilter === "all" || a.status === prequalStatusFilter)
  ), [prequalApps, prequalSearch, prequalStatusFilter]);

  const prequalStats = useMemo(() => ({
    total: prequalApps.length,
    draft: prequalApps.filter((a) => a.status === "draft").length,
    submitted: prequalApps.filter((a) => a.status === "submitted").length,
    reviewed: prequalApps.filter((a) => a.status === "reviewed").length,
  }), [prequalApps]);

  // ----- Estate Planning -----
  const { data: estateApps = [], isLoading: estateLoading } = useAdminEstatePlanningApplications();
  const updateEstateStatus = useUpdateEstatePlanningStatus();
  const deleteEstate = useDeleteEstatePlanningApplication();
  const [estateSearch, setEstateSearch] = useState("");
  const [estateStatusFilter, setEstateStatusFilter] = useState("all");
  const [selectedEstate, setSelectedEstate] = useState<EstatePlanningApplication | null>(null);

  const filteredEstate = useMemo(() => estateApps.filter((a) =>
    matchesSearch(estateSearch, a.applicant_name, a.applicant_email, a.applicant_phone, a.id) &&
    (estateStatusFilter === "all" || a.status === estateStatusFilter)
  ), [estateApps, estateSearch, estateStatusFilter]);

  const estateStats = useMemo(() => ({
    total: estateApps.length,
    submitted: estateApps.filter((a) => a.status === "submitted").length,
    review: estateApps.filter((a) => a.status === "in_review").length,
    completed: estateApps.filter((a) => a.status === "completed").length,
  }), [estateApps]);

  if (lifeLoading || prequalLoading || estateLoading) {
    return (
      <div className="min-h-screen py-24 bg-gradient-to-b from-secondary/30 to-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-accent" />
      </div>
    );
  }

  return (
    <>
      <SEOHead title="Submissions" description="Admin view for application submissions" noIndex />
      <AdminTopBar />
      <div className="min-h-screen py-24 bg-gradient-to-b from-secondary/30 to-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8 animate-fade-in">
            <div className="flex items-center gap-3">
              <FileText className="h-10 w-10 text-accent" />
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-navy">Submissions</h1>
                <p className="text-muted-foreground">Life Insurance, Pre-Qualification, and Estate Planning</p>
              </div>
            </div>
            <Button variant="outline" asChild>
              <Link to="/admin"><ArrowLeft className="h-4 w-4 mr-2" />Back to Dashboard</Link>
            </Button>
          </div>

          <Tabs value={tab} onValueChange={setTab} className="space-y-6">
            <TabsList className="glass p-1">
              <TabsTrigger value="life">Life Insurance ({lifeApps.length})</TabsTrigger>
              <TabsTrigger value="prequal">Pre-Qualification ({prequalApps.length})</TabsTrigger>
              <TabsTrigger value="estate">Estate Planning ({estateApps.length})</TabsTrigger>
            </TabsList>

            {/* ---------- Life Insurance ---------- */}
            <TabsContent value="life">
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
                <StatCard value={lifeStats.total} label="Total" />
                <StatCard value={lifeStats.submitted} label="Submitted" color="text-blue-600" />
                <StatCard value={lifeStats.review} label="Under Review" color="text-yellow-600" />
                <StatCard value={lifeStats.approved} label="Approved" color="text-green-600" />
                <StatCard value={lifeStats.rejected} label="Rejected" color="text-red-600" />
              </div>
              <SearchBar search={lifeSearch} setSearch={setLifeSearch} status={lifeStatus} setStatus={setLifeStatus} options={lifeStatusOptions} />
              <p className="text-sm text-muted-foreground mb-4">
                Showing {filteredLife.length} of {lifeApps.length} applications
              </p>
              <ApplicationsTable
                applications={filteredLife}
                onView={setSelectedLife}
                onDelete={(id) => deleteLife.mutate(id, {
                  onSuccess: () => toast.success("Application deleted"),
                  onError: () => toast.error("Failed to delete"),
                })}
              />
              <ApplicationDetailModal
                application={selectedLife}
                open={!!selectedLife}
                onClose={() => setSelectedLife(null)}
                onUpdateStatus={(id, status) => updateLifeStatus.mutate({ id, status: status as LifeStatus }, {
                  onSuccess: () => toast.success(`Status updated`),
                  onError: () => toast.error("Failed to update"),
                })}
              />
            </TabsContent>

            {/* ---------- Pre-Qualification ---------- */}
            <TabsContent value="prequal">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <StatCard value={prequalStats.total} label="Total" />
                <StatCard value={prequalStats.draft} label="Draft" color="text-gray-600" />
                <StatCard value={prequalStats.submitted} label="Submitted" color="text-blue-600" />
                <StatCard value={prequalStats.reviewed} label="Reviewed" color="text-green-600" />
              </div>
              <SearchBar
                search={prequalSearch} setSearch={setPrequalSearch}
                status={prequalStatusFilter} setStatus={setPrequalStatusFilter}
                options={prequalStatusOptions}
              />
              <p className="text-sm text-muted-foreground mb-4">
                Showing {filteredPrequal.length} of {prequalApps.length} pre-qualifications
              </p>
              <SubmissionsTable<PrequalificationApplication>
                rows={filteredPrequal}
                totalSteps={4}
                onView={setSelectedPrequal}
                onDelete={(id) => deletePrequal.mutate(id, {
                  onSuccess: () => toast.success("Pre-qualification deleted"),
                  onError: () => toast.error("Failed to delete"),
                })}
              />
              <SubmissionDetailModal
                title="Pre-Qualification"
                submission={selectedPrequal}
                open={!!selectedPrequal}
                onClose={() => setSelectedPrequal(null)}
                statusOptions={prequalStatusOptions.filter((o) => o.value !== "all")}
                onUpdateStatus={(id, status) => updatePrequalStatus.mutate({ id, status }, {
                  onSuccess: () => toast.success("Status updated"),
                  onError: () => toast.error("Failed to update"),
                })}
              />
            </TabsContent>

            {/* ---------- Estate Planning ---------- */}
            <TabsContent value="estate">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <StatCard value={estateStats.total} label="Total" />
                <StatCard value={estateStats.submitted} label="Submitted" color="text-blue-600" />
                <StatCard value={estateStats.review} label="In Review" color="text-yellow-600" />
                <StatCard value={estateStats.completed} label="Completed" color="text-green-600" />
              </div>
              <SearchBar
                search={estateSearch} setSearch={setEstateSearch}
                status={estateStatusFilter} setStatus={setEstateStatusFilter}
                options={estateStatusOptions}
              />
              <p className="text-sm text-muted-foreground mb-4">
                Showing {filteredEstate.length} of {estateApps.length} estate planning intakes
              </p>
              <SubmissionsTable<EstatePlanningApplication>
                rows={filteredEstate}
                onView={setSelectedEstate}
                onDelete={(id) => deleteEstate.mutate(id, {
                  onSuccess: () => toast.success("Application deleted"),
                  onError: () => toast.error("Failed to delete"),
                })}
              />
              <SubmissionDetailModal
                title="Estate Planning"
                submission={selectedEstate}
                open={!!selectedEstate}
                onClose={() => setSelectedEstate(null)}
                statusOptions={estateStatusOptions.filter((o) => o.value !== "all")}
                enableAdvisorPdfResend
                onUpdateStatus={(id, status) => updateEstateStatus.mutate({ id, status: status as EstateStatus }, {
                  onSuccess: () => toast.success("Status updated"),
                  onError: () => toast.error("Failed to update"),
                })}
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default AdminSubmissions;
