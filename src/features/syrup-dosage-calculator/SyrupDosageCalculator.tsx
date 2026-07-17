"use client";

import { useState } from "react";
import { NumberField } from "@/components/NumberField";
import { toPositiveNumber } from "@/lib/numbers";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { calculateSyrupDosage, type SyrupDosageResult } from "./calculate";

export function SyrupDosageCalculator() {
  const [weight, setWeight] = useState("");
  const [doseMin, setDoseMin] = useState("");
  const [doseMax, setDoseMax] = useState("");
  const [concentrationAmount, setConcentrationAmount] = useState("");
  const [concentrationVolume, setConcentrationVolume] = useState("");

  const weightKg = toPositiveNumber(weight);
  const doseMinPerKgPerDay = toPositiveNumber(doseMin);
  const doseMaxPerKgPerDay = toPositiveNumber(doseMax);
  const concentrationAmountJ = toPositiveNumber(concentrationAmount);
  const concentrationPerMl = toPositiveNumber(concentrationVolume);

  const allFilled =
    weightKg !== null &&
    doseMinPerKgPerDay !== null &&
    doseMaxPerKgPerDay !== null &&
    concentrationAmountJ !== null &&
    concentrationPerMl !== null;

  let result: SyrupDosageResult | null = null;
  let rangeError: string | null = null;

  if (allFilled) {
    if (doseMaxPerKgPerDay < doseMinPerKgPerDay) {
      rangeError = "Maximum dose must be ≥ minimum dose.";
    } else {
      result = calculateSyrupDosage({
        weightKg,
        doseMinPerKgPerDay,
        doseMaxPerKgPerDay,
        concentrationAmountJ,
        concentrationPerMl,
      });
    }
  }

  return (
    <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
      <NumberField
        id="weight"
        label="Patient weight"
        value={weight}
        onChange={setWeight}
        placeholder="e.g. 20"
        suffix="kg"
      />

      <div className="grid grid-cols-2 gap-3">
        <NumberField
          id="dose-min"
          label="Min dose"
          value={doseMin}
          onChange={setDoseMin}
          placeholder="e.g. 25"
          suffix="j/kg/day"
        />
        <NumberField
          id="dose-max"
          label="Max dose"
          value={doseMax}
          onChange={setDoseMax}
          placeholder="e.g. 50"
          suffix="j/kg/day"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <span className="text-sm font-medium">
          Syrup concentration (from the label)
        </span>
        <div className="flex items-center gap-2">
          <NumberField
            id="concentration-amount"
            className="w-28"
            value={concentrationAmount}
            onChange={setConcentrationAmount}
            placeholder="e.g. 100000"
            aria-label="Concentration amount in units"
          />
          <span className="shrink-0 text-sm text-muted-foreground">j per</span>
          <NumberField
            id="concentration-volume"
            className="w-20"
            value={concentrationVolume}
            onChange={setConcentrationVolume}
            placeholder="e.g. 1"
            aria-label="Concentration volume in milliliters"
          />
          <span className="shrink-0 text-sm text-muted-foreground">mL</span>
        </div>
      </div>

      <div role="status" aria-live="polite" className="rounded-lg bg-muted p-4">
        {rangeError ? (
          <p className="text-sm text-destructive">{rangeError}</p>
        ) : result ? (
          <div className="flex flex-col gap-3">
            <p className="text-sm text-muted-foreground">
              Daily dose: {result.dailyDoseMinJ}–{result.dailyDoseMaxJ} j
            </p>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Frequency</TableHead>
                  <TableHead className="text-right">Volume per dose</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {result.frequencies.map((frequency) => (
                  <TableRow key={frequency.timesPerDay}>
                    <TableCell>{frequency.timesPerDay}× per day</TableCell>
                    <TableCell className="text-right font-medium text-foreground">
                      {frequency.minMl === frequency.maxMl
                        ? `${frequency.minMl} mL`
                        : `${frequency.minMl}–${frequency.maxMl} mL`}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">
            Enter weight, dose range, and syrup concentration to calculate
            volume.
          </p>
        )}
      </div>
    </form>
  );
}
