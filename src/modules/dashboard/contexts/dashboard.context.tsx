import { QueryObserverResult, RefetchOptions } from '@tanstack/react-query';
import { createContext, use, useMemo } from 'react';
import { DateRange } from 'react-day-picker';

import {
  AIR_QUERY_PARAM,
  INTERVALS,
  OPERATORS,
} from '@/modules/dashboard/constants/dashboard.constants';
import { useAirQualityService } from '@/modules/dashboard/hooks/use-air-quality-service';
import { useRangeFilter } from '@/modules/dashboard/hooks/use-range-filter';
import {
  ChartDataPoint,
  FilterState,
  MetricCard,
  RangeResponse,
  SummaryResponse,
  TimelineResponse,
} from '@/modules/dashboard/types/dashboard.types';

type DashboardContextValue = {
  // range filters values
  rangeValues: DateRange;
  handleRangeChange: (range: DateRange) => void;
  clearRangeParams: () => void;
  // air quality service values
  metricCards: MetricCard[];
  chartData: ChartDataPoint[];
  historicalData: RangeResponse;
  selectedParameter: AIR_QUERY_PARAM;
  filters: FilterState;
  isLoadingSummaryQuery: boolean;
  isLoadingTimelineQuery: boolean;
  isLoadingHistoricalDataQuery: boolean;
  isRefetching: boolean;
  error: Error | null;
  errorMessage: string | undefined;
  updateDateRange: (from: Date, to: Date) => void;
  updateOperator: (operator: OPERATORS) => void;
  updateInterval: (interval: INTERVALS) => void;
  updateSelectedParameter: (parameter: AIR_QUERY_PARAM) => void;
  resetFilters: () => void;
  refetchSummary: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<SummaryResponse, Error>>;
  refetchTimeline: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<TimelineResponse<AIR_QUERY_PARAM>, Error>>;
  refetchHistorical: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<RangeResponse, Error>>;
};

const DashboardContext = createContext<DashboardContextValue | undefined>(
  undefined
);

export const DashboardProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { rangeValues, handleRangeChange, clearRangeParams } = useRangeFilter();

  const dashboardValues = useAirQualityService(clearRangeParams);

  const value = useMemo(
    () => ({
      ...dashboardValues,
      rangeValues,
      handleRangeChange,
      clearRangeParams,
    }),
    [dashboardValues, rangeValues, handleRangeChange, clearRangeParams]
  );

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => {
  const context = use(DashboardContext);

  if (!context) {
    throw new Error(
      'useDashboard hook must be used inside DashboardProvider component!'
    );
  }

  return context;
};
