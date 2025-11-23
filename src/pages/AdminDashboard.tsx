import { useEffect } from "react";
import { useAdvisorStore, DynamicAdvisor } from "@/stores/advisorStore";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { CheckCircle2, XCircle, Clock, Shield, MapPin } from "lucide-react";
import { toast } from "sonner";

const AdminDashboard = () => {
  const {
    advisors,
    adminApprovalEnabled,
    toggleAdminApproval,
    approveAdvisor,
    rejectAdvisor,
    getPendingAdvisors,
    getApprovedAdvisors,
  } = useAdvisorStore();

  const pendingAdvisors = getPendingAdvisors();
  const approvedAdvisors = getApprovedAdvisors();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleApprove = (id: string, name: string) => {
    approveAdvisor(id);
    toast.success(`Approved ${name}`, {
      description: "Profile is now live in the directory.",
    });
  };

  const handleReject = (id: string, name: string) => {
    rejectAdvisor(id);
    toast.error(`Rejected ${name}`, {
      description: "Profile has been rejected.",
    });
  };

  const AdvisorCard = ({ advisor, showActions }: { advisor: DynamicAdvisor; showActions: boolean }) => (
    <Card className="glass">
      <CardContent className="p-6">
        <div className="flex gap-4">
          {advisor.image ? (
            <img
              src={advisor.image}
              alt={advisor.name}
              className="w-20 h-20 rounded-full object-cover border-2 border-accent"
            />
          ) : (
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-navy to-accent/60 flex items-center justify-center text-primary-foreground text-2xl font-bold">
              {advisor.name.split(' ').map(n => n[0]).join('')}
            </div>
          )}

          <div className="flex-1 space-y-3">
            <div>
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-bold text-navy">{advisor.name}</h3>
                  <p className="text-sm text-muted-foreground">{advisor.title}</p>
                  <div className="flex items-center gap-1.5 text-sm text-muted-foreground mt-1">
                    <MapPin className="h-3.5 w-3.5 text-accent" />
                    <span>{advisor.city}, {advisor.state}</span>
                  </div>
                </div>
                <Badge variant={advisor.status === 'approved' ? 'default' : 'secondary'} className="ml-2">
                  {advisor.status === 'approved' ? (
                    <><CheckCircle2 className="h-3 w-3 mr-1" /> Approved</>
                  ) : advisor.status === 'pending' ? (
                    <><Clock className="h-3 w-3 mr-1" /> Pending</>
                  ) : (
                    <><XCircle className="h-3 w-3 mr-1" /> Rejected</>
                  )}
                </Badge>
              </div>
            </div>

            <p className="text-sm text-foreground/80 leading-relaxed">{advisor.bio}</p>

            <div className="flex flex-wrap gap-1.5">
              {advisor.specialties.slice(0, 3).map((specialty, idx) => (
                <Badge
                  key={idx}
                  variant="secondary"
                  className="text-xs bg-accent/10 text-accent border-accent/20"
                >
                  {specialty}
                </Badge>
              ))}
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              {advisor.licenses.map((license, idx) => (
                <div key={idx} className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Shield className="h-3 w-3 text-accent" />
                  <span>{license}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span>📧 {advisor.email}</span>
              <span>•</span>
              <span>📞 {advisor.phone}</span>
              <span>•</span>
              <span>🎓 {advisor.yearsOfExperience} years exp.</span>
            </div>

            {showActions && advisor.status === 'pending' && (
              <div className="flex gap-2 pt-2">
                <Button
                  onClick={() => handleApprove(advisor.id, advisor.name)}
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                  Approve
                </Button>
                <Button
                  onClick={() => handleReject(advisor.id, advisor.name)}
                  variant="destructive"
                >
                  <XCircle className="h-4 w-4 mr-2" />
                  Reject
                </Button>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen py-24 bg-gradient-to-b from-secondary/30 to-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold text-navy mb-4">
            Admin Dashboard
          </h1>
          <p className="text-xl text-muted-foreground">
            Manage advisor profiles and approval settings
          </p>
        </div>

        {/* Settings Card */}
        <Card className="glass mb-8 animate-fade-in" style={{ animationDelay: "100ms" }}>
          <CardHeader>
            <CardTitle className="text-navy">Settings</CardTitle>
            <CardDescription>Configure approval workflow</CardDescription>
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
              <Switch
                checked={adminApprovalEnabled}
                onCheckedChange={toggleAdminApproval}
              />
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="glass animate-fade-in" style={{ animationDelay: "200ms" }}>
            <CardContent className="p-6 text-center">
              <div className="text-4xl font-bold text-navy mb-2">{advisors.length}</div>
              <div className="text-muted-foreground">Total Submissions</div>
            </CardContent>
          </Card>
          <Card className="glass animate-fade-in" style={{ animationDelay: "250ms" }}>
            <CardContent className="p-6 text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">{approvedAdvisors.length}</div>
              <div className="text-muted-foreground">Approved</div>
            </CardContent>
          </Card>
          <Card className="glass animate-fade-in" style={{ animationDelay: "300ms" }}>
            <CardContent className="p-6 text-center">
              <div className="text-4xl font-bold text-orange-600 mb-2">{pendingAdvisors.length}</div>
              <div className="text-muted-foreground">Pending Review</div>
            </CardContent>
          </Card>
        </div>

        {/* Pending Advisors */}
        {pendingAdvisors.length > 0 && (
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-navy mb-6 animate-fade-in" style={{ animationDelay: "350ms" }}>
              Pending Approval ({pendingAdvisors.length})
            </h2>
            <div className="space-y-4">
              {pendingAdvisors.map((advisor, index) => (
                <div
                  key={advisor.id}
                  className="animate-fade-in"
                  style={{ animationDelay: `${400 + index * 50}ms` }}
                >
                  <AdvisorCard advisor={advisor} showActions={true} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Approved Advisors */}
        {approvedAdvisors.length > 0 && (
          <div>
            <h2 className="text-3xl font-bold text-navy mb-6">
              Approved Advisors ({approvedAdvisors.length})
            </h2>
            <div className="space-y-4">
              {approvedAdvisors.map((advisor, index) => (
                <div
                  key={advisor.id}
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <AdvisorCard advisor={advisor} showActions={false} />
                </div>
              ))}
            </div>
          </div>
        )}

        {advisors.length === 0 && (
          <Card className="glass">
            <CardContent className="p-12 text-center">
              <Clock className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-navy mb-2">No Submissions Yet</h3>
              <p className="text-muted-foreground">
                Advisor submissions will appear here for review
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
