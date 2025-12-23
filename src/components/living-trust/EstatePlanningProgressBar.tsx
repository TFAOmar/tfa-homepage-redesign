import { Check } from "lucide-react";
import { ESTATE_STEPS } from "@/types/estatePlanningApplication";
import { cn } from "@/lib/utils";

interface EstatePlanningProgressBarProps {
  currentStep: number;
  completedSteps: number[];
}

const EstatePlanningProgressBar = ({
  currentStep,
  completedSteps,
}: EstatePlanningProgressBarProps) => {
  return (
    <div className="w-full py-4">
      {/* Desktop Progress Bar */}
      <div className="hidden md:flex items-center justify-between relative">
        {/* Progress Line Background */}
        <div className="absolute left-0 right-0 top-5 h-0.5 bg-border" />
        
        {/* Progress Line Fill */}
        <div
          className="absolute left-0 top-5 h-0.5 bg-primary transition-all duration-500"
          style={{
            width: `${((currentStep - 1) / (ESTATE_STEPS.length - 1)) * 100}%`,
          }}
        />

        {ESTATE_STEPS.map((step) => {
          const isCompleted = completedSteps.includes(step.number);
          const isCurrent = currentStep === step.number;

          return (
            <div
              key={step.number}
              className="flex flex-col items-center relative z-10"
            >
              <div
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 border-2",
                  isCompleted
                    ? "bg-primary border-primary text-primary-foreground"
                    : isCurrent
                    ? "bg-background border-primary text-primary"
                    : "bg-background border-muted-foreground/30 text-muted-foreground"
                )}
              >
                {isCompleted ? (
                  <Check className="w-5 h-5" />
                ) : (
                  step.number
                )}
              </div>
              <span
                className={cn(
                  "mt-2 text-xs font-medium text-center max-w-[80px]",
                  isCurrent
                    ? "text-primary"
                    : isCompleted
                    ? "text-foreground"
                    : "text-muted-foreground"
                )}
              >
                {step.title}
              </span>
            </div>
          );
        })}
      </div>

      {/* Mobile Progress Bar */}
      <div className="md:hidden">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-foreground">
            Step {currentStep} of {ESTATE_STEPS.length}
          </span>
          <span className="text-sm text-muted-foreground">
            {ESTATE_STEPS[currentStep - 1]?.title}
          </span>
        </div>
        <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-500 rounded-full"
            style={{
              width: `${(currentStep / ESTATE_STEPS.length) * 100}%`,
            }}
          />
        </div>
        {/* Step indicators */}
        <div className="flex justify-between mt-1">
          {ESTATE_STEPS.map((step) => (
            <div
              key={step.number}
              className={cn(
                "w-2 h-2 rounded-full transition-colors",
                step.number <= currentStep ? "bg-primary" : "bg-muted"
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default EstatePlanningProgressBar;
