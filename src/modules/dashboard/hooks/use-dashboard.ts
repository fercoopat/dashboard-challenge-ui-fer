import { useQuery } from '@tanstack/react-query';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { createDashboardQueryKeys } from '@/modules/dashboard/constants/dashboard-query-keys';
import {
  AIR_QUERY_PARAM,
  DEFAULT_DATE_RANGE,
  INTERVALS,
  OPERATORS,
  VALUES_KEY_LABELS,
} from '@/modules/dashboard/constants/dashboard.constants';
import { DashboardService } from '@/modules/dashboard/services/dashboard.service';
import {
  AirQualityField,
  ChartDataPoint,
  FilterState,
  MetricCard,
} from '@/modules/dashboard/types/dashboard.types';

export const useDashboard = () => {
  const [filters, setFilters] = useState<FilterState>({
    dateRange: DEFAULT_DATE_RANGE,
    selectedParameters: [
      AIR_QUERY_PARAM.CO,
      AIR_QUERY_PARAM.NO2,
      AIR_QUERY_PARAM.T,
      AIR_QUERY_PARAM.RH,
    ],
    operator: OPERATORS.AVG,
    interval: INTERVALS.DAILY,
  });

  const [previousMetrics, setPreviousMetrics] = useState<
    Record<string, number>
  >({});

  const summaryQuery = useQuery({
    queryKey: createDashboardQueryKeys.summary(
      filters.dateRange.from,
      filters.dateRange.to,
      filters.operator
    ),
    queryFn: () =>
      DashboardService.getSummary(
        filters.dateRange.from,
        filters.dateRange.to,
        filters.operator
      ),
    enabled: !!filters.dateRange.from && !!filters.dateRange.to,
    refetchInterval: 100000,
  });

  const timelineQuery = useQuery({
    queryKey: createDashboardQueryKeys.timeline(
      filters.selectedParameters[0] || AIR_QUERY_PARAM.CO,
      filters.dateRange.from,
      filters.dateRange.to,
      filters.interval
    ),
    queryFn: () =>
      DashboardService.getTimeline(
        filters.selectedParameters[0] || AIR_QUERY_PARAM.CO,
        filters.dateRange.from,
        filters.dateRange.to,
        filters.interval
      ),
    enabled:
      !!filters.dateRange.from &&
      !!filters.dateRange.to &&
      filters.selectedParameters.length > 0,
  });

  const historicalDataQuery = useQuery({
    queryKey: createDashboardQueryKeys.historical(
      filters.dateRange.from,
      filters.dateRange.to
    ),
    queryFn: () =>
      DashboardService.getHistoricalData(
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
        label: VALUES_KEY_LABELS[key as AirQualityField]?.label || key,
        value: currentValue,
        previousValue,
        change,
        operator: filters.operator,
      };
    });
  }, [summaryQuery.data, filters.operator, previousMetrics]);

  // Transform timeline data for chart
  const chartData = useMemo((): ChartDataPoint[] => {
    if (!timelineQuery.data || !filters.selectedParameters[0]) return [];

    const selectedParam = filters.selectedParameters[0];
    return timelineQuery.data.map((item) => ({
      date: item.interval,
      [selectedParam]: item[selectedParam] || 0,
    }));
  }, [timelineQuery.data, filters.selectedParameters]);

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

  const updateSelectedParameters = useCallback(
    (parameters: AIR_QUERY_PARAM[]) => {
      setFilters((prev) => ({
        ...prev,
        selectedParameters: parameters,
      }));
    },
    []
  );

  const resetFilters = useCallback(() => {
    setFilters({
      dateRange: DEFAULT_DATE_RANGE,
      selectedParameters: [
        AIR_QUERY_PARAM.CO,
        AIR_QUERY_PARAM.NO2,
        AIR_QUERY_PARAM.T,
        AIR_QUERY_PARAM.RH,
      ],
      operator: OPERATORS.AVG,
      interval: INTERVALS.DAILY,
    });
  }, []);

  // Error handling
  const hasError =
    summaryQuery.error || timelineQuery.error || historicalDataQuery.error;
  const errorMessage =
    summaryQuery.error?.message ||
    timelineQuery.error?.message ||
    historicalDataQuery.error?.message;

  // Loading states
  const isLoading =
    summaryQuery.isLoading ||
    timelineQuery.isLoading ||
    historicalDataQuery.isLoading;
  const isRefetching =
    summaryQuery.isRefetching ||
    timelineQuery.isRefetching ||
    historicalDataQuery.isRefetching;

  return {
    // Data
    metricCards,
    chartData,
    historicalData: historicalDataQuery.data || [],
    selectedParameter: filters.selectedParameters[0],

    // State
    filters,

    // Loading states
    isLoading,
    isRefetching,

    // Error handling
    hasError,
    errorMessage,

    // Handlers
    updateDateRange,
    updateOperator,
    updateInterval,
    updateSelectedParameters,
    resetFilters,

    // Query refetch functions
    refetchSummary: summaryQuery.refetch,
    refetchTimeline: timelineQuery.refetch,
    refetchHistorical: historicalDataQuery.refetch,
  };
};
