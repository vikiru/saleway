'use client';

import { Loader2 } from 'lucide-react';
import { Button } from '@/lib/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/lib/components/ui/card';
import { Input } from '@/lib/components/ui/input';
import { Label } from '@/lib/components/ui/label';
import { useOnboarding } from '@/lib/hooks/useOnboarding';

export function OnboardingForm() {
  const { form, onSubmit } = useOnboarding();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = form;

  return (
    <Card className="w-full border-none shadow-none lg:border lg:shadow-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Complete your profile</CardTitle>
        <CardDescription>We just need a few more details to get started</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input
              aria-describedby={errors.firstName ? 'firstName-error' : undefined}
              aria-invalid={!!errors.firstName}
              id="firstName"
              {...register('firstName')}
              placeholder="John"
            />
            {errors.firstName && (
              <p className="text-sm text-destructive" id="firstName-error" role="alert">
                {errors.firstName.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              aria-describedby={errors.lastName ? 'lastName-error' : undefined}
              aria-invalid={!!errors.lastName}
              id="lastName"
              {...register('lastName')}
              placeholder="Doe"
            />
            {errors.lastName && (
              <p className="text-sm text-destructive" id="lastName-error" role="alert">
                {errors.lastName.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              aria-describedby={errors.username ? 'username-error' : undefined}
              aria-invalid={!!errors.username}
              id="username"
              {...register('username')}
              placeholder="johndoe"
            />
            {errors.username && (
              <p className="text-sm text-destructive" id="username-error" role="alert">
                {errors.username.message}
              </p>
            )}
          </div>

          <Button className="w-full" disabled={isSubmitting} type="submit">
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating...
              </>
            ) : (
              'Complete Setup'
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
