"use client";

import { useState } from "react";
import { NumberField } from "@/components/NumberField";
import { toPositiveNumber } from "@/lib/numbers";
import { calculateBmi, type BmiResult } from "./calculate";

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
      <NumberField
        id="weight"
        label="Weight"
        value={weight}
        onChange={setWeight}
        placeholder="e.g. 70"
        suffix="kg"
      />

      <NumberField
        id="height"
        label="Height"
        value={height}
        onChange={setHeight}
        placeholder="e.g. 175"
        suffix="cm"
      />

      <div role="status" aria-live="polite" className="rounded-lg bg-muted p-4">
        {result ? (
          <>
            <p className="text-2xl font-semibold text-foreground">
              {result.bmi}{" "}
              <span className="text-base font-normal text-muted-foreground">
                kg/m²
              </span>
            </p>
            <p className="text-sm text-muted-foreground">{result.category}</p>
          </>
        ) : (
          <p className="text-sm text-muted-foreground">
            Enter weight and height to calculate BMI.
          </p>
        )}
      </div>
    </form>
  );
}
