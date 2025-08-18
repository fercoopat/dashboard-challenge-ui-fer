import { MetricCard } from '@/modules/dashboard/types/dashboard.types';
import { useEffect, useRef, useState } from 'react';

export const useMetricsWithChange = (metrics: MetricCard[] | undefined) => {
  const previousRef = useRef<Record<string, number>>({});
  const [computed, setComputed] = useState<MetricCard[]>([]);

  useEffect(() => {
    if (!metrics) return;

    const newMetrics = metrics.map((metric) => {
      const prev = previousRef.current[metric.key];

      let change: MetricCard['change'] = 'none';

      if (prev !== undefined) {
        if (metric.value > prev) change = 'increase';
        else if (metric.value < prev) change = 'decrease';
      }

      previousRef.current[metric.key] = metric.value;

      return {
        ...metric,
        previousValue: prev,
        change,
      };
    });

    setComputed(newMetrics);
  }, [metrics]);

  return computed;
};
