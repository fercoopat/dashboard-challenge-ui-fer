import AirQualityChart from '@/modules/dashboard/components/air-quality-chart';
import { useDashboard } from '@/modules/dashboard/contexts/dashboard.context';

const DashboardChart = () => {
  const {
    chartData,
    filters,
    isLoadingTimelineQuery,
    updateInterval,
    updateSelectedParameter,
  } = useDashboard();

  return (
    <section className='space-y-4'>
      <AirQualityChart
        data={chartData}
        interval={filters.interval}
        isLoading={isLoadingTimelineQuery}
        selectedParameter={filters.selectedParameter}
        onIntervalChange={updateInterval}
        onParameterChange={updateSelectedParameter}
      />
    </section>
  );
};
export default DashboardChart;
