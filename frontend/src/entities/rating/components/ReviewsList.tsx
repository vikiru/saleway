'use client';

import { useUser } from '@clerk/nextjs';
import { MessageSquareOff, Plus } from 'lucide-react';

import type { Review } from '@/entities/rating/types/rating';

import { ReviewCard } from '@/entities/rating/components/ReviewCard';
import { useReviews } from '@/entities/rating/queries/rating';
import { ReviewFormDialog } from '@/features/rating/components/ReviewFormDialog';
import { Button } from '@/shared/ui/button';
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@/shared/ui/empty';
import { ScrollArea } from '@/shared/ui/scroll-area';

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
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="font-bold tracking-tight text-foreground">Customer Reviews</h2>
          <p className="mt-0.5 text-sm text-muted-foreground">
            {reviews.length} {reviews.length === 1 ? 'review' : 'reviews'}
          </p>
        </div>
        {!hasReviewed && (
          <ReviewFormDialog
            productId={Number(productId)}
            trigger={
              <Button className="gap-2" size="sm" variant="outline">
                <Plus className="size-4" />
                Write a Review
              </Button>
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
