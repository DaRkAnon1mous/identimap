import { Clock, CheckCircle, XCircle, RefreshCw, FileEdit } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { mockTokens } from '@/data/mockData';
import { cn } from '@/lib/utils';

export function TokenHistory() {
  const getActionIcon = (action: string) => {
    switch (action) {
      case 'Access Granted': return <CheckCircle className="w-4 h-4 text-success" />;
      case 'Access Revoked': return <XCircle className="w-4 h-4 text-destructive" />;
      case 'Data Accessed': return <RefreshCw className="w-4 h-4 text-info" />;
      case 'Consent Updated': return <FileEdit className="w-4 h-4 text-warning" />;
      default: return <Clock className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getActionColor = (action: string) => {
    switch (action) {
      case 'Access Granted': return 'bg-success/10 text-success border-success/30';
      case 'Access Revoked': return 'bg-destructive/10 text-destructive border-destructive/30';
      case 'Data Accessed': return 'bg-info/10 text-info border-info/30';
      case 'Consent Updated': return 'bg-warning/10 text-warning border-warning/30';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-2xl font-bold flex items-center gap-3">
          <Clock className="w-7 h-7 text-primary" />
          Token History (Ledger)
        </h2>
        <p className="text-muted-foreground mt-1">
          Immutable record of all consent and access tokens written to the permanent ledger
        </p>
      </div>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-6 top-8 bottom-8 w-px bg-border hidden md:block" />

        <div className="space-y-4">
          {mockTokens.map((token, index) => (
            <Card 
              key={token.id} 
              className="glass-card hover-lift md:ml-12"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Timeline dot */}
              <div className="absolute -left-6 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-primary hidden md:block" />
              
              <CardContent className="p-4">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      'p-2.5 rounded-lg',
                      getActionColor(token.action).split(' ')[0]
                    )}>
                      {getActionIcon(token.action)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className={cn(getActionColor(token.action))}>
                          {token.action}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {token.entityInvolved} • {token.dataCategory}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                    <div className="font-mono text-xs text-muted-foreground bg-muted/50 px-2 py-1 rounded">
                      {token.tokenHash}
                    </div>
                    <div className="text-sm text-muted-foreground whitespace-nowrap">
                      {token.timestamp.toLocaleDateString()} at {token.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
