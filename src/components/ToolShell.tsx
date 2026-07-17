import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { ReactNode } from "react";
import { Disclaimer } from "@/components/Disclaimer";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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
      <Button
        render={<Link href="/" />}
        nativeButton={false}
        variant="ghost"
        size="sm"
        className="-ml-2 w-fit text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        All tools
      </Button>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">{children}</CardContent>
      </Card>

      <Disclaimer />
    </div>
  );
}
