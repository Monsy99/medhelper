"use client";

import { useState } from "react";
import { calculateSyrupDosage, type SyrupDosageResult } from "./calculate";

const inputClassName =
  "rounded-md border border-slate-300 px-3 py-2 text-base focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500";

function toPositiveNumber(value: string): number | null {
  if (value === "") return null;
  const parsed = Number(value);
  return parsed > 0 ? parsed : null;
}

export function SyrupDosageCalculator() {
  const [weight, setWeight] = useState("");
  const [dose, setDose] = useState("");
  const [concentrationAmount, setConcentrationAmount] = useState("");
  const [concentrationVolume, setConcentrationVolume] = useState("");

  const weightKg = toPositiveNumber(weight);
  const doseMgPerKg = toPositiveNumber(dose);
  const concentrationAmountMg = toPositiveNumber(concentrationAmount);
  const concentrationPerMl = toPositiveNumber(concentrationVolume);

  let result: SyrupDosageResult | null = null;
  if (
    weightKg !== null &&
    doseMgPerKg !== null &&
    concentrationAmountMg !== null &&
    concentrationPerMl !== null
  ) {
    result = calculateSyrupDosage({
      weightKg,
      doseMgPerKg,
      concentrationAmountMg,
      concentrationPerMl,
    });
  }

  return (
    <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
      <label className="flex flex-col gap-1 text-sm font-medium text-slate-700">
        Patient weight (kg)
        <input
          type="number"
          inputMode="decimal"
          min="0"
          step="0.1"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          className={inputClassName}
          placeholder="e.g. 20"
        />
      </label>

      <label className="flex flex-col gap-1 text-sm font-medium text-slate-700">
        Prescribed dose (mg/kg)
        <input
          type="number"
          inputMode="decimal"
          min="0"
          step="0.1"
          value={dose}
          onChange={(e) => setDose(e.target.value)}
          className={inputClassName}
          placeholder="e.g. 15"
        />
      </label>

      <div className="flex flex-col gap-1 text-sm font-medium text-slate-700">
        Syrup concentration (from the label)
        <div className="flex items-center gap-2">
          <input
            type="number"
            inputMode="decimal"
            min="0"
            step="0.1"
            aria-label="Concentration amount in milligrams"
            value={concentrationAmount}
            onChange={(e) => setConcentrationAmount(e.target.value)}
            className={`w-24 ${inputClassName}`}
            placeholder="e.g. 250"
          />
          <span className="text-slate-500">mg per</span>
          <input
            type="number"
            inputMode="decimal"
            min="0"
            step="0.1"
            aria-label="Concentration volume in milliliters"
            value={concentrationVolume}
            onChange={(e) => setConcentrationVolume(e.target.value)}
            className={`w-24 ${inputClassName}`}
            placeholder="e.g. 5"
          />
          <span className="text-slate-500">mL</span>
        </div>
      </div>

      <div role="status" aria-live="polite" className="rounded-md bg-slate-100 px-4 py-3">
        {result ? (
          <>
            <p className="text-2xl font-semibold text-slate-900">
              {result.volumeMl}{" "}
              <span className="text-base font-normal text-slate-600">mL</span>
            </p>
            <p className="text-sm text-slate-600">
              Total dose: {result.totalDoseMg} mg
            </p>
          </>
        ) : (
          <p className="text-sm text-slate-500">
            Enter weight, dose, and syrup concentration to calculate volume.
          </p>
        )}
      </div>
    </form>
  );
}
