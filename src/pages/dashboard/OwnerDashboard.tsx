import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';
import { useAuthStore } from '@/store/authStore';
import OwnerDashboardLayout from '@/components/layout/OwnerDashboardLayout';
import { OverviewDashboard } from '@/components/owner/OverviewDashboard';
import { MenuManagement } from '@/components/owner/MenuManagement';
import { TableManagement } from '@/components/owner/TableManagement';
import { StaffManagement } from '@/components/owner/StaffManagement';
import { ReportsAnalytics } from '@/components/owner/ReportsAnalytics';

const OwnerDashboard = () => {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [userBranches, setUserBranches] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeView, setActiveView] = useState<string>('overview');

  useEffect(() => {
    if (!user || user.role !== 'owner') {
      navigate('/login');
      return;
    }

    // Load selected brand and its branches
    const selectedBrand = localStorage.getItem('selected_brand');
    if (!selectedBrand) {
      toast({
        variant: 'destructive',
        title: 'No brand selected',
        description: 'Please select a brand first.',
      });
      navigate('/brand-selection');
      return;
    }

    const allBranches = JSON.parse(localStorage.getItem('mock_branches') || '[]');
    // Find branches that match the selected brand and belong to this owner
    const brandBranches = allBranches.filter((b: any) => 
      b.brandName === selectedBrand && b.ownerId === user.id
    );

    if (brandBranches.length === 0) {
      toast({
        variant: 'destructive',
        title: 'No branches found',
        description: 'This brand has no branches yet.',
      });
      navigate('/brand-selection');
      return;
    }

    setUserBranches(brandBranches);
    setLoading(false);
  }, [user, navigate]);

  if (loading) {
    return (
      <OwnerDashboardLayout activeView={activeView} onViewChange={setActiveView}>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </OwnerDashboardLayout>
    );
  }

  const activeBranch = userBranches[0];

  return (
    <OwnerDashboardLayout activeView={activeView} onViewChange={setActiveView}>
      {activeView === 'overview' && <OverviewDashboard userBranches={userBranches} />}
      {activeView === 'menu' && activeBranch && <MenuManagement branchId={activeBranch.id} />}
      {activeView === 'tables' && activeBranch && <TableManagement branchId={activeBranch.id} />}
      {activeView === 'staff' && activeBranch && <StaffManagement branchId={activeBranch.id} />}
      {activeView === 'reports' && activeBranch && <ReportsAnalytics branchId={activeBranch.id} />}
    </OwnerDashboardLayout>
  );
};

export default OwnerDashboard;
