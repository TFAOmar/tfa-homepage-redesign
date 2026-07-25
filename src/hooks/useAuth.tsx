import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

export type AppRole = 'admin' | 'staff' | 'partner' | 'user';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isAdmin: boolean;
  isStaff: boolean;
  isPartner: boolean;
  role: AppRole;
  roles: AppRole[];
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signUp: (email: string, password: string, redirectPath?: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [roles, setRoles] = useState<AppRole[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCheckingRole, setIsCheckingRole] = useState(false);

  const loadRoles = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', userId);
      if (error) {
        console.error('Error loading roles:', error);
        setRoles([]);
      } else {
        setRoles(((data ?? []) as { role: AppRole }[]).map((r) => r.role));
      }
    } catch (err) {
      console.error('Error in loadRoles:', err);
      setRoles([]);
    } finally {
      setIsCheckingRole(false);
    }
  };

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      // Defer role check to prevent deadlock
      if (session?.user) {
        setIsCheckingRole(true);
        setTimeout(() => {
          loadRoles(session.user.id);
        }, 0);
      } else {
        setRoles([]);
        setIsCheckingRole(false);
      }
      setIsLoading(false);
    });

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        setIsCheckingRole(true);
        loadRoles(session.user.id);
      } else {
        setIsCheckingRole(false);
      }
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error: error as Error | null };
  };

  const signUp = async (email: string, password: string, redirectPath?: string) => {
    // If a post-auth destination was requested (e.g. /concierge), route the email
    // confirmation link back through /auth so it can complete the redirect.
    const redirectUrl = redirectPath
      ? `${window.location.origin}/auth?next=${encodeURIComponent(redirectPath)}`
      : `${window.location.origin}/`;
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl
      }
    });
    return { error: error as Error | null };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setRoles([]);
  };

  const effectiveLoading = isLoading || isCheckingRole;
  const isAdmin = roles.includes('admin');
  const isStaff = roles.includes('staff');
  const isPartner = roles.includes('partner');
  const role: AppRole = isAdmin ? 'admin' : isStaff ? 'staff' : isPartner ? 'partner' : 'user';

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        isAdmin,
        isStaff,
        isPartner,
        role,
        roles,
        isLoading: effectiveLoading,
        signIn,
        signUp,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
