import { RefreshCw } from 'lucide-react';
import { useCallback } from 'react';
import { toast } from 'sonner';

import { DateRangeFilter } from '@/components/date-range-filter';
import { Button } from '@/components/ui/button';
import { useDashboard } from '@/modules/dashboard/contexts/dashboard.context';

const DashboardHeader = () => {
  const {
    isLoadingSummaryQuery,
    isRefetching,
    rangeValues,
    handleRangeChange,
    refetchHistorical,
    refetchSummary,
    refetchTimeline,
    resetFilters,
  } = useDashboard();

  const handleRefresh = useCallback(async () => {
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
  }, [refetchHistorical, refetchSummary, refetchTimeline]);

  return (
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
            <DateRangeFilter value={rangeValues} onChange={handleRangeChange} />

            <div className='flex items-center gap-2'>
              <Button
                variant='outline'
                onClick={handleRefresh}
                disabled={isLoadingSummaryQuery}
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
                Restablecer
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
export default DashboardHeader;
