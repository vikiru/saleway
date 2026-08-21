'use client';

import { AlertTriangle } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/shared/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/shared/ui/dialog';

interface ConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  heading: string;
  description: string;
  confirmText: string;
  cancelText?: string;
  onConfirm: () => Promise<void>;
}

export function ConfirmDialog({
  open,
  onOpenChange,
  heading,
  description,
  confirmText,
  cancelText = 'Cancel',
  onConfirm,
}: ConfirmDialogProps) {
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    setLoading(true);
    try {
      await onConfirm();
      onOpenChange(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-destructive/10">
              <AlertTriangle className="h-5 w-5 text-destructive" />
            </div>
            <DialogTitle>{heading}</DialogTitle>
          </div>
          <DialogDescription className="pt-3">{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button disabled={loading} onClick={() => onOpenChange(false)} variant="outline">
            {cancelText}
          </Button>
          <Button disabled={loading} onClick={handleConfirm} variant="destructive">
            {loading ? 'Loading...' : confirmText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
