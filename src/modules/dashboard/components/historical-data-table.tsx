import { ChevronDown, ChevronUp, Eye, Search } from 'lucide-react';
import { useMemo, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { VALUES_KEY_LABELS } from '@/modules/dashboard/constants/dashboard.constants';
import { AirQualityData } from '@/modules/dashboard/types/dashboard.types';

type SortConfig = {
  key: keyof AirQualityData;
  direction: 'asc' | 'desc';
};

interface Props {
  data: AirQualityData[] | undefined;
  isLoading?: boolean;
}

const HistoricalDataTable = ({ data = [], isLoading = false }: Props) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: 'date',
    direction: 'desc',
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(20);
  const [visibleColumns, setVisibleColumns] = useState<
    Set<keyof AirQualityData>
  >(new Set(['date', 'CO', 'NO2', 'T', 'RH']));

  const allColumns: Array<{ key: keyof AirQualityData; label: string }> = [
    { key: 'date', label: 'Fecha' },
    { key: 'CO', label: VALUES_KEY_LABELS.CO.label },
    { key: 'PT08S1', label: VALUES_KEY_LABELS.PT08S1.label },
    { key: 'NMHC', label: VALUES_KEY_LABELS.NMHC.label },
    { key: 'C6H6', label: VALUES_KEY_LABELS.C6H6.label },
    { key: 'PT08S2', label: VALUES_KEY_LABELS.PT08S2.label },
    { key: 'NOx', label: VALUES_KEY_LABELS.NOx.label },
    { key: 'PT08S3', label: VALUES_KEY_LABELS.PT08S3.label },
    { key: 'NO2', label: VALUES_KEY_LABELS.NO2.label },
    { key: 'PT08S4', label: VALUES_KEY_LABELS.PT08S4.label },
    { key: 'PT08S5', label: VALUES_KEY_LABELS.PT08S5.label },
    { key: 'T', label: VALUES_KEY_LABELS.T.label },
    { key: 'RH', label: VALUES_KEY_LABELS.RH.label },
    { key: 'AH', label: VALUES_KEY_LABELS.AH.label },
  ];

  const filteredAndSortedData = useMemo(() => {
    const filtered = data?.filter((item) => {
      if (!searchTerm) return true;

      const searchLower = searchTerm.toLowerCase();
      return (
        item.date.toLowerCase().includes(searchLower) ||
        Object.entries(item).some(([key, value]) => {
          if (key === 'date') return false;
          return value?.toString().toLowerCase().includes(searchLower);
        })
      );
    });

    const sorted = [...filtered].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (aValue === undefined && bValue === undefined) return 0;
      if (aValue === undefined) return 1;
      if (bValue === undefined) return -1;

      if (sortConfig.key === 'date') {
        return sortConfig.direction === 'asc'
          ? new Date(aValue).getTime() - new Date(bValue).getTime()
          : new Date(bValue).getTime() - new Date(aValue).getTime();
      }

      const comparison = Number(aValue) - Number(bValue);
      return sortConfig.direction === 'asc' ? comparison : -comparison;
    });

    return sorted;
  }, [data, searchTerm, sortConfig]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredAndSortedData.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredAndSortedData, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredAndSortedData.length / itemsPerPage);

  const handleSort = (key: keyof AirQualityData) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
    }));
    setCurrentPage(1);
  };

  const toggleColumn = (column: keyof AirQualityData) => {
    const newVisibleColumns = new Set(visibleColumns);
    if (newVisibleColumns.has(column)) {
      newVisibleColumns.delete(column);
    } else {
      newVisibleColumns.add(column);
    }
    setVisibleColumns(newVisibleColumns);
  };

  const formatValue = (
    value: string | number | undefined | null,
    key: keyof AirQualityData
  ) => {
    if (value === undefined || value === null) return '-';

    if (key === 'date') {
      return new Date(value).toLocaleDateString();
    }

    return typeof value === 'number' ? value.toFixed(2) : value;
  };

  const getSortIcon = (key: keyof AirQualityData) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === 'asc' ? (
      <ChevronUp className='h-4 w-4' />
    ) : (
      <ChevronDown className='h-4 w-4' />
    );
  };

  if (isLoading) {
    return (
      <Card className='w-full'>
        <CardHeader>
          <div className='h-6 bg-gray-200 rounded w-1/3 animate-pulse'></div>
        </CardHeader>
        <CardContent>
          <div className='h-80 bg-gray-200 rounded animate-pulse'></div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className='w-full'>
      <CardHeader>
        <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
          <div>
            <CardTitle className='text-xl font-semibold'>
              Datos Históricos
            </CardTitle>
            <p className='text-sm text-muted-foreground mt-1'>
              Tabla paginada con {filteredAndSortedData.length} registros
            </p>
          </div>

          <div className='flex items-center gap-2'>
            <div className='relative'>
              <Search className='absolute left-2 top-2.5 h-4 w-4 text-muted-foreground' />
              <Input
                placeholder='Buscar...'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className='pl-8 w-48'
              />
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant='outline'
                  size='sm'
                  className='flex items-center gap-2'
                >
                  <Eye className='h-4 w-4' />
                  Columnas
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align='end' className='w-56'>
                {allColumns.map(({ key, label }) => (
                  <DropdownMenuItem key={key} onClick={() => toggleColumn(key)}>
                    <Checkbox
                      checked={visibleColumns.has(key)}
                      onChange={() => {}}
                      className='mr-2'
                    />
                    {label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className='rounded-md border'>
          <Table>
            <TableHeader>
              <TableRow>
                {allColumns.map(({ key, label }) => {
                  if (!visibleColumns.has(key)) return null;

                  return (
                    <TableHead
                      key={key}
                      className='cursor-pointer hover:bg-muted/50'
                    >
                      <Button
                        variant='ghost'
                        onClick={() => handleSort(key)}
                        className='h-auto p-0 font-semibold'
                      >
                        <div className='flex items-center gap-1'>
                          {label}
                          {getSortIcon(key)}
                        </div>
                      </Button>
                    </TableHead>
                  );
                })}
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedData.map((row, index) => (
                <TableRow
                  key={`${row.date}-${index}`}
                  className='hover:bg-muted/50'
                >
                  {allColumns.map(({ key }) => {
                    if (!visibleColumns.has(key)) return null;

                    return (
                      <TableCell key={key} className='font-mono text-sm'>
                        {formatValue(row[key], key)}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className='flex items-center justify-between mt-4'>
            <div className='text-sm text-muted-foreground'>
              Mostrando {(currentPage - 1) * itemsPerPage + 1} a{' '}
              {Math.min(
                currentPage * itemsPerPage,
                filteredAndSortedData.length
              )}{' '}
              de {filteredAndSortedData.length} resultados
            </div>

            <div className='flex items-center gap-2'>
              <Button
                variant='outline'
                size='sm'
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                Anterior
              </Button>

              <div className='flex items-center gap-1'>
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const page = i + 1;
                  if (
                    totalPages <= 5 ||
                    page === 1 ||
                    page === totalPages ||
                    (page >= currentPage - 2 && page <= currentPage + 2)
                  ) {
                    return (
                      <Button
                        key={page}
                        variant={currentPage === page ? 'default' : 'outline'}
                        size='sm'
                        onClick={() => setCurrentPage(page)}
                        className='w-8 h-8 p-0'
                      >
                        {page}
                      </Button>
                    );
                  }
                  return null;
                })}
              </div>

              <Button
                variant='outline'
                size='sm'
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
              >
                Siguiente
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default HistoricalDataTable;
