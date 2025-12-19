import * as React from "react";
import { cn } from "@/lib/utils";

interface NumericInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> {
  value: number;
  onChange: (value: number) => void;
  allowDecimals?: boolean;
  min?: number;
  max?: number;
  suffix?: string;
}

const NumericInput = React.forwardRef<HTMLInputElement, NumericInputProps>(
  ({ className, value, onChange, allowDecimals = false, min, max, suffix, ...props }, ref) => {
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

    return (
      <div className="relative">
        <input
          type="text"
          inputMode={allowDecimals ? "decimal" : "numeric"}
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            suffix && "pr-10",
            className
          )}
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
      </div>
    );
  }
);
NumericInput.displayName = "NumericInput";

export { NumericInput };
