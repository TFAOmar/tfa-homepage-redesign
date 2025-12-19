import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { STEPS } from "@/types/lifeInsuranceApplication";

interface ProgressBarProps {
  currentStep: number;
  completedSteps: number[];
}

const ProgressBar = ({ currentStep, completedSteps }: ProgressBarProps) => {
  return (
    <div className="w-full py-6">
      {/* Mobile view - simplified */}
      <div className="md:hidden">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-foreground">
            Step {currentStep} of {STEPS.length}
          </span>
          <span className="text-sm text-muted-foreground">
            {STEPS[currentStep - 1]?.title}
          </span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div
            className="bg-primary h-2 rounded-full transition-all duration-500"
            style={{ width: `${(currentStep / STEPS.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Desktop view - full progress bar */}
      <div className="hidden md:block">
        <div className="flex items-center justify-between">
          {STEPS.map((step, index) => {
            const isCompleted = completedSteps.includes(step.number);
            const isCurrent = currentStep === step.number;
            const isUpcoming = currentStep < step.number && !isCompleted;

            return (
              <div key={step.number} className="flex items-center flex-1">
                {/* Step indicator */}
                <div className="flex flex-col items-center">
                  <div
                    className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300",
                      isCompleted && "bg-primary border-primary text-primary-foreground",
                      isCurrent && "border-primary bg-primary/10 text-primary",
                      isUpcoming && "border-muted-foreground/30 text-muted-foreground"
                    )}
                  >
                    {isCompleted ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      <span className="text-sm font-semibold">{step.number}</span>
                    )}
                  </div>
                  <span
                    className={cn(
                      "mt-2 text-xs font-medium text-center max-w-[80px] leading-tight",
                      isCurrent && "text-primary",
                      isUpcoming && "text-muted-foreground",
                      isCompleted && "text-foreground"
                    )}
                  >
                    {step.shortTitle}
                  </span>
                </div>

                {/* Connector line */}
                {index < STEPS.length - 1 && (
                  <div className="flex-1 mx-2 h-0.5 mt-[-20px]">
                    <div
                      className={cn(
                        "h-full transition-all duration-500",
                        completedSteps.includes(step.number + 1) || completedSteps.includes(step.number)
                          ? "bg-primary"
                          : "bg-muted-foreground/20"
                      )}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
