import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { DynamicAdvisor } from "@/stores/advisorStore";
import { CheckCircle2, XCircle, MapPin, Shield, Clock, Eye } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

interface PendingApprovalsProps {
  advisors: DynamicAdvisor[];
  onApprove: (id: string) => void;
  onReject: (id: string, reason?: string) => void;
  onView: (advisor: DynamicAdvisor) => void;
}

const PendingApprovals = ({ advisors, onApprove, onReject, onView }: PendingApprovalsProps) => {
  const [rejectingId, setRejectingId] = useState<string | null>(null);
  const [rejectReason, setRejectReason] = useState("");

  const handleReject = () => {
    if (rejectingId) {
      onReject(rejectingId, rejectReason);
      setRejectingId(null);
      setRejectReason("");
    }
  };

  if (advisors.length === 0) {
    return (
      <div className="glass rounded-xl p-12 text-center">
        <Clock className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-xl font-bold text-navy mb-2">No Pending Approvals</h3>
        <p className="text-muted-foreground">All advisor submissions have been reviewed.</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid md:grid-cols-2 gap-6">
        {advisors.map((advisor) => (
          <Card key={advisor.id} className="glass overflow-hidden animate-fade-in">
            <CardContent className="p-6">
              <div className="flex gap-4">
                {advisor.image ? (
                  <img
                    src={advisor.image}
                    alt={advisor.name}
                    className="w-20 h-20 rounded-full object-cover border-2 border-accent"
                  />
                ) : (
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-navy/30 to-accent/30 flex items-center justify-center text-xl font-bold text-navy">
                    {advisor.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                )}

                <div className="flex-1 space-y-2">
                  <div>
                    <h3 className="text-lg font-bold text-navy">{advisor.name}</h3>
                    <p className="text-sm text-muted-foreground">{advisor.title}</p>
                    <div className="flex items-center gap-1.5 text-sm text-muted-foreground mt-1">
                      <MapPin className="h-3.5 w-3.5 text-accent" />
                      <span>{advisor.city}, {advisor.state}</span>
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-sm text-foreground/80 mt-4 line-clamp-2">{advisor.bio}</p>

              <div className="flex flex-wrap gap-1.5 mt-3">
                {advisor.specialties.slice(0, 3).map((specialty, idx) => (
                  <Badge key={idx} variant="secondary" className="text-xs bg-accent/10 text-accent border-accent/20">
                    {specialty}
                  </Badge>
                ))}
                {advisor.specialties.length > 3 && (
                  <Badge variant="secondary" className="text-xs">+{advisor.specialties.length - 3}</Badge>
                )}
              </div>

              <div className="flex items-center gap-2 flex-wrap mt-3">
                {advisor.licenses.map((license, idx) => (
                  <div key={idx} className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Shield className="h-3 w-3 text-accent" />
                    <span>{license}</span>
                  </div>
                ))}
              </div>

              <div className="flex gap-2 mt-4 pt-4 border-t border-accent/10">
                <Button variant="outline" size="sm" onClick={() => onView(advisor)} className="flex-1">
                  <Eye className="h-4 w-4 mr-2" />
                  Review
                </Button>
                <Button onClick={() => onApprove(advisor.id)} size="sm" className="flex-1 bg-green-600 hover:bg-green-700 text-white">
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                  Approve
                </Button>
                <Button onClick={() => setRejectingId(advisor.id)} variant="destructive" size="sm" className="flex-1">
                  <XCircle className="h-4 w-4 mr-2" />
                  Reject
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Reject Modal */}
      <Dialog open={!!rejectingId} onOpenChange={() => setRejectingId(null)}>
        <DialogContent className="glass border-accent/20">
          <DialogHeader>
            <DialogTitle className="text-navy">Reject Profile</DialogTitle>
            <DialogDescription>Optionally provide a reason for rejection.</DialogDescription>
          </DialogHeader>
          <Textarea
            placeholder="Reason for rejection (optional)..."
            value={rejectReason}
            onChange={(e) => setRejectReason(e.target.value)}
            className="resize-none min-h-[100px]"
          />
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setRejectingId(null)}>Cancel</Button>
            <Button variant="destructive" onClick={handleReject}>
              <XCircle className="h-4 w-4 mr-2" />
              Confirm Rejection
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PendingApprovals;
