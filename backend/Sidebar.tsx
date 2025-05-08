
import { Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import { Button } from '@/components/ui/button';
import { Gauge, PawPrint, Calendar, Settings, LogOut, ShieldCheck, Stethoscope, Users } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { name: 'Dashboard', icon: Gauge, path: '/dashboard' },
  { name: 'Pets', icon: PawPrint, path: '/pets' },
  { name: 'Appointments', icon: Calendar, path: '/appointments' },
  { name: 'Services', icon: Stethoscope, path: '/services' },
  { name: 'Insurance', icon: ShieldCheck, path: '/insurance' },
];

export const Sidebar = () => {
  const location = useLocation();
  const logout = useAuthStore((state) => state.logout);
  const user = useAuthStore((state) => state.user);

  return (
    <div className="flex flex-col h-full bg-secondary p-4 border-r border-border">
      <div className="flex items-center gap-2 mb-8 px-2">
        <PawPrint className="h-8 w-8 text-primary" />
        <h1 className="text-xl font-bold">Pet Care CRM</h1>
      </div>
      
      <div className="flex flex-col space-y-1">
        {navItems.map((item) => (
          <Link key={item.name} to={item.path}>
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-start gap-2",
                location.pathname === item.path && "bg-muted text-foreground"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.name}
            </Button>
          </Link>
        ))}
      </div>
      
      <div className="mt-auto pt-4 border-t border-border">
        <div className="flex items-center gap-2 mb-4 px-2">
          <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
            <Users className="h-4 w-4" />
          </div>
          <div>
            <p className="text-sm font-medium">{user?.username}</p>
            <p className="text-xs text-muted-foreground">
              {user?.isAdmin ? 'Administrator' : 'User'}
            </p>
          </div>
        </div>
        
        <Button 
          variant="ghost" 
          className="w-full justify-start gap-2 text-destructive hover:text-destructive"
          onClick={logout}
        >
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </div>
    </div>
  );
};
