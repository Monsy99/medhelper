export type SyrupDosageInput = {
  weightKg: number;
  doseMinPerKgPerDay: number;
  doseMaxPerKgPerDay: number;
  concentrationAmountJ: number;
  concentrationPerMl: number;
};

export type FrequencyDosage = {
  timesPerDay: number;
  minMl: number;
  maxMl: number;
};

export type SyrupDosageResult = {
  dailyDoseMinJ: number;
  dailyDoseMaxJ: number;
  concentrationJPerMl: number;
  frequencies: FrequencyDosage[];
};

const TIMES_PER_DAY_OPTIONS = [2, 3, 4] as const;

function assertPositive(value: number, label: string): void {
  if (!(value > 0)) {
    throw new RangeError(`${label} must be a positive number.`);
  }
}

function round2(value: number): number {
  return Math.round(value * 100) / 100;
}

export function calculateSyrupDosage({
  weightKg,
  doseMinPerKgPerDay,
  doseMaxPerKgPerDay,
  concentrationAmountJ,
  concentrationPerMl,
}: SyrupDosageInput): SyrupDosageResult {
  assertPositive(weightKg, "Weight");
  assertPositive(doseMinPerKgPerDay, "Minimum dose");
  assertPositive(doseMaxPerKgPerDay, "Maximum dose");
  assertPositive(concentrationAmountJ, "Concentration amount");
  assertPositive(concentrationPerMl, "Concentration volume");

  if (doseMaxPerKgPerDay < doseMinPerKgPerDay) {
    throw new RangeError(
      "Maximum dose must be greater than or equal to the minimum dose."
    );
  }

  const dailyDoseMinJ = weightKg * doseMinPerKgPerDay;
  const dailyDoseMaxJ = weightKg * doseMaxPerKgPerDay;
  const concentrationJPerMl = concentrationAmountJ / concentrationPerMl;

  const frequencies: FrequencyDosage[] = TIMES_PER_DAY_OPTIONS.map(
    (timesPerDay) => ({
      timesPerDay,
      minMl: round2(dailyDoseMinJ / timesPerDay / concentrationJPerMl),
      maxMl: round2(dailyDoseMaxJ / timesPerDay / concentrationJPerMl),
    })
  );

  return {
    dailyDoseMinJ: round2(dailyDoseMinJ),
    dailyDoseMaxJ: round2(dailyDoseMaxJ),
    concentrationJPerMl: round2(concentrationJPerMl),
    frequencies,
  };
}
