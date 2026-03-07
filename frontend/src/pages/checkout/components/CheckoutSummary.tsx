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
    <aside aria-labelledby="summary-title" className="lg:col-span-5 lg:sticky lg:top-24">
      <Card className="border border-border/60 shadow-sm bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-xl font-semibold" id="summary-title">
            Order Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between text-base">
            <span className="text-muted-foreground">Subtotal</span>
            <span className="font-medium font-mono">${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-base">
            <span className="text-muted-foreground">Shipping</span>
            <span className="font-medium font-mono text-green-600 dark:text-green-400">${shipping.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-base">
            <span className="text-muted-foreground">Estimated Tax</span>
            <span className="font-medium font-mono">${tax.toFixed(2)}</span>
          </div>
          <Separator className="my-2" />
          <div className="flex justify-between text-xl font-bold pt-2">
            <span>Total</span>
            <span className="font-mono">${total.toFixed(2)}</span>
          </div>
        </CardContent>
        <CardFooter className="flex-col gap-4 mt-4">
          {error && (
            <div
              aria-live="polite"
              className="text-sm font-medium text-destructive bg-destructive/10 p-3 rounded-lg w-full text-center"
            >
              {error}
            </div>
          )}
          <Button
            className="w-full h-12 text-base font-semibold transition-all hover:-translate-y-px active:translate-y-0"
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
          <p className="text-xs text-muted-foreground text-center px-4">
            By clicking "Confirm & Pay", you agree to our Terms of Service and Privacy Policy.
          </p>
        </CardFooter>
      </Card>
    </aside>
  );
}
