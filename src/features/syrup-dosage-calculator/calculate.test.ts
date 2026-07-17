import { calculateSyrupDosage } from "./calculate";

describe("calculateSyrupDosage", () => {
  it("computes the daily dose range and per-frequency volumes", () => {
    const result = calculateSyrupDosage({
      weightKg: 10,
      doseMinPerKgPerDay: 20,
      doseMaxPerKgPerDay: 40,
      concentrationAmountJ: 100,
      concentrationPerMl: 1,
    });

    expect(result.dailyDoseMinJ).toBe(200);
    expect(result.dailyDoseMaxJ).toBe(400);
    expect(result.concentrationJPerMl).toBe(100);
    expect(result.frequencies).toEqual([
      { timesPerDay: 2, minMl: 1, maxMl: 2 },
      { timesPerDay: 3, minMl: 0.67, maxMl: 1.33 },
      { timesPerDay: 4, minMl: 0.5, maxMl: 1 },
    ]);
  });

  it("keeps fractional mL amounts (rounded to 2 decimal places only, no whole-number rounding)", () => {
    const result = calculateSyrupDosage({
      weightKg: 20,
      doseMinPerKgPerDay: 15,
      doseMaxPerKgPerDay: 30,
      concentrationAmountJ: 250,
      concentrationPerMl: 5,
    });

    expect(result.dailyDoseMinJ).toBe(300);
    expect(result.dailyDoseMaxJ).toBe(600);
    expect(result.frequencies).toEqual([
      { timesPerDay: 2, minMl: 3, maxMl: 6 },
      { timesPerDay: 3, minMl: 2, maxMl: 4 },
      { timesPerDay: 4, minMl: 1.5, maxMl: 3 },
    ]);
  });

  it("throws when the maximum dose is below the minimum dose", () => {
    expect(() =>
      calculateSyrupDosage({
        weightKg: 20,
        doseMinPerKgPerDay: 30,
        doseMaxPerKgPerDay: 15,
        concentrationAmountJ: 250,
        concentrationPerMl: 5,
      })
    ).toThrow(RangeError);
  });

  it.each([
    { weightKg: 0, doseMinPerKgPerDay: 10, doseMaxPerKgPerDay: 20, concentrationAmountJ: 250, concentrationPerMl: 5 },
    { weightKg: -5, doseMinPerKgPerDay: 10, doseMaxPerKgPerDay: 20, concentrationAmountJ: 250, concentrationPerMl: 5 },
    { weightKg: 20, doseMinPerKgPerDay: 0, doseMaxPerKgPerDay: 20, concentrationAmountJ: 250, concentrationPerMl: 5 },
    { weightKg: 20, doseMinPerKgPerDay: 10, doseMaxPerKgPerDay: 0, concentrationAmountJ: 250, concentrationPerMl: 5 },
    { weightKg: 20, doseMinPerKgPerDay: 10, doseMaxPerKgPerDay: 20, concentrationAmountJ: 0, concentrationPerMl: 5 },
    { weightKg: 20, doseMinPerKgPerDay: 10, doseMaxPerKgPerDay: 20, concentrationAmountJ: 250, concentrationPerMl: 0 },
    { weightKg: NaN, doseMinPerKgPerDay: 10, doseMaxPerKgPerDay: 20, concentrationAmountJ: 250, concentrationPerMl: 5 },
  ])("throws for non-positive input %j", (input) => {
    expect(() => calculateSyrupDosage(input)).toThrow(RangeError);
  });
});
