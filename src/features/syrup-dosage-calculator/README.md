# Syrup Dosage Calculator

Converts a weight-based dose **range** (in units — "j", e.g. j.m. /
international units) into practical whole-mL volumes for dosing 2, 3, or 4
times a day, using the concentration printed on the product label.

## Formula

```
dailyDoseMinJ         = weightKg * doseMinPerKgPerDay
dailyDoseMaxJ         = weightKg * doseMaxPerKgPerDay
concentrationJPerMl   = labelAmountJ / labelVolumeMl

# for each frequency f in {2, 3, 4} times per day:
minMl(f) = round(dailyDoseMinJ / f / concentrationJPerMl)
maxMl(f) = round(dailyDoseMaxJ / f / concentrationJPerMl)
```

`labelAmountJ` / `labelVolumeMl` mirror how concentration is printed on
syrup packaging (e.g. "100 000 j / 1 mL"), so the clinician can copy the two
numbers straight off the label. Each frequency's min/max mL is rounded to
the nearest **whole** mL independently — that's the number that's actually
easy to draw up and hand to a caregiver, so the tool does that rounding
instead of leaving it to mental math.

## Inputs

- Patient weight in kilograms (> 0)
- Prescribed daily dose range: min and max, both in j/kg/day (> 0, max ≥
  min) — from the prescribing reference, this tool does not look up or
  suggest a dose
- Label concentration as amount in j per volume in mL (both > 0)

## Output

- Total daily dose range, in j
- For 2×, 3×, and 4× per day: the volume per dose, as a whole-mL range (or a
  single whole-mL value when min and max round to the same number)

## Files

- `calculate.ts` — pure conversion logic, unit tested in `calculate.test.ts`
- `SyrupDosageCalculator.tsx` — client component: form + live result table
- `SyrupDosageCalculator.test.tsx` — interaction tests via Testing Library

## Known limitations

- Does not know per-drug recommended dosing — the j/kg/day range is supplied
  by the clinician. This tool only performs the arithmetic conversion from
  dose + concentration to volume.
- Does not enforce maximum single-dose or daily-dose caps.
- Rounding to the nearest whole mL can round a very small computed dose down
  to 0 mL (e.g. a light patient on a low dose split 4×/day) — when that
  happens, prefer a less frequent schedule (2× or 3×/day) rather than reading
  it as "no dose needed."
- Only supports concentration expressed in units (j) per mL — not mg/mL.
