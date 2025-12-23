import * as React from "react";
import { CheckCircle2 } from "lucide-react";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface ValidatedSelectTriggerProps extends React.ComponentPropsWithoutRef<typeof SelectTrigger> {
  fieldState?: {
    error?: { message?: string };
    isDirty?: boolean;
    isTouched?: boolean;
  };
  showSuccessIndicator?: boolean;
  isShaking?: boolean;
}

const ValidatedSelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectTrigger>,
  ValidatedSelectTriggerProps
>(({ className, children, fieldState, showSuccessIndicator = true, isShaking = false, ...props }, ref) => {
  const hasError = !!fieldState?.error;
  const showSuccess = showSuccessIndicator && fieldState?.isDirty && !hasError;

  return (
    <div className="relative">
      <SelectTrigger
        ref={ref}
        hasError={hasError}
        hasSuccess={showSuccess}
        className={cn(
          showSuccess && "pr-10",
          isShaking && "animate-shake motion-reduce:animate-none",
          className
        )}
        {...props}
      >
        {children}
      </SelectTrigger>
      {showSuccess && (
        <CheckCircle2 className="absolute right-8 top-1/2 -translate-y-1/2 w-5 h-5 text-success pointer-events-none animate-pop-in motion-reduce:animate-none" />
      )}
    </div>
  );
});
ValidatedSelectTrigger.displayName = "ValidatedSelectTrigger";

export { ValidatedSelectTrigger, Select, SelectValue, SelectContent, SelectItem };
