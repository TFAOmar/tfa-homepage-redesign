import { Navigate } from 'react-router-dom';
import { useAuth, AppRole } from '@/hooks/useAuth';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useEffect, useRef } from 'react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
  requireRole?: AppRole | AppRole[];
}

const ProtectedRoute = ({ children, requireAdmin = false, requireRole }: ProtectedRouteProps) => {
  const { user, isAdmin, roles, isLoading } = useAuth();
  const { toast } = useToast();
  const hasShownToast = useRef(false);

  const requiredRoles: AppRole[] = requireRole
    ? Array.isArray(requireRole)
      ? requireRole
      : [requireRole]
    : [];
  // Admin always passes role checks.
  const meetsRole =
    requiredRoles.length === 0 || isAdmin || requiredRoles.some((r) => roles.includes(r));

  useEffect(() => {
    if (!isLoading && user && ((requireAdmin && !isAdmin) || !meetsRole) && !hasShownToast.current) {
      hasShownToast.current = true;
      toast({
        title: 'Access Denied',
        description: 'You do not have permission to view that page.',
        variant: 'destructive'
      });
    }
  }, [isLoading, user, isAdmin, requireAdmin, meetsRole, toast]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  if (requireAdmin && !isAdmin) {
    return <Navigate to="/" replace />;
  }

  if (!meetsRole) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
