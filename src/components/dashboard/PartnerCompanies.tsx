import { Building2, CheckCircle, AlertCircle, Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { mockPartnerCompanies } from '@/data/mockData';
import { cn } from '@/lib/utils';

export function PartnerCompanies() {
  const getComplianceIcon = (status: string) => {
    switch (status) {
      case 'compliant': return <CheckCircle className="w-4 h-4 text-success" />;
      case 'pending': return <Clock className="w-4 h-4 text-warning" />;
      case 'non-compliant': return <AlertCircle className="w-4 h-4 text-destructive" />;
      default: return null;
    }
  };

  const getComplianceColor = (status: string) => {
    switch (status) {
      case 'compliant': return 'bg-success/10 text-success border-success/30';
      case 'pending': return 'bg-warning/10 text-warning border-warning/30';
      case 'non-compliant': return 'bg-destructive/10 text-destructive border-destructive/30';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-2xl font-bold flex items-center gap-3">
          <Building2 className="w-7 h-7 text-primary" />
          Trusted Partner Companies
        </h2>
        <p className="text-muted-foreground mt-1">
          Verified companies with declared data categories and compliance status
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockPartnerCompanies.map((company, index) => (
          <Card 
            key={company.id} 
            className="glass-card hover-lift"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <CardContent className="p-5">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Building2 className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{company.name}</h3>
                    <div className="flex items-center gap-1 mt-0.5">
                      {company.verified ? (
                        <Badge variant="outline" className="text-xs gap-1 bg-success/10 text-success border-success/30">
                          <CheckCircle className="w-3 h-3" />
                          Verified
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="text-xs gap-1">
                          Unverified
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <p className="text-xs text-muted-foreground mb-1.5">Data Categories</p>
                  <div className="flex flex-wrap gap-1">
                    {company.dataCategories.map((category) => (
                      <Badge key={category} variant="secondary" className="text-xs">
                        {category}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-border/50">
                  <span className="text-xs text-muted-foreground">Compliance</span>
                  <Badge variant="outline" className={cn('gap-1', getComplianceColor(company.complianceStatus))}>
                    {getComplianceIcon(company.complianceStatus)}
                    {company.complianceStatus}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
