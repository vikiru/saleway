import { ArrowLeft, XCircle } from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';

import { getCurrentUser } from '@/features/user/actions/auth';
import { Button } from '@/lib/components/ui/button';
import { Card, CardContent } from '@/lib/components/ui/card';
import { CART_ROUTE, SEARCH_ROUTE, SIGNIN_ROUTE } from '@/lib/constants/routes';

export const dynamic = 'force-dynamic';

export default async function CheckoutCancelPage() {
  const userId = await getCurrentUser();
  if (!userId) {
    redirect(SIGNIN_ROUTE);
  }

  return (
    <main className="flex min-h-[80vh] items-center justify-center p-4 text-center">
      <Card className="w-full max-w-md border-none bg-transparent shadow-none">
        <CardContent className="flex flex-col items-center py-12">
          <div className="rounded-full bg-destructive/10 p-6">
            <XCircle className="h-20 w-20 text-destructive" />
          </div>

          <h1 className="mt-10 font-extrabold tracking-tight">Payment Cancelled</h1>
          <p className="mt-4 max-w-[320px] text-lg text-muted-foreground">
            The payment process was not completed. Your cart items are safe and waiting for you.
          </p>

          <div className="mt-12 flex w-full flex-col gap-4 px-6">
            <Link href={CART_ROUTE} prefetch={false}>
              <Button className="h-12 w-full text-lg font-semibold" size="lg">
                <ArrowLeft className="mr-2 h-5 w-5" />
                Return to Cart
              </Button>
            </Link>
            <Link href={SEARCH_ROUTE} prefetch={false}>
              <Button className="h-12 w-full text-lg font-medium" variant="ghost">
                Continue Shopping
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
