'use client';

import { useUser } from '@clerk/nextjs';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, Star } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { useCreateReview, useUpdateReview } from '@/features/product/queries/rating';
import { Button } from '@/lib/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/lib/components/ui/dialog';
import { Input } from '@/lib/components/ui/input';
import { Label } from '@/lib/components/ui/label';
import { Textarea } from '@/lib/components/ui/textarea';
import { type ReviewFormValues, reviewSchema } from '@/lib/schema/review';
import { cn } from '@/lib/utils';

interface ReviewFormDialogProps {
  productId: number;
  trigger?: React.ReactNode;
  mode?: 'create' | 'edit';
  reviewId?: number;
  defaultValues?: ReviewFormValues;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function ReviewFormDialog({
  productId,
  trigger,
  mode = 'create',
  reviewId,
  defaultValues,
  open: controlledOpen,
  onOpenChange: controlledOnOpenChange,
}: ReviewFormDialogProps) {
  const { user } = useUser();
  const [internalOpen, setInternalOpen] = useState(false);
  const [hoverRating, setHoverRating] = useState(0);

  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;
  const setOpen = (val: boolean) => {
    if (isControlled) {
      controlledOnOpenChange?.(val);
    } else {
      setInternalOpen(val);
    }
  };

  const createReview = useCreateReview();
  const updateReview = useUpdateReview(String(productId));

  const form = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewSchema),
    defaultValues: defaultValues ?? { rating: 0, title: '', review: '' },
  });

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = form;

  const rating = watch('rating');

  useEffect(() => {
    if (open) {
      reset(defaultValues ?? { rating: 0, title: '', review: '' });
    }
  }, [open, defaultValues, reset]);

  const isLoading = isSubmitting || createReview.isPending || updateReview.isPending;

  const onSubmit = async (values: ReviewFormValues) => {
    if (!user) {
      toast.error('You must be logged in to write a review');
      return;
    }

    try {
      if (mode === 'edit' && reviewId !== undefined) {
        await updateReview.mutateAsync({ reviewId, data: values });
        toast.success('Review updated successfully!');
      } else {
        await createReview.mutateAsync({
          user_id: user.id,
          product_id: productId,
          rating: values.rating,
          title: values.title,
          author: user.fullName || user.username || 'Anonymous',
          review: values.review,
          date_purchased: new Date().toISOString(),
        });
        toast.success('Review submitted successfully!');
      }
      setOpen(false);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Failed to submit review. Please try again.';
      toast.error(message);
    }
  };

  const dialogTitle = mode === 'edit' ? 'Edit Your Review' : 'Write a Review';
  const dialogDescription =
    mode === 'edit'
      ? 'Update your thoughts about this product.'
      : 'Share your thoughts about this product with other customers.';
  const submitLabel = mode === 'edit' ? 'Save Changes' : 'Submit Review';

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>{dialogTitle}</DialogTitle>
            <DialogDescription>{dialogDescription}</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="rating">Rating</Label>
              <div className="flex gap-1" id="rating">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    aria-label={`Rate ${star} stars`}
                    className="focus:outline-none transition-transform hover:scale-110"
                    key={star}
                    onClick={() => setValue('rating', star, { shouldValidate: true })}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    type="button"
                  >
                    <Star
                      className={cn(
                        'size-6 transition-colors',
                        (hoverRating || rating) >= star ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground',
                      )}
                    />
                  </button>
                ))}
              </div>
              {errors.rating && <p className="text-sm text-destructive">{errors.rating.message}</p>}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" {...register('title')} placeholder="Summarize your experience" />
              {errors.title && <p className="text-sm text-destructive">{errors.title.message}</p>}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="review">Review</Label>
              <Textarea
                className="min-h-[100px]"
                id="review"
                {...register('review')}
                placeholder="What did you like or dislike?"
              />
              {errors.review && <p className="text-sm text-destructive">{errors.review.message}</p>}
            </div>
          </div>
          <DialogFooter>
            <Button className="w-full" disabled={isLoading} type="submit">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...
                </>
              ) : (
                submitLabel
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
