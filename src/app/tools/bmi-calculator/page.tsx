import type { Metadata } from "next";
import { ToolShell } from "@/components/ToolShell";
import { BmiCalculator } from "@/features/bmi-calculator/BmiCalculator";

export const metadata: Metadata = {
  title: "BMI Calculator — MedHelper",
  description: "Calculate body mass index (BMI) from height and weight.",
};

export default function Page() {
  return (
    <ToolShell
      title="BMI Calculator"
      description="Calculate body mass index (BMI) from height and weight."
    >
      <BmiCalculator />
    </ToolShell>
  );
}
