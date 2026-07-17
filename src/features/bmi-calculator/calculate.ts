export type BmiCategory = "Underweight" | "Normal weight" | "Overweight" | "Obese";

export type BmiResult = {
  bmi: number;
  category: BmiCategory;
};

export function categorizeBmi(bmi: number): BmiCategory {
  if (bmi < 18.5) return "Underweight";
  if (bmi < 25) return "Normal weight";
  if (bmi < 30) return "Overweight";
  return "Obese";
}

export function calculateBmi(weightKg: number, heightCm: number): BmiResult {
  if (!(weightKg > 0) || !(heightCm > 0)) {
    throw new RangeError("Weight and height must be positive numbers.");
  }

  const heightM = heightCm / 100;
  const bmi = weightKg / (heightM * heightM);

  return {
    bmi: Math.round(bmi * 10) / 10,
    category: categorizeBmi(bmi),
  };
}
