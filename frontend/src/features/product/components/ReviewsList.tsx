'use client';

import { useUser } from '@clerk/nextjs';
import { MessageSquareOff } from 'lucide-react';
import { ReviewCard } from '@/features/product/components/ReviewCard';
import { ReviewFormDialog } from '@/features/product/components/ReviewFormDialog';
import type { Review } from '@/features/product/types/product';
import { useReviews } from '@/features/product/queries/rating';
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@/lib/components/ui/empty';
import { ScrollArea } from '@/lib/components/ui/scroll-area';

interface ReviewsListProps {
  reviews: Review[];
  productId: string;
}

export function ReviewsList({ reviews: serverReviews, productId }: ReviewsListProps) {
  const { data: reviews = [] } = useReviews(productId, serverReviews);
  const { user } = useUser();
  const hasReviewed = user ? reviews.some((r) => r.user_id === user.id) : false;

  return (
    <section className="pb-16">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-2xl font-bold tracking-tight text-foreground">Customer Reviews</h3>
          <p className="text-sm text-muted-foreground mt-0.5">
            {reviews.length} {reviews.length === 1 ? 'review' : 'reviews'}
          </p>
        </div>
        {!hasReviewed && (
          <ReviewFormDialog
            productId={Number(productId)}
            trigger={
              <button className="text-sm underline underline-offset-4 text-primary hover:text-primary/80 transition-colors">
                Write a Review
              </button>
            }
          />
        )}
      </div>

      {reviews.length > 0 ? (
        <ScrollArea className="h-[480px] pr-3">
          <div className="space-y-3">
            {reviews.map((review) => (
              <ReviewCard key={review.id} productId={Number(productId)} review={review} />
            ))}
          </div>
        </ScrollArea>
      ) : (
        <div className="flex flex-col items-center justify-center py-12">
          <Empty>
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <MessageSquareOff />
              </EmptyMedia>
              <EmptyTitle>No reviews yet</EmptyTitle>
              <EmptyDescription>
                Be the first to share your experience with this product and help others make a choice!
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        </div>
      )}
    </section>
  );
}
