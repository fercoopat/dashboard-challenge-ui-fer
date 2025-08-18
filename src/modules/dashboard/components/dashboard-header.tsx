import { RefreshCw } from 'lucide-react';
import { useCallback } from 'react';

import { DateRangeFilter } from '@/components/date-range-filter';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useDashboard } from '@/modules/dashboard/contexts/dashboard.context';

const DashboardHeader = () => {
  const {
    isLoadingSummaryQuery,
    rangeValues,
    handleRangeChange,
    resetFilters,
    updateDateRange,
  } = useDashboard();

  const handleChangeDateRange = useCallback(() => {
    if (rangeValues.from && rangeValues.to) {
      updateDateRange(rangeValues.from, rangeValues.to);
    }
  }, [updateDateRange, rangeValues.from, rangeValues.to]);

  return (
    <header className='sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
      <div className='container mx-auto px-4 py-4'>
        <div className='flex flex-col items-start lg:flex-row lg:items-center lg:justify-between gap-4'>
          <div className='space-y-2'>
            <h1 className='text-3xl font-bold tracking-tight'>
              Panel de Control de Calidad del Aire
            </h1>

            <p className='text-muted-foreground'>
              Monitoreo moderno y dinámico en tiempo real
            </p>
          </div>

          <div className='flex flex-col items-start sm:flex-row sm:items-end gap-4'>
            <DateRangeFilter value={rangeValues} onChange={handleRangeChange} />

            <div className='flex items-center gap-2'>
              <Button
                variant='outline'
                onClick={handleChangeDateRange}
                disabled={isLoadingSummaryQuery}
                className='flex items-center gap-2'
              >
                <RefreshCw
                  className={cn('size-4', {
                    'animate-spin': isLoadingSummaryQuery,
                  })}
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
