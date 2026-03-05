import { Separator } from '@/lib/components/ui/separator';

interface ProductDescriptionProps {
  shortDescription: string;
  longDescription: string;
}

export function ProductDescription({ shortDescription, longDescription }: ProductDescriptionProps) {
  return (
    <>
      <div className="mt-16">
        <h3 className="text-2xl font-bold tracking-tight text-foreground">Description</h3>
        <div className="mt-6 space-y-6 text-base text-muted-foreground">
          <p>{longDescription}</p>
        </div>
      </div>

      <Separator className="my-12" />
    </>
  );
}
