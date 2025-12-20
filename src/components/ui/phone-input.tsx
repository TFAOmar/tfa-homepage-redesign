import * as React from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface PhoneInputProps extends Omit<React.ComponentProps<"input">, 'onChange' | 'value'> {
  value?: string;
  onChange?: (value: string) => void;
}

// Format phone: 1234567890 → (123) 456-7890
const formatPhoneNumber = (value: string): string => {
  const numbers = value.replace(/\D/g, '').slice(0, 10);
  if (numbers.length === 0) return '';
  if (numbers.length <= 3) return `(${numbers}`;
  if (numbers.length <= 6) return `(${numbers.slice(0, 3)}) ${numbers.slice(3)}`;
  return `(${numbers.slice(0, 3)}) ${numbers.slice(3, 6)}-${numbers.slice(6)}`;
};

const PhoneInput = React.forwardRef<HTMLInputElement, PhoneInputProps>(
  ({ className, value = '', onChange, ...props }, ref) => {
    const [displayValue, setDisplayValue] = React.useState(() => formatPhoneNumber(value));

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const input = e.target.value;
      // Only allow digits, parentheses, spaces, and dashes
      const sanitized = input.replace(/[^\d\s()-]/g, '');
      const formatted = formatPhoneNumber(sanitized);
      setDisplayValue(formatted);
      // Store unformatted (just digits) for form value
      const unformatted = formatted.replace(/\D/g, '');
      onChange?.(unformatted);
    };

    // Sync with external value changes
    React.useEffect(() => {
      const formatted = formatPhoneNumber(value);
      if (formatted !== displayValue) {
        setDisplayValue(formatted);
      }
    }, [value]);

    return (
      <Input
        ref={ref}
        type="tel"
        inputMode="numeric"
        autoComplete="tel"
        value={displayValue}
        onChange={handleChange}
        placeholder="(555) 123-4567"
        className={cn("min-h-[44px]", className)}
        {...props}
      />
    );
  }
);
PhoneInput.displayName = "PhoneInput";

export { PhoneInput, formatPhoneNumber };
