import HistoricalDataTable from '@/modules/dashboard/components/historical-data-table';
import { useDashboard } from '@/modules/dashboard/contexts/dashboard.context';

const DashboardHistoricalTable = () => {
  const { historicalData, isLoading } = useDashboard();

  return (
    <section className='space-y-4'>
      <HistoricalDataTable data={historicalData} isLoading={isLoading} />
    </section>
  );
};
export default DashboardHistoricalTable;
