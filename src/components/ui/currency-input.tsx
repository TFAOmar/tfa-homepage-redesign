import * as React from "react";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface CurrencyInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> {
  value: number;
  onChange: (value: number) => void;
  showPrefix?: boolean;
  allowDecimals?: boolean;
  min?: number;
  max?: number;
  isValid?: boolean;
  isInvalid?: boolean;
  errorMessage?: string;
}

const formatNumber = (value: number, allowDecimals: boolean): string => {
  if (isNaN(value) || value === 0) return "";
  
  if (allowDecimals) {
    return value.toLocaleString('en-US', { 
      minimumFractionDigits: 0,
      maximumFractionDigits: 2 
    });
  }
  
  return Math.round(value).toLocaleString('en-US');
};

const parseNumber = (value: string, allowDecimals: boolean): number => {
  // Remove all non-numeric characters except decimal point
  const cleaned = value.replace(/[^0-9.]/g, '');
  
  if (cleaned === '') return 0;
  
  if (allowDecimals) {
    // Handle multiple decimal points - keep only first
    const parts = cleaned.split('.');
    const sanitized = parts.length > 1 
      ? parts[0] + '.' + parts.slice(1).join('')
      : cleaned;
    return parseFloat(sanitized) || 0;
  }
  
  return parseInt(cleaned, 10) || 0;
};

const CurrencyInput = React.forwardRef<HTMLInputElement, CurrencyInputProps>(
  ({ className, value, onChange, showPrefix = true, allowDecimals = false, min, max, isValid, isInvalid, errorMessage, ...props }, ref) => {
    const [displayValue, setDisplayValue] = React.useState(() => formatNumber(value, allowDecimals));
    const [isFocused, setIsFocused] = React.useState(false);

    // Update display when value prop changes externally
    React.useEffect(() => {
      if (!isFocused) {
        setDisplayValue(formatNumber(value, allowDecimals));
      }
    }, [value, isFocused, allowDecimals]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const rawValue = e.target.value;
      
      // Allow empty input
      if (rawValue === '' || rawValue === '$') {
        setDisplayValue('');
        onChange(0);
        return;
      }

      // Remove $ prefix if present for parsing
      const valueWithoutPrefix = rawValue.replace(/^\$\s*/, '');
      const numericValue = parseNumber(valueWithoutPrefix, allowDecimals);
      
      // Apply min/max constraints
      let constrainedValue = numericValue;
      if (min !== undefined && numericValue < min) constrainedValue = min;
      if (max !== undefined && numericValue > max) constrainedValue = max;
      
      // Update display with formatted value while typing
      setDisplayValue(valueWithoutPrefix.replace(/[^0-9.,]/g, ''));
      onChange(constrainedValue);
    };

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      // Show raw number on focus for easier editing
      if (value > 0) {
        setDisplayValue(allowDecimals ? value.toString() : Math.round(value).toString());
      }
      props.onFocus?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      // Only format if there's a non-zero value
      if (value > 0) {
        setDisplayValue(formatNumber(value, allowDecimals));
      } else {
        setDisplayValue(''); // Show empty for 0
      }
      props.onBlur?.(e);
    };

    return (
      <div className="relative">
        <div className="relative">
          {showPrefix && (
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
              $
            </span>
          )}
          <input
            type="text"
            inputMode="decimal"
            className={cn(
              "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm transition-colors",
              showPrefix && "pl-8",
              isValid && "border-green-500 focus-visible:ring-green-500",
              isInvalid && "border-red-500 focus-visible:ring-red-500",
              (isValid || isInvalid) && "pr-10",
              className
            )}
            ref={ref}
            value={displayValue}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            {...props}
          />
          {isValid && (
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
CurrencyInput.displayName = "CurrencyInput";

export { CurrencyInput };
