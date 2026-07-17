import { tools } from "@/lib/tools";
import { ToolTile } from "@/components/ToolTile";

export default function Home() {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-12">
      <h1 className="text-2xl font-semibold tracking-tight text-foreground">
        Quick reference tools
      </h1>
      <p className="mt-2 max-w-2xl text-muted-foreground">
        Simple, fast reference calculators for everyday clinical tasks.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool) => (
          <ToolTile key={tool.slug} tool={tool} />
        ))}
      </div>
    </div>
  );
}
