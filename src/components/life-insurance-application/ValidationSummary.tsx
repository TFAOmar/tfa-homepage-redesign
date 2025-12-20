import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface ValidationSummaryProps {
  errors: Record<string, { message?: string }>;
  show: boolean;
}

const ValidationSummary = ({ errors, show }: ValidationSummaryProps) => {
  const errorEntries = Object.entries(errors).filter(([_, value]) => value?.message);
  
  if (!show || errorEntries.length === 0) return null;

  // Convert camelCase field names to readable labels
  const formatFieldName = (fieldName: string): string => {
    return fieldName
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, (str) => str.toUpperCase())
      .replace(/\./g, ' › ')
      .trim();
  };

  return (
    <Alert variant="destructive" className="animate-shake mb-4">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle className="text-sm md:text-base">Please fix the following errors:</AlertTitle>
      <AlertDescription>
        <ul className="list-disc list-inside mt-2 space-y-1 text-xs md:text-sm">
          {errorEntries.slice(0, 5).map(([key, value]) => (
            <li key={key}>
              <span className="font-medium">{formatFieldName(key)}:</span> {value.message}
            </li>
          ))}
          {errorEntries.length > 5 && (
            <li className="text-muted-foreground">
              And {errorEntries.length - 5} more error{errorEntries.length - 5 > 1 ? 's' : ''}...
            </li>
          )}
        </ul>
      </AlertDescription>
    </Alert>
  );
};

export default ValidationSummary;
