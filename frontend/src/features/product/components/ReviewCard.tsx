import { RatingStars } from '@/features/product/components/RatingStars';

interface ReviewCardProps {
  review: {
    id: string;
    userName: string;
    rating: number;
    comment: string;
    createdAt: string;
  };
}

export function ReviewCard({ review }: ReviewCardProps) {
  const date = new Date(review.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="border-b border-border pb-8">
      <div className="flex items-start justify-between">
        <div>
          <p className="font-medium text-foreground">{review.userName}</p>
          <div className="mt-1 flex items-center gap-2">
            <RatingStars className="scale-90" rating={review.rating} />
            <span className="text-sm text-muted-foreground">{date}</span>
          </div>
        </div>
      </div>
      <p className="mt-4 text-sm text-muted-foreground leading-relaxed">{review.comment}</p>
    </div>
  );
}
