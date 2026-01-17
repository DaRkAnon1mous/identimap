import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { DashboardOverview } from '@/components/dashboard/DashboardOverview';
import { FamilyAccess } from '@/components/dashboard/FamilyAccess';
import { AccessVisibility } from '@/components/dashboard/AccessVisibility';
import { PartnerCompanies } from '@/components/dashboard/PartnerCompanies';
import { DigitalBlueprint } from '@/components/dashboard/DigitalBlueprint';
import { TokenHistory } from '@/components/dashboard/TokenHistory';
import { CompanyDashboard } from '@/components/dashboard/CompanyDashboard';
import { mockUser } from '@/data/mockData';

export default function Dashboard() {
  const navigate = useNavigate();
  const [activeView, setActiveView] = useState('dashboard');

  const isCompanyInterface = activeView.startsWith('company');

  const handleLogout = () => {
    navigate('/');
  };

  const renderContent = () => {
    switch (activeView) {
      case 'dashboard':
        return <DashboardOverview onNavigate={setActiveView} />;
      case 'family':
        return <FamilyAccess />;
      case 'visibility':
        return <AccessVisibility />;
      case 'partners':
        return <PartnerCompanies />;
      case 'blueprint':
        return <DigitalBlueprint />;
      case 'tokens':
        return <TokenHistory />;
      case 'company-dashboard':
        return <CompanyDashboard />;
      default:
        return <DashboardOverview onNavigate={setActiveView} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header 
        user={{ name: mockUser.name, email: mockUser.email }} 
        onLogout={handleLogout}
      />
      
      <div className="flex flex-1">
        <Sidebar 
          activeView={activeView} 
          onViewChange={setActiveView}
          isCompanyInterface={isCompanyInterface}
        />
        
        <main className="flex-1 p-6 lg:p-8 overflow-auto">
          <div className="max-w-6xl mx-auto">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
}
