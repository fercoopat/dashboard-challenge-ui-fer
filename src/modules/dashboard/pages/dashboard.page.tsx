import ErrorAlertMessage from '@/components/common/error-alert-message';
import DashboardChart from '@/modules/dashboard/components/dashboard-chart';
import DashboardHeader from '@/modules/dashboard/components/dashboard-header';
import DashboardHistoricalTable from '@/modules/dashboard/components/dashboard-historical-table';
import DashboardSummary from '@/modules/dashboard/components/dashboard-summary';
import { useDashboard } from '@/modules/dashboard/contexts/dashboard.context';

const DashboardPage = () => {
  const { error, errorMessage } = useDashboard();

  return (
    <div className='min-h-screen bg-background'>
      <DashboardHeader />

      <main className='container mx-auto px-4 py-6 space-y-6'>
        <ErrorAlertMessage errorMessage={errorMessage} showError={!!error} />

        <DashboardSummary />

        <DashboardChart />

        <DashboardHistoricalTable />
      </main>
    </div>
  );
};

export default DashboardPage;
