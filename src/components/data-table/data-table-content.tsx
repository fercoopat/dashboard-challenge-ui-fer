import { flexRender, type Table as TableType } from '@tanstack/react-table';

import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Table as TableWrapper,
} from '@/components/ui/table';
import { genericMemo } from '@/lib/helpers/react.helpers';
import { useTranslation } from 'react-i18next';

interface Props<T> {
  table: TableType<T>;
  ns: string | string[];
}

const DataTableContent = <T,>({ table, ns = '' }: Props<T>) => {
  const { t } = useTranslation(['common', ...ns]);

  return (
    <div className='w-full rounded-md border'>
      <TableWrapper>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                const renderContent = flexRender(
                  header.column.columnDef.header,
                  header.getContext()
                );

                const headerContent =
                  typeof renderContent === 'string'
                    ? t(renderContent)
                    : renderContent;

                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder ? null : headerContent}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && 'selected'}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={table.getAllColumns().length}
                className='h-24 text-center'
              >
                {t('no-results')}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </TableWrapper>
    </div>
  );
};

export default genericMemo(DataTableContent);
