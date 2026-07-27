'use client';

import { useUser } from '@clerk/nextjs';
import { Pencil, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { RatingStars } from '@/features/rating/components/RatingStars';
import { ReviewFormDialog } from '@/features/rating/components/ReviewFormDialog';
import { useDeleteReview } from '@/features/rating/mutations/rating';
import type { Review } from '@/features/rating/types/rating';
import { ConfirmDialog } from '@/lib/components/confirm-dialog';
import { Button } from '@/lib/components/ui/button';
import { cn } from '@/lib/utils';

interface ReviewCardProps {
  review: Review;
  productId: number;
}

export function ReviewCard({ review, productId }: ReviewCardProps) {
  const { user } = useUser();
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const deleteReview = useDeleteReview(String(productId));

  const isOwner = user?.id === review.user_id;

  const date = review.date_reviewed
    ? new Date(review.date_reviewed).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    : '';

  const handleDelete = async () => {
    try {
      await deleteReview.mutateAsync(review.id);
      toast.success('Review deleted.');
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Failed to delete review';
      toast.error(message);
    }
  };

  return (
    <>
      <div
        className={cn(
          'rounded-lg border border-border p-4 transition-colors',
          isOwner && 'border-primary/30 bg-primary/5',
        )}
      >
        <div className="flex items-start justify-between gap-2">
          <div className="flex flex-col gap-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <RatingStars className="scale-90" rating={review.rating} />
              <span className="text-xs text-muted-foreground">{date}</span>
              {isOwner && (
                <span className="text-xs font-medium text-primary bg-primary/10 rounded-full px-2 py-0.5">
                  Your review
                </span>
              )}
            </div>
            <p className="font-semibold text-sm text-foreground leading-snug mt-1">{review.title}</p>
          </div>

          {isOwner && (
            <div className="flex items-center gap-1 shrink-0">
              <Button
                aria-label="Edit review"
                className="h-7 w-7 text-muted-foreground hover:text-foreground"
                onClick={() => setEditOpen(true)}
                size="icon"
                variant="ghost"
              >
                <Pencil className="h-3.5 w-3.5" />
              </Button>
              <Button
                aria-label="Delete review"
                className="h-7 w-7 text-muted-foreground hover:text-destructive"
                disabled={deleteReview.isPending}
                onClick={() => setDeleteOpen(true)}
                size="icon"
                variant="ghost"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
              <ConfirmDialog
                cancelText="Cancel"
                confirmText="Delete"
                description="This action cannot be undone. Your review will be permanently removed."
                heading="Delete Review?"
                onConfirm={handleDelete}
                onOpenChange={setDeleteOpen}
                open={deleteOpen}
              />
            </div>
          )}
        </div>

        <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{review.review}</p>

        <p className="mt-2 text-xs text-muted-foreground/70">— {review.author}</p>
      </div>

      {isOwner && (
        <ReviewFormDialog
          defaultValues={{ rating: review.rating, title: review.title, review: review.review }}
          mode="edit"
          onOpenChange={setEditOpen}
          open={editOpen}
          productId={productId}
          reviewId={review.id}
        />
      )}
    </>
  );
}
