import { useNavigate } from 'react-router-dom';
import { Shield, ArrowRight, Lock, Users, FileText, Fingerprint } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const features = [
  {
    icon: Lock,
    title: 'End-to-End Encryption',
    description: 'Your personal data is encrypted and never shared without explicit consent'
  },
  {
    icon: Users,
    title: 'Granular Access Control',
    description: 'Control who can access your data with time-bound permissions'
  },
  {
    icon: FileText,
    title: 'Immutable Audit Trail',
    description: 'Every access and consent is recorded on a permanent ledger'
  },
  {
    icon: Fingerprint,
    title: 'Privacy-First Identity',
    description: 'Your identity is protected with non-PII user identifiers'
  }
];

export default function Index() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-info/5 rounded-full blur-3xl" />
      </div>

      {/* Hero Section */}
      <header className="relative z-10 container mx-auto px-4 pt-8 pb-4">
        <nav className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10 glow-border">
              <Shield className="w-6 h-6 text-primary" />
            </div>
            <span className="text-xl font-bold gradient-text">IDENTIMAP</span>
          </div>
          <Button variant="outline" onClick={() => navigate('/auth')}>
            Sign In
          </Button>
        </nav>
      </header>

      <main className="relative z-10 flex-1 container mx-auto px-4 py-16 flex flex-col items-center justify-center text-center">
        <div className="max-w-3xl animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm mb-8">
            <Shield className="w-4 h-4" />
            <span>Secure Identity & Consent Management</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Take Control of Your{' '}
            <span className="gradient-text">Digital Identity</span>
          </h1>

          <p className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            IDENTIMAP gives you complete control over your personal data. 
            Manage access, track consent, and maintain an immutable audit trail 
            of every interaction with your identity.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              size="lg" 
              className="gap-2 px-8"
              onClick={() => navigate('/auth')}
            >
              Get Started
              <ArrowRight className="w-4 h-4" />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => navigate('/dashboard')}
            >
              View Demo Dashboard
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-20 w-full max-w-5xl">
          {features.map((feature, index) => (
            <Card 
              key={feature.title} 
              className="glass-card hover-lift text-left"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-5">
                <div className="p-2.5 rounded-lg bg-primary/10 w-fit mb-4">
                  <feature.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border/50 py-6">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2024 IDENTIMAP. Privacy-first identity management.</p>
        </div>
      </footer>
    </div>
  );
}
