'use client';

import { useUser } from '@clerk/nextjs';
import { Pencil, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

import type { Review } from '@/entities/rating/types/rating';

import { RatingStars } from '@/entities/rating/components/RatingStars';
import { ReviewFormDialog } from '@/features/rating/components/ReviewFormDialog';
import { useDeleteReview } from '@/features/rating/mutations/rating';
import { cn } from '@/shared/lib/cn';
import { ConfirmDialog } from '@/shared/lib/ConfirmDialog';
import { Button } from '@/shared/ui/button';

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
    } catch {
      toast.error('Failed to delete review. Please try again.');
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
          <div className="flex min-w-0 flex-col gap-1">
            <div className="flex flex-wrap items-center gap-2">
              <RatingStars className="scale-90" rating={review.rating} />
              <span className="text-xs text-muted-foreground">{date}</span>
              {isOwner && (
                <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                  Your review
                </span>
              )}
            </div>
            <p className="mt-1 text-sm leading-snug font-semibold text-foreground">{review.title}</p>
          </div>

          {isOwner && (
            <div className="flex shrink-0 items-center gap-1">
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

        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{review.review}</p>

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
