import Link from "next/link";

export function Header() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-5xl items-center px-4 py-4">
        <Link
          href="/"
          className="text-xl font-bold tracking-tight text-slate-900"
        >
          MedHelper
        </Link>
      </div>
    </header>
  );
}
