import { Package } from 'lucide-react';
import Image from 'next/image';

interface ProductGalleryProps {
  name: string;
  image_url: string;
}

export function ProductGallery({ name, image_url }: ProductGalleryProps) {
  return (
    <div>
      <div className="relative flex aspect-square items-center justify-center overflow-hidden rounded-lg bg-muted">
        {image_url ? (
          <Image
            alt={name}
            className="h-full w-full object-cover object-center"
            fill
            priority
            sizes="(max-width: 640px) 100vw, 50vw"
            src={image_url}
          />
        ) : (
          <Package className="h-24 w-24 text-muted-foreground/30" />
        )}
      </div>
    </div>
  );
}
