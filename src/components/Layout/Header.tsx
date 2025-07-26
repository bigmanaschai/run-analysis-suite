import { Button } from "@/components/ui/button";
import { User, LogOut } from "lucide-react";

interface HeaderProps {
  userRole: 'admin' | 'coach' | 'runner';
  userName?: string;
  onLogout: () => void;
}

export const Header = ({ userRole, userName = "User", onLogout }: HeaderProps) => {
  const getRoleColor = () => {
    switch (userRole) {
      case 'admin': return 'bg-destructive text-destructive-foreground';
      case 'coach': return 'bg-primary text-primary-foreground';
      case 'runner': return 'bg-secondary text-secondary-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <header className="bg-card border-b border-border px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold font-prompt text-foreground">
            RunAnalytics
          </h1>
          <div className={`px-3 py-1 rounded-full text-sm font-medium ${getRoleColor()}`}>
            {userRole.toUpperCase()}
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-foreground">
            <User className="w-4 h-4" />
            <span className="font-prompt font-medium">{userName}</span>
          </div>
          <Button variant="outline" size="sm" onClick={onLogout}>
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
};