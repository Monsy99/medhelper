import { TriangleAlert } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export function Disclaimer() {
  return (
    <Alert className="border-amber-200 bg-amber-50">
      <TriangleAlert className="size-4 text-amber-600" />
      <AlertDescription className="text-amber-900">
        For reference only — not a substitute for clinical judgment. Always
        verify results independently against current prescribing information
        before making a treatment decision.
      </AlertDescription>
    </Alert>
  );
}
