import type { Table as TableType } from '@tanstack/react-table';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { Button } from '@/components/ui/button';
import { genericMemo } from '@/lib/helpers/react.helpers';

interface Props<T> {
  table: TableType<T>;
}

const DataTablePagination = <T,>({ table }: Props<T>) => {
  const { t } = useTranslation('common');

  const { canNext, canPrev, selected, total, handleNext, handlePrev } = useMemo(
    () => ({
      canPrev: !table.getCanPreviousPage(),
      canNext: !table.getCanNextPage(),
      selected: table.getFilteredSelectedRowModel().rows.length,
      total: table.getFilteredRowModel().rows.length,
      handlePrev: () => table.previousPage(),
      handleNext: () => table.nextPage(),
    }),
    [table]
  );

  return (
    <div className='flex items-center justify-end space-x-2 py-4'>
      <div className='text-muted-foreground flex-1 text-sm'>
        {!!selected &&
          t('data-table.rows-selected', {
            selected,
            total,
          })}
      </div>

      <div className='space-x-2'>
        <Button
          variant='outline'
          size='sm'
          disabled={canPrev}
          onClick={handlePrev}
        >
          {t('data-table.prev')}
        </Button>

        <Button
          variant='outline'
          size='sm'
          disabled={canNext}
          onClick={handleNext}
        >
          {t('data-table.next')}
        </Button>
      </div>
    </div>
  );
};

export default genericMemo(DataTablePagination);
