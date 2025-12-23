import { useState, useEffect, useCallback } from "react";
import { UseFormReturn, FieldValues } from "react-hook-form";

/**
 * Custom hook for shake animation on validation errors
 * Triggers a shake animation when a field has an error and is touched
 */
export const useShakeOnError = <T extends FieldValues>(form: UseFormReturn<T>) => {
  const [shakingFields, setShakingFields] = useState<Set<string>>(new Set());

  const triggerShake = useCallback((fieldName: string) => {
    setShakingFields(prev => new Set([...prev, fieldName]));
    setTimeout(() => {
      setShakingFields(prev => {
        const next = new Set(prev);
        next.delete(fieldName);
        return next;
      });
    }, 500);
  }, []);

  useEffect(() => {
    const subscription = form.watch((_, { name, type }) => {
      if (type === "change" && name) {
        const fieldError = (form.formState.errors as Record<string, unknown>)[name];
        const isTouched = (form.formState.touchedFields as Record<string, boolean>)[name];
        if (fieldError && isTouched) {
          triggerShake(name);
        }
      }
    });
    return () => subscription.unsubscribe();
  }, [form, triggerShake]);

  return { shakingFields, triggerShake };
};
