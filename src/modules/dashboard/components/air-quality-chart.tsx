import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
} from '@/components/ui/chart';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Brush,
} from 'recharts';
import {
  AIR_QUERY_PARAM,
  INTERVALS,
  VALUES_KEY_LABELS,
} from '../constants/dashboard.constants';
import type { ChartDataPoint } from '../types/dashboard.types';
import { ZoomOut } from 'lucide-react';

interface AirQualityChartProps {
  data: ChartDataPoint[];
  selectedParameters: AIR_QUERY_PARAM[];
  onParameterChange: (parameters: AIR_QUERY_PARAM[]) => void;
  interval: INTERVALS;
  onIntervalChange: (interval: INTERVALS) => void;
  isLoading?: boolean;
}

const AirQualityChart: React.FC<AirQualityChartProps> = ({
  data,
  selectedParameters,
  onParameterChange,
  interval,
  onIntervalChange,
  isLoading = false,
}) => {
  const [zoomDomain, setZoomDomain] = useState<{
    left: string;
    right: string;
  } | null>(null);

  const chartConfig = useMemo(() => {
    const colors = [
      '#3b82f6',
      '#ef4444',
      '#10b981',
      '#f59e0b',
      '#8b5cf6',
      '#ec4899',
      '#06b6d4',
      '#84cc16',
      '#f97316',
      '#6366f1',
      '#14b8a6',
      '#22c55e',
    ];

    const config: Record<string, { label: string; color: string }> = {};
    selectedParameters.forEach((param, index) => {
      config[param] = {
        label: VALUES_KEY_LABELS[param]?.label || param,
        color: colors[index % colors.length],
      };
    });

    return config;
  }, [selectedParameters]);

  const handleParameterToggle = (parameter: AIR_QUERY_PARAM) => {
    if (selectedParameters.includes(parameter)) {
      onParameterChange(selectedParameters.filter((p) => p !== parameter));
    } else {
      onParameterChange([...selectedParameters, parameter]);
    }
  };

  const handleZoomReset = () => {
    setZoomDomain(null);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleBrushChange = (domain: any) => {
    if (
      domain &&
      typeof domain.startIndex === 'number' &&
      typeof domain.endIndex === 'number' &&
      domain.startIndex !== domain.endIndex
    ) {
      setZoomDomain({
        left: data[domain.startIndex]?.date || '',
        right: data[domain.endIndex]?.date || '',
      });
    }
  };

  if (isLoading) {
    return (
      <Card className='w-full'>
        <CardHeader>
          <div className='h-6 bg-gray-200 rounded w-1/3 animate-pulse'></div>
        </CardHeader>
        <CardContent>
          <div className='h-80 bg-gray-200 rounded animate-pulse'></div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className='w-full'>
      <CardHeader>
        <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
          <div>
            <CardTitle className='text-xl font-semibold'>
              Línea de Tiempo - Calidad del Aire
            </CardTitle>
            <p className='text-sm text-muted-foreground mt-1'>
              Visualización de parámetros ambientales en el tiempo
            </p>
          </div>

          <div className='flex flex-col sm:flex-row gap-2'>
            <Select
              value={interval}
              onValueChange={(value) => onIntervalChange(value as INTERVALS)}
            >
              <SelectTrigger className='w-40'>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={INTERVALS.DAILY}>Diario</SelectItem>
                <SelectItem value={INTERVALS.MONTHLY}>Mensual</SelectItem>
                <SelectItem value={INTERVALS.YEARLY}>Anual</SelectItem>
              </SelectContent>
            </Select>

            {zoomDomain && (
              <Button
                variant='outline'
                size='sm'
                onClick={handleZoomReset}
                className='flex items-center gap-2'
              >
                <ZoomOut className='h-4 w-4' />
                Reset Zoom
              </Button>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className='space-y-4'>
          {/* Parameter Selection */}
          <div className='flex flex-wrap gap-2'>
            {Object.entries(VALUES_KEY_LABELS).map(([key, { label }]) => {
              const paramKey = key as AIR_QUERY_PARAM;
              return (
                <Button
                  key={key}
                  variant={
                    selectedParameters.includes(paramKey)
                      ? 'default'
                      : 'outline'
                  }
                  size='sm'
                  onClick={() => handleParameterToggle(paramKey)}
                  className='text-xs'
                  style={{
                    backgroundColor: selectedParameters.includes(paramKey)
                      ? chartConfig[paramKey]?.color
                      : undefined,
                    borderColor: chartConfig[paramKey]?.color,
                  }}
                >
                  {label}
                </Button>
              );
            })}
          </div>

          {/* Chart */}
          <div className='h-96 w-full'>
            <ChartContainer config={chartConfig}>
              <ResponsiveContainer width='100%' height='100%'>
                <LineChart
                  data={data}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray='3 3' stroke='#f0f0f0' />
                  <XAxis
                    dataKey='date'
                    stroke='#888888'
                    fontSize={12}
                    tickFormatter={(value) =>
                      new Date(value).toLocaleDateString()
                    }
                  />
                  <YAxis stroke='#888888' fontSize={12} />
                  <ChartTooltip
                    content={<ChartTooltipContent />}
                    labelFormatter={(value) =>
                      new Date(value).toLocaleDateString()
                    }
                  />

                  {selectedParameters.map((parameter) => (
                    <Line
                      key={parameter}
                      type='monotone'
                      dataKey={parameter}
                      stroke={chartConfig[parameter]?.color}
                      strokeWidth={2}
                      dot={{
                        fill: chartConfig[parameter]?.color,
                        strokeWidth: 2,
                        r: 4,
                      }}
                      activeDot={{
                        r: 6,
                        stroke: chartConfig[parameter]?.color,
                        strokeWidth: 2,
                      }}
                    />
                  ))}

                  <Brush
                    dataKey='date'
                    height={30}
                    stroke='#888888'
                    onChange={handleBrushChange}
                    tickFormatter={(value) =>
                      new Date(value).toLocaleDateString()
                    }
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>

          {/* Legend */}
          <ChartLegend
            payload={selectedParameters.map((param) => ({
              value: param,
              dataKey: param,
              color: chartConfig[param]?.color,
              name: chartConfig[param]?.label || param,
            }))}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default AirQualityChart;
