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
      minMl: Math.round(dailyDoseMinJ / timesPerDay / concentrationJPerMl),
      maxMl: Math.round(dailyDoseMaxJ / timesPerDay / concentrationJPerMl),
    })
  );

  return {
    dailyDoseMinJ: Math.round(dailyDoseMinJ * 100) / 100,
    dailyDoseMaxJ: Math.round(dailyDoseMaxJ * 100) / 100,
    concentrationJPerMl: Math.round(concentrationJPerMl * 100) / 100,
    frequencies,
  };
}
