import { 
  Users, 
  Eye, 
  Building2, 
  FileText, 
  Clock,
  ShieldCheck,
  Lock,
  Activity
} from 'lucide-react';
import { FeatureCard } from '@/components/ui/FeatureCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { mockUser, mockAccessRecords, mockTokens, mockBlueprintMetadata } from '@/data/mockData';

interface DashboardOverviewProps {
  onNavigate: (view: string) => void;
}

export function DashboardOverview({ onNavigate }: DashboardOverviewProps) {
  const activeAccess = mockAccessRecords.filter(r => r.status === 'active').length;
  const recentTokens = mockTokens.length;

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Welcome Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Welcome back, {mockUser.name.split(' ')[0]}</h2>
          <p className="text-muted-foreground">
            Your data is protected and encrypted. Last activity: today
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="gap-1.5 py-1.5 border-success/50 text-success">
            <ShieldCheck className="w-3.5 h-3.5" />
            All Systems Secure
          </Badge>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="glass-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Lock className="w-4 h-4" />
              Encrypted Fields
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockBlueprintMetadata.encryptedFields}</div>
            <p className="text-xs text-muted-foreground">of {mockBlueprintMetadata.totalDataPoints} total</p>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Eye className="w-4 h-4" />
              Active Access
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeAccess}</div>
            <p className="text-xs text-muted-foreground">entities with access</p>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Activity className="w-4 h-4" />
              Access Events
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockBlueprintMetadata.accessEvents}</div>
            <p className="text-xs text-muted-foreground">all time</p>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Ledger Tokens
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{recentTokens}</div>
            <p className="text-xs text-muted-foreground">immutable records</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <FeatureCard
            title="Add Family Member"
            description="Grant time-bound access to trusted family members"
            icon={Users}
            onClick={() => onNavigate('family')}
          />
          <FeatureCard
            title="Who Has Access"
            description="View and manage all entities with access to your data"
            icon={Eye}
            onClick={() => onNavigate('visibility')}
          />
          <FeatureCard
            title="Partner Companies"
            description="Manage trusted companies and their data declarations"
            icon={Building2}
            onClick={() => onNavigate('partners')}
          />
          <FeatureCard
            title="Digital Blueprint"
            description="View a summary of your encrypted data metadata"
            icon={FileText}
            onClick={() => onNavigate('blueprint')}
          />
          <FeatureCard
            title="Token History"
            description="View immutable ledger of all consent and access tokens"
            icon={Clock}
            onClick={() => onNavigate('tokens')}
          />
        </div>
      </div>
    </div>
  );
}
