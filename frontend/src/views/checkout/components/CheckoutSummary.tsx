import { Loader2 } from 'lucide-react';

import { Button } from '@/lib/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/lib/components/ui/card';
import { Separator } from '@/lib/components/ui/separator';

interface CheckoutSummaryProps {
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  isLoading: boolean;
  error: string | null;
  onCheckout: () => Promise<void>;
}

export function CheckoutSummary({
  subtotal,
  tax,
  shipping,
  total,
  isLoading,
  error,
  onCheckout,
}: CheckoutSummaryProps) {
  return (
    <aside aria-labelledby="summary-title" className="lg:sticky lg:top-24 lg:col-span-5">
      <Card className="border border-border/60 bg-card shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl font-semibold" id="summary-title">
            Order Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between text-base">
            <span className="text-muted-foreground">Subtotal</span>
            <span className="font-mono font-medium">${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-base">
            <span className="text-muted-foreground">Shipping</span>
            <span className="font-mono font-medium text-green-600 dark:text-green-400">${shipping.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-base">
            <span className="text-muted-foreground">Estimated Tax</span>
            <span className="font-mono font-medium">${tax.toFixed(2)}</span>
          </div>
          <Separator className="my-2" />
          <div className="flex justify-between pt-2 text-xl font-bold">
            <span>Total</span>
            <span className="font-mono">${total.toFixed(2)}</span>
          </div>
        </CardContent>
        <CardFooter className="mt-4 flex-col gap-4">
          {error && (
            <div
              aria-live="polite"
              className="w-full rounded-lg bg-destructive/10 p-3 text-center text-sm font-medium text-destructive"
            >
              {error}
            </div>
          )}
          <Button
            className="h-12 w-full text-base font-semibold transition-all hover:-translate-y-px active:translate-y-0"
            disabled={isLoading}
            onClick={onCheckout}
            size="lg"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Connecting to Payment Gateway...
              </>
            ) : (
              'Confirm & Pay'
            )}
          </Button>
          <p className="px-4 text-center text-xs text-muted-foreground">
            By clicking "Confirm & Pay", you agree to our Terms of Service and Privacy Policy.
          </p>
        </CardFooter>
      </Card>
    </aside>
  );
}
