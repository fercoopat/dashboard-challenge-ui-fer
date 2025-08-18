import { useCallback, useState } from 'react';

import {
  AIR_QUERY_PARAM,
  DEFAULT_DATE_RANGE,
  INTERVALS,
  OPERATORS,
} from '@/modules/dashboard/constants/dashboard.constants';
import { FilterState } from '@/modules/dashboard/types/dashboard.types';

export const useAirQualityFilters = (onResetFilters?: () => void) => {
  const [filters, setFilters] = useState<FilterState>({
    dateRange: DEFAULT_DATE_RANGE,
    selectedParameter: AIR_QUERY_PARAM.CO,
    operator: OPERATORS.AVG,
    interval: INTERVALS.DAILY,
  });

  const updateDateRange = useCallback(
    (from: Date, to: Date) => {
      setFilters((prev) => ({ ...prev, dateRange: { from, to } }));
    },
    [setFilters]
  );

  const updateOperator = useCallback(
    (operator: OPERATORS) => {
      setFilters((prev) => ({ ...prev, operator }));
    },
    [setFilters]
  );

  const updateInterval = useCallback(
    (interval: INTERVALS) => {
      setFilters((prev) => ({ ...prev, interval }));
    },
    [setFilters]
  );

  const updateSelectedParameter = useCallback(
    (parameter: AIR_QUERY_PARAM) => {
      setFilters((prev) => ({ ...prev, selectedParameter: parameter }));
    },
    [setFilters]
  );

  const resetFilters = useCallback(() => {
    setFilters({
      dateRange: DEFAULT_DATE_RANGE,
      selectedParameter: AIR_QUERY_PARAM.CO,
      operator: OPERATORS.AVG,
      interval: INTERVALS.DAILY,
    });
    onResetFilters?.();
  }, [onResetFilters]);

  return {
    filters,
    updateDateRange,
    updateOperator,
    updateInterval,
    updateSelectedParameter,
    resetFilters,
    setFilters,
  };
};
