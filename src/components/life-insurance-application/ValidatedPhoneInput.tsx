import * as React from "react";
import { CheckCircle2 } from "lucide-react";
import { PhoneInput } from "@/components/ui/phone-input";
import { cn } from "@/lib/utils";

interface ValidatedPhoneInputProps extends Omit<React.ComponentProps<typeof PhoneInput>, 'ref'> {
  fieldState?: {
    error?: { message?: string };
    isDirty?: boolean;
    isTouched?: boolean;
  };
  showSuccessIndicator?: boolean;
}

const ValidatedPhoneInput = React.forwardRef<HTMLInputElement, ValidatedPhoneInputProps>(
  ({ className, fieldState, showSuccessIndicator = true, ...props }, ref) => {
    const hasError = !!fieldState?.error;
    const showSuccess = showSuccessIndicator && fieldState?.isDirty && !hasError && props.value && String(props.value).length === 10;

    return (
      <div className="relative">
        <PhoneInput
          ref={ref}
          className={cn(
            hasError && "border-destructive focus-visible:ring-destructive",
            showSuccess && "border-success focus-visible:ring-success pr-10",
            className
          )}
          {...props}
        />
        {showSuccess && (
          <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-success pointer-events-none" />
        )}
      </div>
    );
  }
);
ValidatedPhoneInput.displayName = "ValidatedPhoneInput";

export { ValidatedPhoneInput };
