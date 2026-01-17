import { Building, FileText, Shield, AlertTriangle, Activity, Lock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FeatureCard } from '@/components/ui/FeatureCard';

export function CompanyDashboard() {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-3">
            <Building className="w-7 h-7 text-primary" />
            Company Interface
          </h2>
          <p className="text-muted-foreground mt-1">
            Manage data declarations, compliance, and oversight controls
          </p>
        </div>
        <Badge variant="outline" className="gap-1.5 py-1.5 w-fit border-primary/50 text-primary">
          <Shield className="w-3.5 h-3.5" />
          Enterprise Mode
        </Badge>
      </div>

      {/* Company Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="glass-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Declarations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">active consents</p>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Compliance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">98%</div>
            <p className="text-xs text-muted-foreground">score</p>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Activity className="w-4 h-4" />
              Audit Logs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,247</div>
            <p className="text-xs text-muted-foreground">sealed records</p>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              Anomalies
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">detected</p>
          </CardContent>
        </Card>
      </div>

      {/* Company Features */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Management Modules</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <FeatureCard
            title="Data Declarations"
            description="Manage data category declarations and user consents"
            icon={FileText}
            disabled
            comingSoon
          />
          <FeatureCard
            title="Access Expiry Enforcement"
            description="Automatic enforcement of access time limits"
            icon={Lock}
            disabled
            comingSoon
          />
          <FeatureCard
            title="Audit Log Sealing"
            description="Immutable audit trail with cryptographic sealing"
            icon={Activity}
            disabled
            comingSoon
          />
          <FeatureCard
            title="Compliance Monitoring"
            description="Real-time compliance status and alerts"
            icon={Shield}
            disabled
            comingSoon
          />
          <FeatureCard
            title="Anomaly Detection"
            description="AI-powered detection of unusual access patterns"
            icon={AlertTriangle}
            disabled
            comingSoon
          />
        </div>
      </div>

      {/* Emergency Controls */}
      <Card className="glass-card border-destructive/30">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2 text-destructive">
            <AlertTriangle className="w-5 h-5" />
            Emergency & Oversight Controls
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between p-3 rounded-lg bg-destructive/5 border border-destructive/20">
            <div>
              <p className="font-medium">Emergency Freeze</p>
              <p className="text-sm text-muted-foreground">Immediately halt all data access</p>
            </div>
            <Badge variant="outline" className="text-muted-foreground">
              Coming Soon
            </Badge>
          </div>
          <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50 border border-border">
            <div>
              <p className="font-medium">Read-Only Lawful Visibility</p>
              <p className="text-sm text-muted-foreground">Authorized oversight access mode</p>
            </div>
            <Badge variant="outline" className="text-muted-foreground">
              Coming Soon
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
