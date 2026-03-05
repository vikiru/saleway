import Image from 'next/image';

interface ProductGalleryProps {
  name: string;
  image_url: string;
}

export function ProductGallery({ name, image_url }: ProductGalleryProps) {
  return (
    <div>
      <div className="overflow-hidden rounded-lg bg-muted aspect-square relative">
        <Image
          alt={name}
          className="h-full w-full object-cover object-center"
          fill
          priority
          sizes="(max-width: 640px) 100vw, 50vw"
          src={image_url || `https://placehold.co/800x800/png?text=${encodeURIComponent(name)}`}
        />
      </div>
    </div>
  );
}
