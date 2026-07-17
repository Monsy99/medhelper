import Link from "next/link";
import type { Tool } from "@/lib/tools";
import { toolHref } from "@/lib/tools";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function ToolTile({ tool }: { tool: Tool }) {
  const Icon = tool.icon;

  return (
    <Link href={toolHref(tool.slug)} className="group block">
      <Card className="h-full transition-all hover:-translate-y-0.5 hover:shadow-md hover:ring-foreground/20">
        <CardHeader>
          <div className="mb-1 flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Icon className="size-5" aria-hidden="true" />
          </div>
          <CardTitle className="text-base group-hover:text-primary">
            {tool.name}
          </CardTitle>
          <CardDescription>{tool.shortDescription}</CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
}
