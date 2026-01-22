import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface JoseScheduleModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const JoseScheduleModal = ({ open, onOpenChange }: JoseScheduleModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl w-[95vw] h-[85vh] p-0 overflow-hidden">
        <DialogHeader className="p-4 pb-0">
          <DialogTitle className="text-xl font-semibold">
            Book a Consultation with Jose Covarrubias
          </DialogTitle>
        </DialogHeader>
        <div className="flex-1 p-4 pt-2 h-full">
          <iframe
            src="https://spartansfinancial.pipedrive.com/scheduler/3xZw0Bt3/consultation"
            title="Book a Consultation with Jose Covarrubias"
            frameBorder={0}
            className="w-full h-full min-h-[550px] rounded-lg"
            allowFullScreen
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default JoseScheduleModal;
