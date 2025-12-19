import * as React from "react";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface PercentageInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  isValid?: boolean;
  isInvalid?: boolean;
  errorMessage?: string;
}

const PercentageInput = React.forwardRef<HTMLInputElement, PercentageInputProps>(
  ({ className, value, onChange, min = 0, max = 100, isValid, isInvalid, errorMessage, ...props }, ref) => {
    const [displayValue, setDisplayValue] = React.useState(() => 
      value === 0 ? "" : value.toString()
    );

    // Update display when value prop changes externally
    React.useEffect(() => {
      const newDisplay = value === 0 ? "" : value.toString();
      setDisplayValue(newDisplay);
    }, [value]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const rawValue = e.target.value;
      
      // Allow empty input
      if (rawValue === '') {
        setDisplayValue('');
        onChange(0);
        return;
      }

      // Allow digits and one decimal point
      let filtered = rawValue.replace(/[^0-9.]/g, '');
      
      // Handle multiple decimal points - keep only first
      const parts = filtered.split('.');
      if (parts.length > 2) {
        filtered = parts[0] + '.' + parts.slice(1).join('');
      }

      const numericValue = parseFloat(filtered) || 0;
      
      // Apply min/max constraints
      let constrainedValue = numericValue;
      if (numericValue < min) constrainedValue = min;
      if (numericValue > max) constrainedValue = max;
      
      setDisplayValue(filtered);
      onChange(constrainedValue);
    };

    const hasValidationIcon = isValid || isInvalid;

    return (
      <div className="relative">
        <div className="relative">
          <input
            type="text"
            inputMode="decimal"
            className={cn(
              "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm transition-colors pr-10",
              isValid && "border-green-500 focus-visible:ring-green-500",
              isInvalid && "border-red-500 focus-visible:ring-red-500",
              hasValidationIcon && "pr-16",
              className
            )}
            ref={ref}
            value={displayValue}
            onChange={handleChange}
            {...props}
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
            %
          </span>
          {isValid && (
            <Check className="absolute right-8 top-1/2 -translate-y-1/2 h-4 w-4 text-green-500" />
          )}
        </div>
        {isInvalid && errorMessage && (
          <p className="text-xs text-red-500 mt-1">{errorMessage}</p>
        )}
      </div>
    );
  }
);
PercentageInput.displayName = "PercentageInput";

export { PercentageInput };
