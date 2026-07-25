import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

const authSchema = z.object({
  email: z.string().trim().email({ message: 'Please enter a valid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' })
});

type AuthFormData = z.infer<typeof authSchema>;

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user, isAdmin, isStaff, isPartner, role, isLoading, signIn, signUp, signOut } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();

  // Optional post-auth destination, e.g. /auth?next=/concierge
  // Only allow internal paths (must start with a single '/') to prevent open redirects
  const rawNext = searchParams.get('next');
  const isSafeInternalPath = (p: string | null | undefined): p is string =>
    !!p && p.startsWith('/') && !p.startsWith('//');
  const queryNext = isSafeInternalPath(rawNext) ? rawNext : null;
  const storedNext = (() => {
    try {
      const v = sessionStorage.getItem('tfa:postLoginRedirect');
      return isSafeInternalPath(v) ? v : null;
    } catch {
      return null;
    }
  })();
  const next = queryNext ?? storedNext;

  // Context-aware copy: referral partners arrive via /auth?next=/concierge
  const isPartnerFlow = next?.startsWith('/concierge') ?? false;
  const cardTitle = isLogin
    ? (isPartnerFlow ? 'Partner Login' : next ? 'Sign In' : 'Staff & Partner Login')
    : (isPartnerFlow ? 'Create Partner Account' : 'Create Account');
  const cardDescription = isLogin
    ? (isPartnerFlow
        ? 'Sign in to access the referral concierge'
        : next
          ? 'Sign in to continue'
          : 'Sign in — you\'ll be routed to the right dashboard for your role')
    : (isPartnerFlow
        ? 'Create your partner account to access the referral concierge'
        : 'Create an account to get started');

  const form = useForm<AuthFormData>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  // Only redirect after login when we're sure the role check is complete
  // isLoading includes isCheckingRole from useAuth, so we wait for both
  useEffect(() => {
    if (!isLoading && user) {
      // Small delay to ensure state has fully settled after role check
      const timer = setTimeout(() => {
        if (next) {
          try { sessionStorage.removeItem('tfa:postLoginRedirect'); } catch {}
          navigate(next, { replace: true });
        } else if (isAdmin) {
          navigate('/admin', { replace: true });
        } else if (isStaff) {
          navigate('/dashboard', { replace: true });
        } else if (isPartner) {
          navigate('/concierge', { replace: true });
        } else {
          navigate('/', { replace: true });
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [user, isAdmin, isStaff, isPartner, isLoading, navigate, next]);

  const onSubmit = async (data: AuthFormData) => {
    setIsSubmitting(true);
    try {
      if (isLogin) {
        const { error } = await signIn(data.email, data.password);
        if (error) {
          if (error.message.includes('Invalid login credentials')) {
            toast({
              title: 'Login Failed',
              description: 'Invalid email or password. Please try again.',
              variant: 'destructive'
            });
          } else {
            toast({
              title: 'Login Failed',
              description: error.message,
              variant: 'destructive'
            });
          }
        }
      } else {
        const { error } = await signUp(data.email, data.password, next ?? undefined);
        if (error) {
          if (error.message.includes('already registered')) {
            toast({
              title: 'Account Exists',
              description: 'An account with this email already exists. Please sign in instead.',
              variant: 'destructive'
            });
          } else {
            toast({
              title: 'Sign Up Failed',
              description: error.message,
              variant: 'destructive'
            });
          }
        } else {
          toast({
            title: 'Account Created',
            description: 'Please check your email to confirm your account.',
          });
        }
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-16">
      <Card className="w-full max-w-md bg-card/50 backdrop-blur-xl border-border/20">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-foreground">
            {cardTitle}
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            {cardDescription}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">Email</FormLabel>
                    <FormControl>
                      <Input 
                        type="email" 
                        placeholder="you@example.com" 
                        className="bg-background/50 border-border/30"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">Password</FormLabel>
                    <FormControl>
                      <Input 
                        type="password" 
                        placeholder="••••••••" 
                        className="bg-background/50 border-border/30"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button 
                type="submit" 
                className="w-full bg-primary hover:bg-primary/90"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {isLogin ? 'Signing in...' : 'Creating account...'}
                  </>
                ) : (
                  isLogin ? 'Sign In' : 'Create Account'
                )}
              </Button>
            </form>
          </Form>
          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm text-primary hover:underline"
            >
              {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
            </button>
          </div>
          {user && (
            <div className="mt-4 text-center">
              <div className="text-xs text-muted-foreground mb-1">
                Role: <span className="capitalize font-medium text-foreground">{role}</span>
              </div>
              <button
                type="button"
                onClick={() => signOut()}
                className="text-xs text-muted-foreground hover:text-foreground hover:underline"
              >
                Signed in as {user.email} — Log out
              </button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;
