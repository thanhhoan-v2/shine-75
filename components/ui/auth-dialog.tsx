'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import Link from 'next/link';

interface AuthDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  description?: string;
  cancelText?: string;
  signInText?: string;
}

export function AuthDialog({
  open,
  onOpenChange,
  title = 'Sign in to continue',
  description = 'You need to be signed in to perform this action. Sign in to continue.',
  cancelText = 'No, thanks',
  signInText = 'Yes, sign me in',
}: AuthDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button color="outline" onClick={() => onOpenChange(false)}>
            {cancelText}
          </Button>
          <Button asChild>
            <Link
              className="bg-primary hover:bg-primary/90 font-bold text-primary-foreground"
              href="/sign-in"
              onClick={() => onOpenChange(false)}
            >
              {signInText}
            </Link>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
} 