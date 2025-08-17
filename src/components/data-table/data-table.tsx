import type { ColumnDef } from '@tanstack/react-table';

import DataTableContent from '@/components/data-table/data-table-content';
import DataTablePagination from '@/components/data-table/data-table-pagination';
import { useDataTable } from '@/hooks/use-data-table';
import { genericMemo } from '@/lib/helpers/react.helpers';

type Props<T> = {
  data: T[];
  columns: ColumnDef<T>[];
  ns: string | string[];
};
const DataTable = <T,>({ data, columns, ns = '' }: Props<T>) => {
  const { table } = useDataTable({ data, columns });

  return (
    <div className='my-4'>
      <DataTableContent table={table} ns={ns} />
      <DataTablePagination table={table} />
    </div>
  );
};
export default genericMemo(DataTable);
