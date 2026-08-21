import { RatingStars } from '@/entities/rating/components/RatingStars';

interface ProductRatingProps {
  rating: number;
  review_count: number;
}

export function ProductRating({ rating, review_count }: ProductRatingProps) {
  return (
    <div className="mt-6">
      <h3 className="sr-only">Reviews</h3>
      <div className="flex items-center">
        <div className="flex items-center">
          <RatingStars rating={rating} />
          <span className="ml-3 text-sm font-medium text-muted-foreground">{rating.toFixed(1)} out of 5 stars</span>
        </div>
        <p className="sr-only">{rating} out of 5 stars</p>
        <span className="ml-4 text-sm text-muted-foreground">({review_count} reviews)</span>
      </div>
    </div>
  );
}
