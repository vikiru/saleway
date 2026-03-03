import type { LucideIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

type StatsCardProps = {
  title: string;
  value: string | number;
  icon: LucideIcon;
};

export function StatsCard({ title, value, icon: Icon }: StatsCardProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between space-x-4">
          <div className="flex flex-col space-y-1">
            <span className="text-sm font-medium text-muted-foreground tracking-wide">{title}</span>
            <span className="text-3xl font-bold tracking-tight font-heading">{value}</span>
          </div>
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-inset ring-primary/20">
            <Icon className="size-6" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
