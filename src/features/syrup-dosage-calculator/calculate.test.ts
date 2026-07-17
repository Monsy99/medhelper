import { calculateSyrupDosage } from "./calculate";

describe("calculateSyrupDosage", () => {
  it("converts weight-based dose + label concentration into a volume", () => {
    const result = calculateSyrupDosage({
      weightKg: 20,
      doseMgPerKg: 15,
      concentrationAmountMg: 250,
      concentrationPerMl: 5,
    });

    expect(result.totalDoseMg).toBe(300);
    expect(result.volumeMl).toBe(6);
  });

  it("handles a different label concentration", () => {
    const result = calculateSyrupDosage({
      weightKg: 10,
      doseMgPerKg: 10,
      concentrationAmountMg: 125,
      concentrationPerMl: 5,
    });

    expect(result.totalDoseMg).toBe(100);
    expect(result.volumeMl).toBe(4);
  });

  it("rounds both outputs to two decimal places", () => {
    const result = calculateSyrupDosage({
      weightKg: 9,
      doseMgPerKg: 13,
      concentrationAmountMg: 120,
      concentrationPerMl: 5,
    });

    expect(result.totalDoseMg).toBe(117);
    expect(result.volumeMl).toBe(4.88);
  });

  it.each([
    { weightKg: 0, doseMgPerKg: 10, concentrationAmountMg: 250, concentrationPerMl: 5 },
    { weightKg: -5, doseMgPerKg: 10, concentrationAmountMg: 250, concentrationPerMl: 5 },
    { weightKg: 20, doseMgPerKg: 0, concentrationAmountMg: 250, concentrationPerMl: 5 },
    { weightKg: 20, doseMgPerKg: 10, concentrationAmountMg: 0, concentrationPerMl: 5 },
    { weightKg: 20, doseMgPerKg: 10, concentrationAmountMg: 250, concentrationPerMl: 0 },
    { weightKg: NaN, doseMgPerKg: 10, concentrationAmountMg: 250, concentrationPerMl: 5 },
  ])("throws for non-positive input %j", (input) => {
    expect(() => calculateSyrupDosage(input)).toThrow(RangeError);
  });
});
