import { 
  LayoutDashboard, 
  Users, 
  Eye, 
  Building2, 
  FileText, 
  Clock, 
  Building,
  AlertTriangle 
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface SidebarProps {
  activeView: string;
  onViewChange: (view: string) => void;
  isCompanyInterface?: boolean;
}

const userMenuItems: { id: string; label: string; icon: typeof LayoutDashboard; disabled?: boolean }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'family', label: 'Family Access', icon: Users },
  { id: 'visibility', label: 'Who Has Access', icon: Eye },
  { id: 'partners', label: 'Partner Companies', icon: Building2 },
  { id: 'blueprint', label: 'Digital Blueprint', icon: FileText },
  { id: 'tokens', label: 'Token History', icon: Clock },
];

const companyMenuItems: { id: string; label: string; icon: typeof LayoutDashboard; disabled?: boolean }[] = [
  { id: 'company-dashboard', label: 'Company Dashboard', icon: Building },
  { id: 'declarations', label: 'Data Declarations', icon: FileText, disabled: true },
  { id: 'compliance', label: 'Compliance', icon: AlertTriangle, disabled: true },
];

export function Sidebar({ activeView, onViewChange, isCompanyInterface = false }: SidebarProps) {
  const menuItems = isCompanyInterface ? companyMenuItems : userMenuItems;

  return (
    <aside className="hidden lg:flex flex-col w-64 border-r border-border/50 bg-sidebar p-4 gap-2">
      <div className="mb-4">
        <Badge variant="outline" className="w-full justify-center py-1.5 text-xs">
          {isCompanyInterface ? 'Company Interface' : 'User Dashboard'}
        </Badge>
      </div>

      <nav className="flex flex-col gap-1">
        {menuItems.map((item) => (
          <Button
            key={item.id}
            variant="ghost"
            className={cn(
              'justify-start gap-3 h-11 px-3 text-muted-foreground hover:text-foreground hover:bg-secondary',
              activeView === item.id && 'bg-secondary text-foreground',
              item.disabled && 'opacity-40 cursor-not-allowed'
            )}
            onClick={() => !item.disabled && onViewChange(item.id)}
            disabled={item.disabled}
          >
            <item.icon className="w-4 h-4" />
            <span className="text-sm">{item.label}</span>
            {item.disabled && (
              <Badge variant="secondary" className="ml-auto text-[10px] py-0">
                Soon
              </Badge>
            )}
          </Button>
        ))}
      </nav>

      <div className="mt-auto pt-4 border-t border-border/50">
        <Button
          variant="ghost"
          className="justify-start gap-3 h-11 px-3 w-full text-muted-foreground hover:text-foreground hover:bg-secondary"
          onClick={() => onViewChange(isCompanyInterface ? 'dashboard' : 'company-dashboard')}
        >
          {isCompanyInterface ? (
            <>
              <LayoutDashboard className="w-4 h-4" />
              <span className="text-sm">User Interface</span>
            </>
          ) : (
            <>
              <Building className="w-4 h-4" />
              <span className="text-sm">Company Interface</span>
            </>
          )}
        </Button>
      </div>
    </aside>
  );
}
