import type { LucideIcon } from 'lucide-react';

import { Card, CardContent } from '@/lib/components/ui/card';

type StatsCardProps = {
  title: string;
  value: string | number;
  icon: LucideIcon;
};

export function StatsCard({ title, value, icon: Icon }: StatsCardProps) {
  return (
    <Card className="border border-border/60 shadow-sm transition-all hover:shadow-md">
      <CardContent className="p-6">
        <div className="flex items-center justify-between space-x-4">
          <div className="flex flex-col space-y-1">
            <span className="text-sm font-medium tracking-wide text-muted-foreground">{title}</span>
            <span className="font-heading text-3xl font-bold tracking-tight">{value}</span>
          </div>
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/20 ring-inset">
            <Icon className="size-6" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
