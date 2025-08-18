import { ZoomOut } from 'lucide-react';
import { useCallback, useMemo, useState } from 'react';
import { Brush, CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  AIR_QUALITY_CHART_MAP,
  AIR_QUERY_PARAM,
  INTERVALS,
} from '@/modules/dashboard/constants/dashboard.constants';
import { ChartDataPoint } from '@/modules/dashboard/types/dashboard.types';

interface BrushStartEndIndex {
  startIndex?: number;
  endIndex?: number;
}

const CHART_COLORS: Record<AIR_QUERY_PARAM, string> = {
  CO: '#3b82f6',
  PT08S1: '#ef4444',
  NMHC: '#10b981',
  C6H6: '#f59e0b',
  PT08S2: '#8b5cf6',
  NOx: '#ec4899',
  PT08S3: '#06b6d4',
  NO2: '#84cc16',
  PT08S4: '#f97316',
  PT08S5: '#6366f1',
  T: '#14b8a6',
  RH: '#22c55e',
  AH: '#14b8a6',
} as const;

interface Props {
  data: ChartDataPoint[] | undefined;
  interval: INTERVALS;
  isLoading?: boolean;
  selectedParameter: AIR_QUERY_PARAM;
  onIntervalChange: (interval: INTERVALS) => void;
  onParameterChange: (parameter: AIR_QUERY_PARAM) => void;
}

const AirQualityChart = ({
  data = [],
  interval,
  isLoading = false,
  selectedParameter,
  onIntervalChange,
  onParameterChange,
}: Props) => {
  const [zoomDomain, setZoomDomain] = useState<{
    left: string;
    right: string;
  } | null>(null);

  const chartConfig = useMemo((): ChartConfig => {
    return {
      [selectedParameter]: {
        label: AIR_QUALITY_CHART_MAP[selectedParameter]?.label,
        color: CHART_COLORS[selectedParameter],
      },
    };
  }, [selectedParameter]);

  const handleParameterChange = useCallback(
    (parameter: AIR_QUERY_PARAM) => () => {
      onParameterChange(parameter);
    },
    [onParameterChange]
  );

  const handleZoomReset = useCallback(() => {
    setZoomDomain(null);
  }, [setZoomDomain]);

  const handleIntervalChange = useCallback(
    (value: string) => {
      onIntervalChange(value as INTERVALS);
    },
    [onIntervalChange]
  );

  const handleBrushChange = (domain: BrushStartEndIndex) => {
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
      <Card className='w-full min-h-[530px] max-h-[600px]'>
        <CardHeader>
          <div className='h-full min-h-9 bg-gray-200 rounded w-1/3 animate-pulse'></div>
        </CardHeader>
        <CardContent>
          <div className='h-full min-h-100 bg-gray-200 rounded animate-pulse'></div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className='w-full max-h-[800px]'>
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
            <Select value={interval} onValueChange={handleIntervalChange}>
              <SelectTrigger className='w-40'>
                <SelectValue />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value={INTERVALS.DAILY}>Diario</SelectItem>

                <SelectItem value={INTERVALS.MONTHLY}>Mensual</SelectItem>

                <SelectItem value={INTERVALS.YEARLY}>Anual</SelectItem>
              </SelectContent>
            </Select>

            {!!zoomDomain && (
              <Button
                variant='outline'
                onClick={handleZoomReset}
                className='flex items-center gap-2'
              >
                <ZoomOut className='h-4 w-4' />
                Restablecer Zoom
              </Button>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className='overflow-hidden'>
        <div className='space-y-4 max-h-[600px] overflow-y-auto'>
          {/* Parameter Selection */}
          <div className='flex flex-wrap gap-2'>
            {Object.entries(AIR_QUALITY_CHART_MAP).map(([key, { label }]) => {
              const param = key as AIR_QUERY_PARAM;
              const isActive = param === selectedParameter;
              const color = CHART_COLORS[param];

              return (
                <Button
                  key={param}
                  variant={isActive ? 'default' : 'ghost'}
                  size='sm'
                  onClick={handleParameterChange(param)}
                  className='text-xs px-3 py-1 transition-colors duration-150'
                  style={{
                    backgroundColor: isActive ? color : undefined,
                    borderColor: color,
                    color: isActive ? '#fff' : color,
                  }}
                >
                  {label}
                </Button>
              );
            })}
          </div>

          {/* Chart */}
          <div className='relative w-full h-[400px] overflow-hidden border border-gray-200 rounded-lg'>
            <ChartContainer config={chartConfig} className='h-full w-full'>
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

                <Line
                  key={selectedParameter}
                  type='monotone'
                  dataKey={selectedParameter}
                  stroke={chartConfig?.[selectedParameter]?.color}
                  strokeWidth={2}
                  dot={{
                    fill: chartConfig?.[selectedParameter]?.color,
                    strokeWidth: 2,
                    r: 4,
                  }}
                  activeDot={{
                    r: 6,
                    stroke: chartConfig?.[selectedParameter]?.color,
                    strokeWidth: 2,
                  }}
                />

                <Brush
                  dataKey='date'
                  height={30}
                  stroke='#888888'
                  onChange={handleBrushChange}
                  tickFormatter={(value) =>
                    new Date(value).toLocaleDateString()
                  }
                />

                <ChartLegend
                  payload={[
                    {
                      value: selectedParameter,
                      dataKey: selectedParameter,
                      color: chartConfig?.[selectedParameter]?.color,
                    },
                  ]}
                />
              </LineChart>
            </ChartContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AirQualityChart;
