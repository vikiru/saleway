import { useState } from 'react';

interface UseConfirmDialogReturn {
  open: boolean;
  setOpen: (open: boolean) => void;
  openDialog: () => void;
  closeDialog: () => void;
}

export function useConfirmDialog(): UseConfirmDialogReturn {
  const [open, setOpen] = useState(false);

  const openDialog = () => setOpen(true);
  const closeDialog = () => setOpen(false);

  return {
    open,
    setOpen,
    openDialog,
    closeDialog,
  };
}
