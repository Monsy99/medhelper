# BMI Calculator

Computes body mass index from weight and height and reports the WHO adult
weight category.

## Formula

```
BMI = weight_kg / (height_m ^ 2)
```

Rounded to one decimal place.

## Categories (WHO, adult, general population)

| BMI range   | Category      |
| ----------- | ------------- |
| < 18.5      | Underweight   |
| 18.5 – 24.9 | Normal weight |
| 25 – 29.9   | Overweight    |
| ≥ 30        | Obese         |

## Inputs

- Weight in kilograms (> 0)
- Height in centimeters (> 0)

## Files

- `calculate.ts` — pure calculation + categorization logic, unit tested in
  `calculate.test.ts`
- `BmiCalculator.tsx` — client component: form + live result
- `BmiCalculator.test.tsx` — interaction test via Testing Library

## Known limitations

Not adjusted for age, sex, pregnancy, or athletic build — this is the
standard adult BMI formula only, intended as a quick reference, not a
diagnostic tool.
