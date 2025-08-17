import { useEffect } from 'react';
import { toast } from 'sonner';

import ErrorAlertMessage from '@/components/common/error-alert-message';
import DashboardChart from '@/modules/dashboard/components/dashboard-chart';
import DashboardHeader from '@/modules/dashboard/components/dashboard-header';
import DashboardHistoricalTable from '@/modules/dashboard/components/dashboard-historical-table';
import DashboardSummary from '@/modules/dashboard/components/dashboard-summary';
import { useDashboard } from '@/modules/dashboard/contexts/dashboard.context';

const DashboardPage = () => {
  const { hasError, errorMessage, rangeValues, updateDateRange } =
    useDashboard();

  // Sync URL params with dashboard state
  useEffect(() => {
    if (rangeValues.from && rangeValues.to) {
      updateDateRange(rangeValues.from, rangeValues.to);
    }
  }, [rangeValues, updateDateRange]);

  // Error handling with toast notifications
  useEffect(() => {
    if (hasError && errorMessage) {
      toast.error('Error en el dashboard', {
        description: errorMessage,
      });
    }
  }, [hasError, errorMessage]);

  return (
    <div className='min-h-screen bg-background'>
      {/* Header */}
      <DashboardHeader />

      {/* Main Content */}
      <main className='container mx-auto px-4 py-6 space-y-6'>
        {/* Error Alert */}
        <ErrorAlertMessage errorMessage={errorMessage} showError={!!hasError} />

        {/* Summary Section */}
        <DashboardSummary />

        {/* Chart Section */}
        <DashboardChart />

        {/* Historical Data Table Section */}
        <DashboardHistoricalTable />
      </main>
    </div>
  );
};

export default DashboardPage;
