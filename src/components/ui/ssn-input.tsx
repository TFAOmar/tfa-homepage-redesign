import * as React from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";

interface SSNInputProps extends Omit<React.ComponentProps<"input">, 'onChange' | 'value'> {
  value?: string;
  onChange?: (value: string) => void;
  showToggle?: boolean;
}

// Format SSN: 123456789 → 123-45-6789
const formatSSN = (value: string): string => {
  const numbers = value.replace(/\D/g, '').slice(0, 9);
  if (numbers.length === 0) return '';
  if (numbers.length <= 3) return numbers;
  if (numbers.length <= 5) return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
  return `${numbers.slice(0, 3)}-${numbers.slice(3, 5)}-${numbers.slice(5)}`;
};

// Mask SSN: 123456789 → •••-••-6789
const maskSSN = (value: string): string => {
  const numbers = value.replace(/\D/g, '').slice(0, 9);
  if (numbers.length === 0) return '';
  if (numbers.length <= 3) return '•'.repeat(numbers.length);
  if (numbers.length <= 5) return `•••-${'•'.repeat(numbers.length - 3)}`;
  return `•••-••-${numbers.slice(5)}`;
};

const SSNInput = React.forwardRef<HTMLInputElement, SSNInputProps>(
  ({ className, value = '', onChange, showToggle = true, ...props }, ref) => {
    const [isVisible, setIsVisible] = React.useState(false);
    const [isFocused, setIsFocused] = React.useState(false);
    const [displayValue, setDisplayValue] = React.useState(() => formatSSN(value));

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const input = e.target.value;
      // Only allow digits and dashes
      const sanitized = input.replace(/[^\d-]/g, '');
      const formatted = formatSSN(sanitized);
      setDisplayValue(formatted);
      // Store unformatted (just digits) for form value
      const unformatted = formatted.replace(/\D/g, '');
      onChange?.(unformatted);
    };

    // Sync with external value changes
    React.useEffect(() => {
      const formatted = formatSSN(value);
      if (formatted !== displayValue) {
        setDisplayValue(formatted);
      }
    }, [value]);

    // Determine what to show - when focused or visible, show actual value
    const showActualValue = isFocused || isVisible;
    const displayedValue = showActualValue ? displayValue : maskSSN(value);

    return (
      <div className="relative">
        <Input
          ref={ref}
          type="text"
          inputMode="numeric"
          autoComplete="off"
          value={displayedValue}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="XXX-XX-XXXX"
          className={cn("min-h-[44px]", showToggle && "pr-10", className)}
          {...props}
        />
        {showToggle && value && value.length > 0 && !isFocused && (
          <button
            type="button"
            onClick={() => setIsVisible(!isVisible)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            tabIndex={-1}
          >
            {isVisible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        )}
      </div>
    );
  }
);
SSNInput.displayName = "SSNInput";

export { SSNInput, formatSSN, maskSSN };
