import Link from "next/link";
import { Stethoscope } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/80">
      <div className="mx-auto flex max-w-5xl items-center px-4 py-4">
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-semibold tracking-tight"
        >
          <Stethoscope className="size-5" aria-hidden="true" />
          MedHelper
        </Link>
      </div>
    </header>
  );
}
