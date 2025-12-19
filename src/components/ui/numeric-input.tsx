import * as React from "react";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface NumericInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> {
  value: number;
  onChange: (value: number) => void;
  allowDecimals?: boolean;
  min?: number;
  max?: number;
  suffix?: string;
  isValid?: boolean;
  isInvalid?: boolean;
  errorMessage?: string;
}

const NumericInput = React.forwardRef<HTMLInputElement, NumericInputProps>(
  ({ className, value, onChange, allowDecimals = false, min, max, suffix, isValid, isInvalid, errorMessage, ...props }, ref) => {
    const [displayValue, setDisplayValue] = React.useState(() => 
      value === 0 ? "" : (allowDecimals ? value.toString() : Math.round(value).toString())
    );

    // Update display when value prop changes externally
    React.useEffect(() => {
      const newDisplay = value === 0 ? "" : (allowDecimals ? value.toString() : Math.round(value).toString());
      setDisplayValue(newDisplay);
    }, [value, allowDecimals]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const rawValue = e.target.value;
      
      // Allow empty input
      if (rawValue === '') {
        setDisplayValue('');
        onChange(0);
        return;
      }

      // Filter to only allow valid characters
      let filtered: string;
      if (allowDecimals) {
        // Allow digits and one decimal point
        filtered = rawValue.replace(/[^0-9.]/g, '');
        // Handle multiple decimal points
        const parts = filtered.split('.');
        if (parts.length > 2) {
          filtered = parts[0] + '.' + parts.slice(1).join('');
        }
      } else {
        // Only allow digits
        filtered = rawValue.replace(/[^0-9]/g, '');
      }

      const numericValue = allowDecimals ? parseFloat(filtered) || 0 : parseInt(filtered, 10) || 0;
      
      // Apply min/max constraints
      let constrainedValue = numericValue;
      if (min !== undefined && numericValue < min) constrainedValue = min;
      if (max !== undefined && numericValue > max) constrainedValue = max;
      
      setDisplayValue(filtered);
      onChange(constrainedValue);
    };

    // Calculate right padding based on suffix and validation icon
    const hasValidationIcon = isValid || isInvalid;
    const suffixPadding = suffix ? (suffix.length * 8 + 16) : 0;
    const iconPadding = hasValidationIcon ? 28 : 0;
    const totalRightPadding = Math.max(suffixPadding, iconPadding) + 12;

    return (
      <div className="relative">
        <div className="relative">
          <input
            type="text"
            inputMode={allowDecimals ? "decimal" : "numeric"}
            className={cn(
              "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm transition-colors",
              isValid && "border-green-500 focus-visible:ring-green-500",
              isInvalid && "border-red-500 focus-visible:ring-red-500",
              className
            )}
            style={{ paddingRight: suffix || hasValidationIcon ? `${totalRightPadding}px` : undefined }}
            ref={ref}
            value={displayValue}
            onChange={handleChange}
            {...props}
          />
          {suffix && (
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
              {suffix}
            </span>
          )}
          {isValid && !suffix && (
            <Check className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-green-500" />
          )}
        </div>
        {isInvalid && errorMessage && (
          <p className="text-xs text-red-500 mt-1">{errorMessage}</p>
        )}
      </div>
    );
  }
);
NumericInput.displayName = "NumericInput";

export { NumericInput };
