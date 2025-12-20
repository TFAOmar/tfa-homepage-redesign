import * as React from "react";
import { CheckCircle2 } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

interface ValidatedTextareaProps extends React.ComponentProps<typeof Textarea> {
  fieldState?: {
    error?: { message?: string };
    isDirty?: boolean;
    isTouched?: boolean;
  };
  showSuccessIndicator?: boolean;
}

const ValidatedTextarea = React.forwardRef<HTMLTextAreaElement, ValidatedTextareaProps>(
  ({ className, fieldState, showSuccessIndicator = true, ...props }, ref) => {
    const hasError = !!fieldState?.error;
    const showSuccess = showSuccessIndicator && fieldState?.isDirty && !hasError;

    return (
      <div className="relative">
        <Textarea
          ref={ref}
          className={cn(
            hasError && "border-destructive focus-visible:ring-destructive",
            showSuccess && "border-success focus-visible:ring-success",
            className
          )}
          {...props}
        />
        {showSuccess && (
          <CheckCircle2 className="absolute right-3 top-3 w-5 h-5 text-success pointer-events-none" />
        )}
      </div>
    );
  }
);
ValidatedTextarea.displayName = "ValidatedTextarea";

export { ValidatedTextarea };
