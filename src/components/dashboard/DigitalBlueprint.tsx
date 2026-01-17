import { FileText, Lock, Database, Activity, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { mockBlueprintMetadata, mockUser } from '@/data/mockData';

export function DigitalBlueprint() {
  const encryptionPercentage = Math.round(
    (mockBlueprintMetadata.encryptedFields / mockBlueprintMetadata.totalDataPoints) * 100
  );

  const dataCategories = [
    { name: 'Personal Information', fields: 12, encrypted: 12 },
    { name: 'Financial Data', fields: 8, encrypted: 8 },
    { name: 'Medical Records', fields: 15, encrypted: 15 },
    { name: 'Employment Data', fields: 7, encrypted: 5 },
    { name: 'Preferences', fields: 5, encrypted: 2 },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-2xl font-bold flex items-center gap-3">
          <FileText className="w-7 h-7 text-primary" />
          Digital Blueprint
        </h2>
        <p className="text-muted-foreground mt-1">
          Summary of your encrypted data metadata (no actual data shown)
        </p>
      </div>

      {/* User Identity Card */}
      <Card className="glass-card glow-border">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Lock className="w-5 h-5 text-primary" />
            Identity Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <p className="text-xs text-muted-foreground mb-1">Non-PII User ID</p>
            <p className="font-mono text-sm text-primary">{mockUser.userId}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">Consent Sealed</p>
            <p className="text-sm">{mockUser.consentTimestamp.toLocaleDateString()}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">Total Data Points</p>
            <p className="text-sm font-semibold">{mockBlueprintMetadata.totalDataPoints}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">Access Events</p>
            <p className="text-sm font-semibold">{mockBlueprintMetadata.accessEvents}</p>
          </div>
        </CardContent>
      </Card>

      {/* Encryption Status */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Database className="w-5 h-5 text-primary" />
            Encryption Status
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              {mockBlueprintMetadata.encryptedFields} of {mockBlueprintMetadata.totalDataPoints} fields encrypted
            </span>
            <span className="text-lg font-bold text-primary">{encryptionPercentage}%</span>
          </div>
          <Progress value={encryptionPercentage} className="h-2" />
        </CardContent>
      </Card>

      {/* Data Categories Breakdown */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Data Categories</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {dataCategories.map((category, index) => (
            <Card 
              key={category.name} 
              className="glass-card hover-lift"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-sm">{category.name}</h4>
                  <Lock className="w-4 h-4 text-primary" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Fields: {category.fields}</span>
                    <span>Encrypted: {category.encrypted}</span>
                  </div>
                  <Progress 
                    value={(category.encrypted / category.fields) * 100} 
                    className="h-1.5" 
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Metadata Footer */}
      <Card className="glass-card">
        <CardContent className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4" />
            Last updated: {mockBlueprintMetadata.lastUpdated.toLocaleDateString()}
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Activity className="w-4 h-4" />
            {mockBlueprintMetadata.accessEvents} total access events
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
