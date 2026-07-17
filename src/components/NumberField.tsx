"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function NumberField({
  id,
  label,
  value,
  onChange,
  placeholder,
  suffix,
  className,
  "aria-label": ariaLabel,
}: {
  id: string;
  label?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  suffix?: string;
  className?: string;
  "aria-label"?: string;
}) {
  return (
    <div className={`flex flex-col gap-1.5 ${className ?? ""}`}>
      {label ? <Label htmlFor={id}>{label}</Label> : null}
      <div className="relative">
        <Input
          id={id}
          type="number"
          inputMode="decimal"
          min="0"
          step="0.1"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          aria-label={ariaLabel}
          className={suffix ? "pr-12" : undefined}
        />
        {suffix ? (
          <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-sm text-muted-foreground">
            {suffix}
          </span>
        ) : null}
      </div>
    </div>
  );
}
