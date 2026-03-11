'use client';

import { CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/lib/components/ui/button';
import { Card, CardContent } from '@/lib/components/ui/card';
import { SEARCH_ROUTE } from '@/lib/constants/routes';

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md text-center shadow-lg">
        <CardContent className="pt-10 pb-10">
          <div className="flex justify-center mb-6">
            <div className="rounded-full bg-green-100 p-4">
              <CheckCircle className="h-16 w-16 text-green-600" />
            </div>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground mb-3">Checkout Completed!</h1>
          <p className="text-muted-foreground mb-8 text-base">Your order has been processed successfully.</p>
          <Link className="w-full block" href={SEARCH_ROUTE}>
            <Button className="w-full" size="lg">
              Continue Shopping
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
