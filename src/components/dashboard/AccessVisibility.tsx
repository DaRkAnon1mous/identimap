import { Eye, User, Building2, X } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { mockAccessRecords } from '@/data/mockData';
import { cn } from '@/lib/utils';

export function AccessVisibility() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-success/10 text-success border-success/30';
      case 'revoked': return 'bg-muted text-muted-foreground';
      case 'expired': return 'bg-destructive/10 text-destructive border-destructive/30';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-2xl font-bold flex items-center gap-3">
          <Eye className="w-7 h-7 text-primary" />
          Who Has Access
        </h2>
        <p className="text-muted-foreground mt-1">
          View and manage all entities that have access to your data
        </p>
      </div>

      <div className="flex gap-2 flex-wrap">
        <Badge variant="outline" className="py-1.5">All ({mockAccessRecords.length})</Badge>
        <Badge variant="outline" className="py-1.5">Active ({mockAccessRecords.filter(r => r.status === 'active').length})</Badge>
        <Badge variant="outline" className="py-1.5">Expired ({mockAccessRecords.filter(r => r.status === 'expired').length})</Badge>
      </div>

      <div className="grid gap-4">
        {mockAccessRecords.map((record, index) => (
          <Card 
            key={record.id} 
            className="glass-card hover-lift"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <CardContent className="p-4">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className={cn(
                    'w-12 h-12 rounded-lg flex items-center justify-center',
                    record.entityType === 'person' ? 'bg-info/10' : 'bg-primary/10'
                  )}>
                    {record.entityType === 'person' ? (
                      <User className="w-5 h-5 text-info" />
                    ) : (
                      <Building2 className="w-5 h-5 text-primary" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold">{record.entity}</h3>
                    <p className="text-sm text-muted-foreground capitalize">{record.entityType}</p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="flex flex-wrap gap-1.5">
                    {record.dataCategories.map((category) => (
                      <Badge key={category} variant="secondary" className="text-xs">
                        {category}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="text-sm text-muted-foreground">
                      <span className="block">Granted: {record.accessGranted.toLocaleDateString()}</span>
                      <span className="block">Expires: {record.accessExpires.toLocaleDateString()}</span>
                    </div>
                    <Badge variant="outline" className={cn(getStatusColor(record.status))}>
                      {record.status}
                    </Badge>
                    {record.status === 'active' && (
                      <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive hover:bg-destructive/10">
                        <X className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
