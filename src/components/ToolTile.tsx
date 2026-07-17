import Link from "next/link";
import type { Tool } from "@/lib/tools";
import { toolHref } from "@/lib/tools";

export function ToolTile({ tool }: { tool: Tool }) {
  return (
    <Link
      href={toolHref(tool.slug)}
      className="group flex flex-col gap-2 rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-sky-300 hover:shadow-md"
    >
      <span className="text-3xl" aria-hidden="true">
        {tool.icon}
      </span>
      <span className="font-semibold text-slate-900 group-hover:text-sky-700">
        {tool.name}
      </span>
      <span className="text-sm text-slate-600">{tool.shortDescription}</span>
    </Link>
  );
}
