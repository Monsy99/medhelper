"use client";

import { useState } from "react";
import { calculateBmi, type BmiResult } from "./calculate";

const inputClassName =
  "rounded-md border border-slate-300 px-3 py-2 text-base focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500";

function toPositiveNumber(value: string): number | null {
  if (value === "") return null;
  const parsed = Number(value);
  return parsed > 0 ? parsed : null;
}

export function BmiCalculator() {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");

  const weightKg = toPositiveNumber(weight);
  const heightCm = toPositiveNumber(height);

  let result: BmiResult | null = null;
  if (weightKg !== null && heightCm !== null) {
    result = calculateBmi(weightKg, heightCm);
  }

  return (
    <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
      <label className="flex flex-col gap-1 text-sm font-medium text-slate-700">
        Weight (kg)
        <input
          type="number"
          inputMode="decimal"
          min="0"
          step="0.1"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          className={inputClassName}
          placeholder="e.g. 70"
        />
      </label>

      <label className="flex flex-col gap-1 text-sm font-medium text-slate-700">
        Height (cm)
        <input
          type="number"
          inputMode="decimal"
          min="0"
          step="0.1"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          className={inputClassName}
          placeholder="e.g. 175"
        />
      </label>

      <div role="status" aria-live="polite" className="rounded-md bg-slate-100 px-4 py-3">
        {result ? (
          <>
            <p className="text-2xl font-semibold text-slate-900">
              {result.bmi}{" "}
              <span className="text-base font-normal text-slate-600">kg/m²</span>
            </p>
            <p className="text-sm text-slate-600">{result.category}</p>
          </>
        ) : (
          <p className="text-sm text-slate-500">
            Enter weight and height to calculate BMI.
          </p>
        )}
      </div>
    </form>
  );
}
