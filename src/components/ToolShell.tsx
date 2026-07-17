import Link from "next/link";
import type { ReactNode } from "react";
import { Disclaimer } from "@/components/Disclaimer";

export function ToolShell({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <div className="mx-auto flex w-full max-w-xl flex-col gap-6 px-4 py-10">
      <Link
        href="/"
        className="text-sm font-medium text-sky-700 hover:underline"
      >
        ← All tools
      </Link>

      <div>
        <h1 className="text-2xl font-semibold text-slate-900">{title}</h1>
        <p className="mt-1 text-sm text-slate-600">{description}</p>
      </div>

      {children}

      <Disclaimer />
    </div>
  );
}
