import { ReviewCard } from '@/features/product/components/ReviewCard';
import { Button } from '@/lib/components/ui/button';
import type { Review } from '@/features/product/types/product';

interface ReviewsListProps {
  reviews: Review[];
  productId: string;
}

export function ReviewsList({ reviews }: ReviewsListProps) {
  return (
    <section className="pb-16">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-2xl font-bold tracking-tight text-foreground">Customer Reviews</h3>
        <Button variant="outline">Write a Review</Button>
      </div>

      <div className="space-y-8">
        {reviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
    </section>
  );
}
