import * as React from "react";
import { CheckCircle2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface ValidatedInputProps extends React.ComponentProps<typeof Input> {
  fieldState?: {
    error?: { message?: string };
    isDirty?: boolean;
    isTouched?: boolean;
  };
  showSuccessIndicator?: boolean;
  isShaking?: boolean;
}

const ValidatedInput = React.forwardRef<HTMLInputElement, ValidatedInputProps>(
  ({ className, fieldState, showSuccessIndicator = true, isShaking = false, ...props }, ref) => {
    const hasError = !!fieldState?.error;
    const showSuccess = showSuccessIndicator && fieldState?.isDirty && !hasError;

    return (
      <div className="relative">
        <Input
          ref={ref}
          hasError={hasError}
          hasSuccess={showSuccess}
          className={cn(
            showSuccess && "pr-10",
            isShaking && "animate-shake motion-reduce:animate-none",
            className
          )}
          {...props}
        />
        {showSuccess && (
          <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-success pointer-events-none animate-pop-in motion-reduce:animate-none" />
        )}
      </div>
    );
  }
);
ValidatedInput.displayName = "ValidatedInput";

export { ValidatedInput };
