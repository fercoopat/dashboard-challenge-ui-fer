import { useQuery } from '@tanstack/react-query';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { DASHBOARD_QUERY_KEYS } from '@/modules/dashboard/constants/dashboard-query-keys';
import {
  AIR_QUALITY_CHART_MAP,
  AIR_QUERY_PARAM,
  DEFAULT_DATE_RANGE,
  INTERVALS,
  OPERATORS,
} from '@/modules/dashboard/constants/dashboard.constants';
import { DashboardService } from '@/modules/dashboard/services/dashboard.service';
import {
  ChartDataPoint,
  FilterState,
  MetricCard,
} from '@/modules/dashboard/types/dashboard.types';

export const useAirQualityService = (onResetFilters?: () => void) => {
  const [filters, setFilters] = useState<FilterState>({
    dateRange: DEFAULT_DATE_RANGE,
    selectedParameter: AIR_QUERY_PARAM.CO,
    operator: OPERATORS.AVG,
    interval: INTERVALS.DAILY,
  });

  const [previousMetrics, setPreviousMetrics] = useState<
    Record<string, number>
  >({});

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
    refetchInterval: 2 * 60 * 1000, // 2 minutes in milliseconds
  });

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

  // Transform summary data to metric cards
  const metricCards = useMemo((): MetricCard[] => {
    if (!summaryQuery.data) return [];

    return Object.entries(summaryQuery.data).map(([key, value]) => {
      const currentValue = value;
      const previousValue = previousMetrics[key];

      let change: 'increase' | 'decrease' | 'none' = 'none';
      if (previousValue !== undefined && currentValue !== undefined) {
        if (currentValue > previousValue) change = 'increase';
        else if (currentValue < previousValue) change = 'decrease';
      }

      return {
        key,
        label: AIR_QUALITY_CHART_MAP[key as AIR_QUERY_PARAM]?.label || key,
        value: currentValue,
        previousValue,
        change,
        operator: filters.operator,
      };
    });
  }, [summaryQuery.data, filters.operator, previousMetrics]);

  // Transform timeline data for chart
  const chartData = useMemo((): ChartDataPoint[] => {
    if (!timelineQuery.data || !filters.selectedParameter) return [];

    const selectedParam = filters.selectedParameter;

    return timelineQuery.data.map((item) => ({
      date: item.interval,
      [selectedParam]:
        typeof item[selectedParam] === 'number' ? item[selectedParam] : 0,
    }));
  }, [timelineQuery.data, filters.selectedParameter]);

  // Update previous metrics when new data arrives
  useEffect(() => {
    if (summaryQuery.data) {
      const newMetrics: Record<string, number> = {};
      Object.entries(summaryQuery.data).forEach(([key, value]) => {
        newMetrics[key] = value;
      });
      setPreviousMetrics(newMetrics);
    }
  }, [summaryQuery.data]);

  // Handlers
  const updateDateRange = useCallback((from: Date, to: Date) => {
    setFilters((prev) => ({
      ...prev,
      dateRange: { from, to },
    }));
  }, []);

  const updateOperator = useCallback((operator: OPERATORS) => {
    setFilters((prev) => ({
      ...prev,
      operator,
    }));
  }, []);

  const updateInterval = useCallback((interval: INTERVALS) => {
    setFilters((prev) => ({
      ...prev,
      interval,
    }));
  }, []);

  const updateSelectedParameter = useCallback((parameter: AIR_QUERY_PARAM) => {
    setFilters((prev) => ({
      ...prev,
      selectedParameter: parameter,
    }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters({
      dateRange: DEFAULT_DATE_RANGE,
      selectedParameter: AIR_QUERY_PARAM.CO,
      operator: OPERATORS.AVG,
      interval: INTERVALS.DAILY,
    });

    // Reset previous metrics to clear change indicators
    setPreviousMetrics({});

    // Call the callback to clear URL search parameters
    onResetFilters?.();
  }, [onResetFilters]);

  // Error handling
  const error = useMemo(
    () =>
      summaryQuery.error || timelineQuery.error || historicalDataQuery.error,
    [summaryQuery.error, timelineQuery.error, historicalDataQuery.error]
  );

  const errorMessage = useMemo(
    () =>
      summaryQuery.error?.message ||
      timelineQuery.error?.message ||
      historicalDataQuery.error?.message,
    [
      summaryQuery.error?.message,
      timelineQuery.error?.message,
      historicalDataQuery.error?.message,
    ]
  );

  // Loading states
  const {
    isLoadingSummaryQuery,
    isLoadingTimelineQuery,
    isLoadingHistoricalDataQuery,
  } = useMemo(
    () => ({
      isLoadingSummaryQuery: summaryQuery.isLoading,
      isLoadingTimelineQuery: timelineQuery.isLoading,
      isLoadingHistoricalDataQuery: historicalDataQuery.isLoading,
    }),
    [
      summaryQuery.isLoading,
      timelineQuery.isLoading,
      historicalDataQuery.isLoading,
    ]
  );

  const isRefetching = useMemo(
    () =>
      summaryQuery.isRefetching ||
      timelineQuery.isRefetching ||
      historicalDataQuery.isRefetching,
    [
      summaryQuery.isRefetching,
      timelineQuery.isRefetching,
      historicalDataQuery.isRefetching,
    ]
  );

  return {
    // Data
    metricCards,
    chartData,
    historicalData: historicalDataQuery.data || [],
    selectedParameter: filters.selectedParameter,

    // State
    filters,

    // Loading states
    isLoadingSummaryQuery,
    isLoadingTimelineQuery,
    isLoadingHistoricalDataQuery,
    isRefetching,

    // Error handling
    error,
    errorMessage,

    // Handlers
    updateDateRange,
    updateOperator,
    updateInterval,
    updateSelectedParameter,
    resetFilters,

    // Query refetch functions
    refetchSummary: summaryQuery.refetch,
    refetchTimeline: timelineQuery.refetch,
    refetchHistorical: historicalDataQuery.refetch,
  };
};
