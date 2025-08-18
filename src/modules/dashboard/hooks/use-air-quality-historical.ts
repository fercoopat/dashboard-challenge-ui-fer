import { useQuery } from '@tanstack/react-query';

import { DASHBOARD_QUERY_KEYS } from '@/modules/dashboard/constants/dashboard-query-keys';
import { DashboardService } from '@/modules/dashboard/services/dashboard.service';
import { FilterState } from '@/modules/dashboard/types/dashboard.types';

export const useAirQualityHistorical = (filters: FilterState) => {
  const historicalDataQuery = useQuery({
    queryKey: [
      DASHBOARD_QUERY_KEYS.HISTORICAL,
      filters.dateRange.from,
      filters.dateRange.to,
    ],
    queryFn: () =>
      DashboardService.getRangeData(
        filters.dateRange.from,
        filters.dateRange.to
      ),
    enabled: !!filters.dateRange.from && !!filters.dateRange.to,
  });

  return historicalDataQuery;
};
