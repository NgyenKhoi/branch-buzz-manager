import { useState, useEffect } from 'react';
import { branchApi } from '@/lib/api';
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
  const [userBranches, setUserBranches] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeView, setActiveView] = useState<string>('overview');

  useEffect(() => {
    const loadBranches = async () => {
      try {
        setLoading(true);
        const branchesResponse = await branchApi.getAll();
        let userBranchesList = branchesResponse.data.filter((branch: any) => branch.ownerId === user?.id);
        
        // If user has a selected brand, filter branches by brand
        let brandId = localStorage.getItem('selected_brand');
        if (brandId) {
          userBranchesList = userBranchesList.filter(
            (branch: any) => branch.brandName === brandId || branch.brandName === JSON.parse(brandId)
          );
        }
        
        setUserBranches(userBranchesList);
      } catch (error) {
        console.error('Error loading branches:', error);
        toast({
          variant: 'destructive',
          title: 'Error loading branches',
          description: 'Could not load branch data.',
        });
      } finally {
        setLoading(false);
      }
    };
    loadBranches();
  }, [user]);

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
