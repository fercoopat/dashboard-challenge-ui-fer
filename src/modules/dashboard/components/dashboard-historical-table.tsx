import HistoricalDataTable from '@/modules/dashboard/components/historical-data-table';
import { useDashboard } from '@/modules/dashboard/contexts/dashboard.context';

const DashboardHistoricalTable = () => {
  const { historicalData, isLoadingHistoricalDataQuery } = useDashboard();

  return (
    <section className='space-y-4'>
      <HistoricalDataTable
        data={historicalData}
        isLoading={isLoadingHistoricalDataQuery}
      />
    </section>
  );
};
export default DashboardHistoricalTable;
