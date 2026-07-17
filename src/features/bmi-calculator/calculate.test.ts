import { calculateBmi, categorizeBmi } from "./calculate";

describe("categorizeBmi", () => {
  it.each([
    [17, "Underweight"],
    [18.5, "Normal weight"],
    [22, "Normal weight"],
    [24.9, "Normal weight"],
    [25, "Overweight"],
    [29.9, "Overweight"],
    [30, "Obese"],
    [40, "Obese"],
  ] as const)("categorizes %s as %s", (bmi, expected) => {
    expect(categorizeBmi(bmi)).toBe(expected);
  });
});

describe("calculateBmi", () => {
  it("computes BMI from weight in kg and height in cm", () => {
    const result = calculateBmi(70, 175);
    expect(result.bmi).toBe(22.9);
    expect(result.category).toBe("Normal weight");
  });

  it("rounds to one decimal place", () => {
    const result = calculateBmi(68, 170);
    expect(result.bmi).toBe(23.5);
  });

  it.each([
    [0, 170],
    [-5, 170],
    [70, 0],
    [70, -175],
    [NaN, 170],
    [70, NaN],
  ])("throws for non-positive inputs weight=%s height=%s", (weight, height) => {
    expect(() => calculateBmi(weight, height)).toThrow(RangeError);
  });
});
