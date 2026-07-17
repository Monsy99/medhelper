# Syrup Dosage Calculator

Converts a weight-based (mg/kg) oral dose into the volume of liquid
medication to administer, using the concentration printed on the product
label.

## Formula

```
totalDoseMg          = weightKg * doseMgPerKg
concentrationMgPerMl = labelAmountMg / labelVolumeMl
volumeMl             = totalDoseMg / concentrationMgPerMl
```

`labelAmountMg` / `labelVolumeMl` mirror how concentration is printed on
syrup packaging (e.g. "250 mg / 5 mL"), so the clinician can copy the two
numbers straight off the label instead of pre-computing a per-mL
concentration by hand.

## Inputs

- Patient weight in kilograms (> 0)
- Prescribed dose in mg/kg (> 0) — from the prescribing reference, this tool
  does not look up or suggest a dose
- Label concentration as amount in mg per volume in mL (both > 0)

## Output

- Total dose in mg
- Volume to administer in mL, rounded to 2 decimal places — round further to
  whatever increment the actual dosing syringe/spoon can measure before
  administering

## Files

- `calculate.ts` — pure conversion logic, unit tested in `calculate.test.ts`
- `SyrupDosageCalculator.tsx` — client component: form + live result
- `SyrupDosageCalculator.test.tsx` — interaction test via Testing Library

## Known limitations

- Does not know per-drug recommended dosing — the mg/kg value is supplied by
  the clinician. This tool only performs the arithmetic conversion from dose
  + concentration to volume.
- Does not enforce maximum single-dose or daily-dose caps.
