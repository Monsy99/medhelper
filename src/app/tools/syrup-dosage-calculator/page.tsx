import type { Metadata } from "next";
import { ToolShell } from "@/components/ToolShell";
import { SyrupDosageCalculator } from "@/features/syrup-dosage-calculator/SyrupDosageCalculator";

export const metadata: Metadata = {
  title: "Syrup Dosage Calculator — MedHelper",
  description:
    "Convert a weight-based (mg/kg) dose into a volume to administer.",
};

export default function Page() {
  return (
    <ToolShell
      title="Syrup Dosage Calculator"
      description="Convert a weight-based (mg/kg) dose into a volume to administer."
    >
      <SyrupDosageCalculator />
    </ToolShell>
  );
}
