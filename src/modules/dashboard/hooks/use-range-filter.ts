import { useCallback, useMemo } from 'react';
import { DateRange } from 'react-day-picker';
import { useSearchParams } from 'react-router';

import { formatDateRange } from '@/lib/helpers/date.helpers';
import { DASHBOARD_FILTER_KEYS } from '@/modules/dashboard/constants/dashboard-filter.keys';
import { DEFAULT_DATE_RANGE } from '@/modules/dashboard/constants/dashboard.constants';

export const useRangeFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const rangeValues = useMemo(() => {
    const from = searchParams.get(DASHBOARD_FILTER_KEYS.FROM_DATE_RANGE);
    const to = searchParams.get(DASHBOARD_FILTER_KEYS.TO_DATE_RANGE);

    return {
      from: from ? new Date(from) : DEFAULT_DATE_RANGE.from,
      to: to ? new Date(to) : DEFAULT_DATE_RANGE.to,
    };
  }, [searchParams]);

  const handleRangeChange = useCallback(
    (range: DateRange) => {
      const { from, to } = formatDateRange(range);
      if (!from || !to) return;

      searchParams.set(DASHBOARD_FILTER_KEYS.FROM_DATE_RANGE, from);
      searchParams.set(DASHBOARD_FILTER_KEYS.TO_DATE_RANGE, to);

      setSearchParams(searchParams);
    },
    [setSearchParams, searchParams]
  );

  return {
    rangeValues,
    handleRangeChange,
  };
};
