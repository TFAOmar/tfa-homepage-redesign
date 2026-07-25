import { LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const roleBadgeVariant = (role: string) => {
  switch (role) {
    case "admin":
      return "default" as const;
    case "staff":
      return "secondary" as const;
    case "partner":
      return "outline" as const;
    default:
      return "outline" as const;
  }
};

const AdminTopBar = () => {
  const { user, signOut, role, isAdmin, isStaff, isPartner } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    navigate("/auth");
  };

  return (
    <div className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container mx-auto flex h-12 items-center justify-between gap-3 px-4">
        <div className="flex items-center gap-3 min-w-0">
          <span className="text-sm font-semibold text-navy shrink-0">TFA</span>
          {user && (
            <Badge variant={roleBadgeVariant(role)} className="capitalize shrink-0">
              {role}
            </Badge>
          )}
          <nav className="hidden md:flex items-center gap-3 text-xs text-muted-foreground">
            {isAdmin && (
              <Link to="/admin" className="hover:text-navy">Admin</Link>
            )}
            {isAdmin && (
              <Link to="/admin/partners" className="hover:text-navy">Partners</Link>
            )}
            {(isAdmin || isStaff) && (
              <Link to="/dashboard" className="hover:text-navy">Intake Dashboard</Link>
            )}
            {(isAdmin || isStaff || isPartner) && (
              <Link to="/concierge" className="hover:text-navy">Concierge</Link>
            )}
          </nav>
        </div>
        <div className="flex items-center gap-3">
          {user?.email && (
            <span className="hidden sm:inline text-xs text-muted-foreground truncate max-w-[220px]">
              {user.email}
            </span>
          )}
          <Button size="sm" variant="outline" onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-2" />
            Log out
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdminTopBar;