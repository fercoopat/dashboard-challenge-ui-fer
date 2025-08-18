import { useEffect, useMemo, useState } from 'react';

import {
  AIR_QUALITY_CHART_MAP,
  AIR_QUERY_PARAM,
  OPERATORS,
} from '@/modules/dashboard/constants/dashboard.constants';
import {
  ChartDataPoint,
  MetricCard,
  SummaryResponse,
  TimelineResponse,
} from '@/modules/dashboard/types/dashboard.types';

export const useAirQualityMetrics = (
  summaryData: SummaryResponse | undefined,
  timelineData: TimelineResponse<AIR_QUERY_PARAM> | undefined,
  selectedParameter: AIR_QUERY_PARAM,
  operator: OPERATORS
) => {
  const [previousMetrics, setPreviousMetrics] = useState<
    Record<string, number>
  >({});

  const metricCards = useMemo<MetricCard[]>(() => {
    if (!summaryData) return [];

    return Object.entries(summaryData).map(([key, value]) => {
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
        operator,
      };
    });
  }, [summaryData, operator, previousMetrics]);

  const chartData = useMemo<ChartDataPoint[]>(() => {
    if (!timelineData || !selectedParameter) return [];

    return timelineData.map((item) => ({
      date: item.interval,
      [selectedParameter]:
        typeof item[selectedParameter] === 'number'
          ? item[selectedParameter]
          : 0,
    }));
  }, [timelineData, selectedParameter]);

  useEffect(() => {
    if (summaryData) {
      const newMetrics: Record<string, number> = {};
      Object.entries(summaryData).forEach(([key, value]) => {
        newMetrics[key] = value;
      });
      setPreviousMetrics(newMetrics);
    }
  }, [summaryData]);

  return { metricCards, chartData };
};
