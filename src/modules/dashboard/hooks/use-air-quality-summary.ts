import { useQuery } from '@tanstack/react-query';

import { DASHBOARD_QUERY_KEYS } from '@/modules/dashboard/constants/dashboard-query-keys';
import { DashboardService } from '@/modules/dashboard/services/dashboard.service';
import { FilterState } from '@/modules/dashboard/types/dashboard.types';

export const useAirQualitySummary = (filters: FilterState) => {
  const summaryQuery = useQuery({
    queryKey: [
      DASHBOARD_QUERY_KEYS.SUMMARY,
      filters.dateRange.from,
      filters.dateRange.to,
      filters.operator,
    ],
    queryFn: () =>
      DashboardService.getSummary(
        filters.dateRange.from,
        filters.dateRange.to,
        filters.operator
      ),
    enabled: !!filters.dateRange.from && !!filters.dateRange.to,
    refetchInterval: 2 * 60 * 1000,
  });

  return summaryQuery;
};
