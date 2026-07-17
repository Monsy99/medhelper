# Syrup Dosage Calculator

Converts a weight-based dose **range** (in units — "j", e.g. j.m. /
international units) into precise mL volumes for dosing 2, 3, or 4 times a
day, using the concentration printed on the product label.

## Formula

```
dailyDoseMinJ         = weightKg * doseMinPerKgPerDay
dailyDoseMaxJ         = weightKg * doseMaxPerKgPerDay
concentrationJPerMl   = labelAmountJ / labelVolumeMl

# for each frequency f in {2, 3, 4} times per day:
minMl(f) = dailyDoseMinJ / f / concentrationJPerMl
maxMl(f) = dailyDoseMaxJ / f / concentrationJPerMl
```

`labelAmountJ` / `labelVolumeMl` mirror how concentration is printed on
syrup packaging (e.g. "100 000 j / 1 mL"), so the clinician can copy the two
numbers straight off the label. All outputs are rounded to 2 decimal places
only — to avoid floating-point noise (e.g. `4.333333333333334`), not to
collapse the value to a whole number. The exact fractional mL is left
in so the clinician can judge how to round for whatever the actual dosing
device can measure, rather than the tool silently picking a whole-mL number
for them.

## Inputs

- Patient weight in kilograms (> 0)
- Prescribed daily dose range: min and max, both in j/kg/day (> 0, max ≥
  min) — from the prescribing reference, this tool does not look up or
  suggest a dose
- Label concentration as amount in j per volume in mL (both > 0)

## Output

- Total daily dose range, in j
- For 2×, 3×, and 4× per day: the volume per dose, as an mL range (or a
  single mL value when min and max round to the same 2-decimal number)

## Files

- `calculate.ts` — pure conversion logic, unit tested in `calculate.test.ts`
- `SyrupDosageCalculator.tsx` — client component: form + live result table
- `SyrupDosageCalculator.test.tsx` — interaction tests via Testing Library

## Known limitations

- Does not know per-drug recommended dosing — the j/kg/day range is supplied
  by the clinician. This tool only performs the arithmetic conversion from
  dose + concentration to volume.
- Does not enforce maximum single-dose or daily-dose caps.
- Volumes are not rounded to a measurable increment — a dosing
  syringe/spoon can't draw up an arbitrary fraction of a mL, so the
  clinician still needs to round to whatever the actual device can measure
  before administering.
- Only supports concentration expressed in units (j) per mL — not mg/mL.
