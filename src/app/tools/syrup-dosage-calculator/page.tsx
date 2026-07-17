import type { Metadata } from "next";
import { ToolShell } from "@/components/ToolShell";
import { SyrupDosageCalculator } from "@/features/syrup-dosage-calculator/SyrupDosageCalculator";

export const metadata: Metadata = {
  title: "Syrup Dosage Calculator — MedHelper",
  description:
    "Convert a weight-based dose range into whole-mL volumes for 2, 3, or 4 doses a day.",
};

export default function Page() {
  return (
    <ToolShell
      title="Syrup Dosage Calculator"
      description="Convert a weight-based dose range into whole-mL volumes for 2, 3, or 4 doses a day."
    >
      <SyrupDosageCalculator />
    </ToolShell>
  );
}
