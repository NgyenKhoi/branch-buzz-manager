import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';
import { useAuthStore } from '@/store/authStore';
import OwnerDashboardLayout from '@/components/layout/OwnerDashboardLayout';
import { seedBranchData } from '@/lib/mockDataInit';
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

    const activeBranch = userBranches[0];

    useEffect(() => {
  if (activeBranch) {
    seedBranchData(activeBranch.id);
  }
}, [activeBranch]);

  if (loading) {
    return (
      <OwnerDashboardLayout activeView={activeView} onViewChange={setActiveView}>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </OwnerDashboardLayout>
    );
  }



  // Handler for choosing another brand
  const handleChooseBrand = () => {
    localStorage.removeItem('selected_brand');
    navigate('/brand-selection');
  };


  return (
    <OwnerDashboardLayout activeView={activeView} onViewChange={setActiveView}>
      {activeView === 'overview' && (
        <div className="space-y-6">
          <div className="flex justify-end">
            <button
              className="px-4 py-2 rounded bg-primary text-white hover:bg-primary/90 transition"
              onClick={handleChooseBrand}
            >
              Choose Another Brand
            </button>
          </div>
          <OverviewDashboard userBranches={userBranches} />
        </div>
      )}
      {activeView === 'menu' && activeBranch ? <MenuManagement branchId={activeBranch.id} /> : null}
      {activeView === 'tables' && activeBranch ? <TableManagement branchId={activeBranch.id} /> : null}
      {activeView === 'staff' && activeBranch ? <StaffManagement branchId={activeBranch.id} /> : null}
      {activeView === 'reports' && activeBranch ? <ReportsAnalytics branchId={activeBranch.id} /> : null}
    </OwnerDashboardLayout>
  );
};

export default OwnerDashboard;
