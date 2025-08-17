import AirQualityChart from '@/modules/dashboard/components/air-quality-chart';
import { useDashboard } from '@/modules/dashboard/contexts/dashboard.context';

const DashboardChart = () => {
  const {
    chartData,
    filters,
    isLoading,
    updateInterval,
    updateSelectedParameters,
  } = useDashboard();

  return (
    <section className='space-y-4'>
      <AirQualityChart
        data={chartData}
        selectedParameters={filters.selectedParameters}
        onParameterChange={updateSelectedParameters}
        interval={filters.interval}
        onIntervalChange={updateInterval}
        isLoading={isLoading}
      />
    </section>
  );
};
export default DashboardChart;
