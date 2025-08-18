import { useCallback, useMemo } from 'react';

import { useSocketQuery } from '@/hooks/use-socket-query';
import { DASHBOARD_QUERY_KEYS } from '@/modules/dashboard/constants/dashboard-query-keys';
import { DashboardService } from '@/modules/dashboard/services/dashboard.service';
import { FilterState } from '@/modules/dashboard/types/dashboard.types';

export const useAirQualitySummary = (filters: FilterState) => {
  const joinPayload = useMemo(
    () => ({
      from: filters.dateRange.from,
      to: filters.dateRange.to,
      operator: filters.operator,
    }),
    [filters.dateRange.from, filters.dateRange.to, filters.operator]
  );

  const queryKey = useMemo(
    () => [
      DASHBOARD_QUERY_KEYS.SUMMARY,
      filters.dateRange.from,
      filters.dateRange.to,
      filters.operator,
    ],
    [filters.dateRange.from, filters.dateRange.to, filters.operator]
  );

  const queryFn = useCallback(
    () =>
      DashboardService.getSummary(
        filters.dateRange.from,
        filters.dateRange.to,
        filters.operator
      ),
    [filters.dateRange.from, filters.dateRange.to, filters.operator]
  );

  return useSocketQuery({
    queryKey,
    queryFn,
    socketEvent: 'air-quality-summary',
    socketJoinEvent: 'joinSummary',
    socketLeaveEvent: 'leaveSummary',
    joinPayload,
  });
};
