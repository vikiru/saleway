import parse from 'html-react-parser';

import { Separator } from '@/lib/components/ui/separator';

interface ProductDescriptionProps {
  shortDescription: string;
  longDescription: string;
}

export function ProductDescription({ longDescription }: ProductDescriptionProps) {
  return (
    <>
      <div className="mt-10">
        <h2 className="font-bold tracking-tight text-foreground">Description</h2>
        {/* oxlint-disable-next-line tailwindcss/no-unknown-classes */}
        <div className="prose mt-6 max-w-none dark:prose-invert">{parse(longDescription)}</div>
      </div>

      <Separator className="my-8" />
    </>
  );
}
