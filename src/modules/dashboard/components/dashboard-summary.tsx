import MetricCards from '@/modules/dashboard/components/metric-cards';
import OperatorSelector from '@/modules/dashboard/components/operator-selector';
import { useDashboard } from '@/modules/dashboard/contexts/dashboard.context';

const DashboardSummary = () => {
  const { filters, isLoadingSummaryQuery, metricCards, updateOperator } =
    useDashboard();

  return (
    <section className='space-y-4'>
      <div className='flex flex-col lg:flex-row gap-6'>
        <div className='lg:w-1/4'>
          <OperatorSelector
            selectedOperator={filters.operator}
            onOperatorChange={updateOperator}
            isLoading={isLoadingSummaryQuery}
          />
        </div>

        <div className='lg:w-3/4'>
          <div className='space-y-2'>
            <h2 className='text-2xl font-semibold tracking-tight'>
              Resumen de Métricas
            </h2>
            <p className='text-muted-foreground'>
              Valores{' '}
              {filters.operator === 'avg'
                ? 'promedio'
                : filters.operator === 'min'
                ? 'mínimos'
                : 'máximos'}{' '}
              de los parámetros ambientales
            </p>
          </div>

          <div className='mt-4'>
            <MetricCards
              metrics={metricCards}
              isLoading={isLoadingSummaryQuery}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
export default DashboardSummary;
