import { AlertCircle, RefreshCw } from 'lucide-react';
import { useEffect } from 'react';
import { toast } from 'sonner';

import { DateRangeFilter } from '@/components/date-range-filter';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import AirQualityChart from '@/modules/dashboard/components/air-quality-chart';
import HistoricalDataTable from '@/modules/dashboard/components/historical-data-table';
import MetricCards from '@/modules/dashboard/components/metric-cards';
import OperatorSelector from '@/modules/dashboard/components/operator-selector';
import { useDashboard } from '@/modules/dashboard/hooks/use-dashboard';
import { useRangeFilter } from '@/modules/dashboard/hooks/use-range-filter';

const DashboardPage = () => {
  const { rangeValues, handleRangeChange } = useRangeFilter();

  const {
    metricCards,
    chartData,
    historicalData,
    filters,
    isLoading,
    isRefetching,
    hasError,
    errorMessage,
    updateDateRange,
    updateOperator,
    updateInterval,
    updateSelectedParameters,
    resetFilters,
    refetchSummary,
    refetchTimeline,
    refetchHistorical,
  } = useDashboard();

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

  const handleRefresh = async () => {
    try {
      await Promise.all([
        refetchSummary(),
        refetchTimeline(),
        refetchHistorical(),
      ]);
      toast.success('Datos actualizados correctamente');
    } catch (error) {
      console.error(error);
      toast.error('Error al actualizar los datos');
    }
  };

  return (
    <div className='min-h-screen bg-background'>
      {/* Header */}
      <header className='sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
        <div className='container mx-auto px-4 py-4'>
          <div className='flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4'>
            <div className='space-y-2'>
              <h1 className='text-3xl font-bold tracking-tight'>
                Panel de Control de Calidad del Aire
              </h1>
              <p className='text-muted-foreground'>
                Monitoreo moderno y dinámico en tiempo real
              </p>
            </div>

            <div className='flex flex-col sm:flex-row items-center sm:items-end gap-4'>
              <DateRangeFilter onChange={handleRangeChange} />

              <div className='flex items-center gap-2'>
                <Button
                  variant='outline'
                  onClick={handleRefresh}
                  disabled={isLoading}
                  className='flex items-center gap-2'
                >
                  <RefreshCw
                    className={`h-4 w-4 ${isRefetching ? 'animate-spin' : ''}`}
                  />
                  Actualizar
                </Button>

                <Button
                  variant='outline'
                  onClick={resetFilters}
                  className='flex items-center gap-2'
                >
                  Reset
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className='container mx-auto px-4 py-6 space-y-6'>
        {/* Error Alert */}
        {!!hasError && (
          <Alert variant='destructive'>
            <AlertCircle className='h-4 w-4' />
            <AlertDescription>
              {errorMessage ||
                'Ha ocurrido un error al cargar los datos del dashboard.'}
            </AlertDescription>
          </Alert>
        )}

        {/* Summary Section */}
        <section className='space-y-4'>
          <div className='flex flex-col lg:flex-row gap-6'>
            <div className='lg:w-1/4'>
              <OperatorSelector
                selectedOperator={filters.operator}
                onOperatorChange={updateOperator}
                isLoading={isLoading}
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
                <MetricCards metrics={metricCards} isLoading={isLoading} />
              </div>
            </div>
          </div>
        </section>

        {/* Chart Section */}
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

        {/* Historical Data Table Section */}
        <section className='space-y-4'>
          <HistoricalDataTable data={historicalData} isLoading={isLoading} />
        </section>
      </main>

      {/* Loading Overlay */}
      {!!isLoading && (
        <div className='fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center'>
          <div className='flex flex-col items-center gap-4'>
            <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-primary'></div>
            <p className='text-lg font-medium'>Cargando dashboard...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
