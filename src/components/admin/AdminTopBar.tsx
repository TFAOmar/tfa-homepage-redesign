import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";

const AdminTopBar = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    navigate("/auth");
  };

  return (
    <div className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container mx-auto flex h-12 items-center justify-between px-4">
        <span className="text-sm font-semibold text-navy">TFA Admin</span>
        <div className="flex items-center gap-3">
          {user?.email && (
            <span className="hidden sm:inline text-xs text-muted-foreground">{user.email}</span>
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