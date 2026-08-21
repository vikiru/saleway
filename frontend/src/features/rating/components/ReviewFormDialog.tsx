'use client';

import { useUser } from '@clerk/nextjs';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { type ReviewFormValues, reviewFormSchema } from '@/entities/rating/schemas/rating';
import { useCreateReview, useUpdateReview } from '@/features/rating/mutations/rating';
import { Button } from '@/shared/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/ui/dialog';
import { Input } from '@/shared/ui/input';
import { Label } from '@/shared/ui/label';
import { Textarea } from '@/shared/ui/textarea';

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
    resolver: zodResolver(reviewFormSchema),
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
          date_reviewed: new Date().toISOString(),
          date_purchased: new Date().toISOString(),
        });
        toast.success('Review submitted successfully!');
      }
      setOpen(false);
    } catch {
      toast.error('Failed to submit review. Please try again.');
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
              <div className="flex items-center gap-2">
                <Button
                  onClick={() => {
                    const newVal = Math.max(0, (rating || 0) - 0.5);
                    setValue('rating', newVal, { shouldValidate: true });
                  }}
                  size="icon"
                  type="button"
                  variant="outline"
                >
                  -
                </Button>
                <Input
                  className="w-16 text-center"
                  id="rating"
                  max={5}
                  min={0}
                  step={0.5}
                  type="number"
                  {...register('rating', { valueAsNumber: true })}
                />
                <Button
                  onClick={() => {
                    const newVal = Math.min(5, (rating || 0) + 0.5);
                    setValue('rating', newVal, { shouldValidate: true });
                  }}
                  size="icon"
                  type="button"
                  variant="outline"
                >
                  +
                </Button>
                <span className="text-sm text-muted-foreground">/ 5</span>
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
