interface ProductGalleryProps {
  name: string;
  imageUrl: string;
}

export function ProductGallery({ name, imageUrl }: ProductGalleryProps) {
  return (
    <div>
      <div className="overflow-hidden rounded-lg bg-gray-100 aspect-square">
        <img alt={name} className="h-full w-full object-cover object-center" src={imageUrl} />
      </div>
    </div>
  );
}
