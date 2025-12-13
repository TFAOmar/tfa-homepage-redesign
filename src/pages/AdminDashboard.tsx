import { useEffect, useState, useMemo } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Shield, Users, Clock, EyeOff, Archive, Settings, Loader2 } from "lucide-react";
import AdminHeader from "@/components/admin/AdminHeader";
import AdvisorTable from "@/components/admin/AdvisorTable";
import AdvisorEditModal from "@/components/admin/AdvisorEditModal";
import BulkActionsBar from "@/components/admin/BulkActionsBar";
import PendingApprovals from "@/components/admin/PendingApprovals";
import HomepageAdvisorSettings from "@/components/admin/HomepageAdvisorSettings";
import { 
  useAdminAdvisors, 
  useUpdateAdvisor, 
  useDeleteAdvisor, 
  useBulkUpdateAdvisors,
  DynamicAdvisor 
} from "@/hooks/useDynamicAdvisors";
import { useAdminApprovalSetting } from "@/hooks/useAdminSettings";

const AdminDashboard = () => {
  const { data: advisors = [], isLoading } = useAdminAdvisors();
  const { adminApprovalEnabled, toggleAdminApproval, isLoading: settingsLoading } = useAdminApprovalSetting();
  const updateAdvisor = useUpdateAdvisor();
  const deleteAdvisor = useDeleteAdvisor();
  const bulkUpdate = useBulkUpdateAdvisors();

  const [searchQuery, setSearchQuery] = useState("");
  const [stateFilter, setStateFilter] = useState("All States");
  const [titleFilter, setTitleFilter] = useState("All Titles");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [editingAdvisor, setEditingAdvisor] = useState<DynamicAdvisor | null>(null);
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const pendingAdvisors = useMemo(() => advisors.filter(a => a.status === "pending"), [advisors]);
  const publishedAdvisors = useMemo(() => advisors.filter(a => a.status === "published"), [advisors]);
  const hiddenAdvisors = useMemo(() => advisors.filter(a => a.status === "hidden"), [advisors]);
  const archivedAdvisors = useMemo(() => advisors.filter(a => a.status === "archived"), [advisors]);

  const filterAdvisors = (list: DynamicAdvisor[]) => {
    return list.filter((advisor) => {
      const matchesSearch = searchQuery === "" || 
        advisor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        advisor.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        advisor.state.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesState = stateFilter === "All States" || advisor.state === stateFilter;
      const matchesTitle = titleFilter === "All Titles" || advisor.title === titleFilter;

      return matchesSearch && matchesState && matchesTitle;
    });
  };

  const currentAdvisors = useMemo(() => {
    switch (activeTab) {
      case "pending": return filterAdvisors(pendingAdvisors);
      case "published": return filterAdvisors(publishedAdvisors);
      case "hidden": return filterAdvisors(hiddenAdvisors);
      case "archived": return filterAdvisors(archivedAdvisors);
      default: return filterAdvisors(advisors);
    }
  }, [activeTab, advisors, searchQuery, stateFilter, titleFilter, pendingAdvisors, publishedAdvisors, hiddenAdvisors, archivedAdvisors]);

  const handleApprove = (id: string) => {
    updateAdvisor.mutate(
      { id, updates: { status: "published" } },
      { onSuccess: () => toast.success("Advisor Approved", { description: "Profile is now live in the directory." }) }
    );
  };

  const handleReject = (id: string, reason?: string) => {
    updateAdvisor.mutate(
      { id, updates: { status: "hidden", rejection_reason: reason } },
      { onSuccess: () => toast.error("Profile Rejected", { description: reason || "Profile has been rejected." }) }
    );
  };

  const handleHide = (id: string) => {
    updateAdvisor.mutate(
      { id, updates: { status: "hidden" } },
      { onSuccess: () => toast.info("Profile Hidden", { description: "Profile removed from public directory." }) }
    );
  };

  const handleArchive = (id: string) => {
    updateAdvisor.mutate(
      { id, updates: { status: "archived" } },
      { onSuccess: () => toast.info("Profile Archived", { description: "Profile moved to archive." }) }
    );
  };

  const handleRestore = (id: string) => {
    updateAdvisor.mutate(
      { id, updates: { status: "published" } },
      { onSuccess: () => toast.success("Profile Restored", { description: "Profile is now live in the directory." }) }
    );
  };

  const handleDelete = (id: string) => {
    deleteAdvisor.mutate(id, {
      onSuccess: () => toast.error("Profile Deleted", { description: "Profile permanently removed." }),
    });
  };

  const handleSaveEdit = (id: string, updates: Partial<DynamicAdvisor>) => {
    updateAdvisor.mutate(
      { id, updates },
      { onSuccess: () => toast.success("Profile Updated", { description: "Changes saved successfully." }) }
    );
  };

  const handleBulkApprove = () => {
    bulkUpdate.mutate(
      { ids: selectedIds, updates: { status: "published" } },
      { onSuccess: () => { toast.success(`${selectedIds.length} Profiles Approved`); setSelectedIds([]); } }
    );
  };

  const handleBulkHide = () => {
    bulkUpdate.mutate(
      { ids: selectedIds, updates: { status: "hidden" } },
      { onSuccess: () => { toast.info(`${selectedIds.length} Profiles Hidden`); setSelectedIds([]); } }
    );
  };

  const handleBulkArchive = () => {
    bulkUpdate.mutate(
      { ids: selectedIds, updates: { status: "archived" } },
      { onSuccess: () => { toast.info(`${selectedIds.length} Profiles Archived`); setSelectedIds([]); } }
    );
  };

  if (isLoading || settingsLoading) {
    return (
      <div className="min-h-screen py-24 bg-gradient-to-b from-secondary/30 to-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-accent" />
      </div>
    );
  }

  return (
    <div className="min-h-screen py-24 bg-gradient-to-b from-secondary/30 to-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Shield className="h-10 w-10 text-accent" />
            <h1 className="text-4xl md:text-5xl font-bold text-navy">Admin Dashboard</h1>
          </div>
          <p className="text-xl text-muted-foreground">
            Manage advisor profiles and approval workflows
          </p>
        </div>

        {/* Stats & Filters */}
        <div className="mb-8">
          <AdminHeader
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            stateFilter={stateFilter}
            onStateFilterChange={setStateFilter}
            titleFilter={titleFilter}
            onTitleFilterChange={setTitleFilter}
            totalAdvisors={advisors.length}
            pendingCount={pendingAdvisors.length}
          />
        </div>

        {/* Settings Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Workflow Settings Card */}
          <Card className="glass animate-fade-in">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-2">
                <Settings className="h-5 w-5 text-accent" />
                <CardTitle className="text-navy">Workflow Settings</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-foreground">Admin Approval Required</h3>
                  <p className="text-sm text-muted-foreground">
                    {adminApprovalEnabled
                      ? "New profiles must be approved before appearing in directory"
                      : "New profiles are automatically published to directory"}
                  </p>
                </div>
                <Switch checked={adminApprovalEnabled} onCheckedChange={toggleAdminApproval} />
              </div>
            </CardContent>
          </Card>

          {/* Homepage Advisor Settings */}
          <HomepageAdvisorSettings />
        </div>

        {/* Bulk Actions */}
        <div className="mb-4">
          <BulkActionsBar
            selectedCount={selectedIds.length}
            onClear={() => setSelectedIds([])}
            onBulkApprove={handleBulkApprove}
            onBulkHide={handleBulkHide}
            onBulkArchive={handleBulkArchive}
          />
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="glass p-1">
            <TabsTrigger value="all" className="data-[state=active]:bg-accent data-[state=active]:text-accent-foreground">
              <Users className="h-4 w-4 mr-2" />
              All ({advisors.length})
            </TabsTrigger>
            <TabsTrigger value="pending" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white">
              <Clock className="h-4 w-4 mr-2" />
              Pending ({pendingAdvisors.length})
            </TabsTrigger>
            <TabsTrigger value="published" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
              Published ({publishedAdvisors.length})
            </TabsTrigger>
            <TabsTrigger value="hidden" className="data-[state=active]:bg-gray-500 data-[state=active]:text-white">
              <EyeOff className="h-4 w-4 mr-2" />
              Hidden ({hiddenAdvisors.length})
            </TabsTrigger>
            <TabsTrigger value="archived" className="data-[state=active]:bg-red-500 data-[state=active]:text-white">
              <Archive className="h-4 w-4 mr-2" />
              Archived ({archivedAdvisors.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pending" className="space-y-6">
            <PendingApprovals
              advisors={currentAdvisors}
              onApprove={handleApprove}
              onReject={handleReject}
              onView={setEditingAdvisor}
            />
          </TabsContent>

          <TabsContent value="all">
            <AdvisorTable
              advisors={currentAdvisors}
              selectedIds={selectedIds}
              onSelectChange={setSelectedIds}
              onEdit={setEditingAdvisor}
              onApprove={handleApprove}
              onHide={handleHide}
              onArchive={handleArchive}
              onRestore={handleRestore}
              onDelete={handleDelete}
            />
          </TabsContent>

          <TabsContent value="published">
            <AdvisorTable
              advisors={currentAdvisors}
              selectedIds={selectedIds}
              onSelectChange={setSelectedIds}
              onEdit={setEditingAdvisor}
              onApprove={handleApprove}
              onHide={handleHide}
              onArchive={handleArchive}
              onRestore={handleRestore}
              onDelete={handleDelete}
            />
          </TabsContent>

          <TabsContent value="hidden">
            <AdvisorTable
              advisors={currentAdvisors}
              selectedIds={selectedIds}
              onSelectChange={setSelectedIds}
              onEdit={setEditingAdvisor}
              onApprove={handleApprove}
              onHide={handleHide}
              onArchive={handleArchive}
              onRestore={handleRestore}
              onDelete={handleDelete}
            />
          </TabsContent>

          <TabsContent value="archived">
            <AdvisorTable
              advisors={currentAdvisors}
              selectedIds={selectedIds}
              onSelectChange={setSelectedIds}
              onEdit={setEditingAdvisor}
              onApprove={handleApprove}
              onHide={handleHide}
              onArchive={handleArchive}
              onRestore={handleRestore}
              onDelete={handleDelete}
            />
          </TabsContent>
        </Tabs>

        {/* Edit Modal */}
        <AdvisorEditModal
          advisor={editingAdvisor}
          open={!!editingAdvisor}
          onClose={() => setEditingAdvisor(null)}
          onSave={handleSaveEdit}
        />
      </div>
    </div>
  );
};

export default AdminDashboard;
