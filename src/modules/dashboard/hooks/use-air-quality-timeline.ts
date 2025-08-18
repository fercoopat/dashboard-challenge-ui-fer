import { useQuery } from '@tanstack/react-query';

import { DASHBOARD_QUERY_KEYS } from '@/modules/dashboard/constants/dashboard-query-keys';
import { DashboardService } from '@/modules/dashboard/services/dashboard.service';
import { FilterState } from '@/modules/dashboard/types/dashboard.types';

export const useAirQualityTimeline = (filters: FilterState) => {
  const timelineQuery = useQuery({
    queryKey: [
      DASHBOARD_QUERY_KEYS.TIMELINE,
      filters.selectedParameter,
      filters.dateRange.from,
      filters.dateRange.to,
      filters.interval,
    ],
    queryFn: () =>
      DashboardService.getTimeline(
        filters.selectedParameter,
        filters.dateRange.from,
        filters.dateRange.to,
        filters.interval
      ),
    enabled:
      !!filters.dateRange.from &&
      !!filters.dateRange.to &&
      filters.selectedParameter.length > 0,
  });

  return timelineQuery;
};
