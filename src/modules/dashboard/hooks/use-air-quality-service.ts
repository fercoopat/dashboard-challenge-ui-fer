import { useMemo } from 'react';

import { useAirQualityFilters } from '@/modules/dashboard/hooks/use-air-quality-filters';
import { useAirQualityHistorical } from '@/modules/dashboard/hooks/use-air-quality-historical';
import { useAirQualityMetrics } from '@/modules/dashboard/hooks/use-air-quality-metrics';
import { useAirQualitySummary } from '@/modules/dashboard/hooks/use-air-quality-summary';
import { useAirQualityTimeline } from '@/modules/dashboard/hooks/use-air-quality-timeline';

export const useAirQualityService = (onResetFilters?: () => void) => {
  const {
    filters,
    updateDateRange,
    updateOperator,
    updateInterval,
    updateSelectedParameter,
    resetFilters,
  } = useAirQualityFilters(onResetFilters);

  const summaryQuery = useAirQualitySummary(filters);

  const timelineQuery = useAirQualityTimeline(filters);

  const historicalDataQuery = useAirQualityHistorical(filters);

  const { chartData, metricCards } = useAirQualityMetrics(
    summaryQuery.data,
    timelineQuery.data,
    filters.selectedParameter,
    filters.operator
  );

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

  const {
    isRefetchingSummaryQuery,
    isRefetchingTimelineQuery,
    isRefetchingHistoricalDataQuery,
  } = useMemo(
    () => ({
      isRefetchingSummaryQuery: summaryQuery.isRefetching,
      isRefetchingTimelineQuery: timelineQuery.isRefetching,
      isRefetchingHistoricalDataQuery: historicalDataQuery.isRefetching,
    }),
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
    isRefetchingSummaryQuery,
    isRefetchingTimelineQuery,
    isRefetchingHistoricalDataQuery,

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
