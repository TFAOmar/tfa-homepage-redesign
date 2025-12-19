import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FileText, RotateCcw } from "lucide-react";
import { format } from "date-fns";

interface ResumeApplicationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onResume: () => void;
  onStartFresh: () => void;
  lastSaved?: string;
  applicantName?: string;
  currentStep?: number;
}

const ResumeApplicationModal = ({
  open,
  onOpenChange,
  onResume,
  onStartFresh,
  lastSaved,
  applicantName,
  currentStep,
}: ResumeApplicationModalProps) => {
  const formattedDate = lastSaved
    ? format(new Date(lastSaved), "MMMM d, yyyy 'at' h:mm a")
    : null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Welcome Back!</DialogTitle>
          <DialogDescription>
            We found a saved application. Would you like to continue where you
            left off?
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <div className="rounded-lg border bg-muted/50 p-4 space-y-2">
            {applicantName && (
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Applicant:</span>
                <span className="font-medium">{applicantName}</span>
              </div>
            )}
            {currentStep && (
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Progress:</span>
                <span className="font-medium">Step {currentStep} of 9</span>
              </div>
            )}
            {formattedDate && (
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Last saved:</span>
                <span className="font-medium">{formattedDate}</span>
              </div>
            )}
          </div>
        </div>

        <DialogFooter className="flex-col sm:flex-row gap-2">
          <Button
            variant="outline"
            onClick={onStartFresh}
            className="gap-2 w-full sm:w-auto"
          >
            <RotateCcw className="w-4 h-4" />
            Start Fresh
          </Button>
          <Button onClick={onResume} className="gap-2 w-full sm:w-auto">
            <FileText className="w-4 h-4" />
            Continue Application
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ResumeApplicationModal;
