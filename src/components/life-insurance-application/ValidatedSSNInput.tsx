import * as React from "react";
import { CheckCircle2 } from "lucide-react";
import { SSNInput } from "@/components/ui/ssn-input";
import { cn } from "@/lib/utils";

interface ValidatedSSNInputProps extends Omit<React.ComponentProps<typeof SSNInput>, 'ref'> {
  fieldState?: {
    error?: { message?: string };
    isDirty?: boolean;
    isTouched?: boolean;
  };
  showSuccessIndicator?: boolean;
}

const ValidatedSSNInput = React.forwardRef<HTMLInputElement, ValidatedSSNInputProps>(
  ({ className, fieldState, showSuccessIndicator = true, ...props }, ref) => {
    const hasError = !!fieldState?.error;
    const showSuccess = showSuccessIndicator && fieldState?.isDirty && !hasError && props.value && String(props.value).length === 9;

    return (
      <div className="relative">
        <SSNInput
          ref={ref}
          className={cn(
            hasError && "border-destructive focus-visible:ring-destructive",
            showSuccess && "border-success focus-visible:ring-success",
            className
          )}
          showToggle={!showSuccess}
          {...props}
        />
        {showSuccess && (
          <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-success pointer-events-none" />
        )}
      </div>
    );
  }
);
ValidatedSSNInput.displayName = "ValidatedSSNInput";

export { ValidatedSSNInput };
