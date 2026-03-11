import parse from 'html-react-parser';
import { Separator } from '@/lib/components/ui/separator';

interface ProductDescriptionProps {
  shortDescription: string;
  longDescription: string;
}

export function ProductDescription({ longDescription }: ProductDescriptionProps) {
  return (
    <>
      <div className="mt-16">
        <h3 className="text-2xl font-bold tracking-tight text-foreground">Description</h3>
        <div className="mt-6 max-w-none prose dark:prose-invert">{parse(longDescription)}</div>
      </div>

      <Separator className="my-12" />
    </>
  );
}
