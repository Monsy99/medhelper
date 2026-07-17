export type SyrupDosageInput = {
  weightKg: number;
  doseMgPerKg: number;
  concentrationAmountMg: number;
  concentrationPerMl: number;
};

export type SyrupDosageResult = {
  totalDoseMg: number;
  volumeMl: number;
};

function assertPositive(value: number, label: string): void {
  if (!(value > 0)) {
    throw new RangeError(`${label} must be a positive number.`);
  }
}

export function calculateSyrupDosage({
  weightKg,
  doseMgPerKg,
  concentrationAmountMg,
  concentrationPerMl,
}: SyrupDosageInput): SyrupDosageResult {
  assertPositive(weightKg, "Weight");
  assertPositive(doseMgPerKg, "Dose");
  assertPositive(concentrationAmountMg, "Concentration amount");
  assertPositive(concentrationPerMl, "Concentration volume");

  const totalDoseMg = weightKg * doseMgPerKg;
  const concentrationMgPerMl = concentrationAmountMg / concentrationPerMl;
  const volumeMl = totalDoseMg / concentrationMgPerMl;

  return {
    totalDoseMg: Math.round(totalDoseMg * 100) / 100,
    volumeMl: Math.round(volumeMl * 100) / 100,
  };
}
