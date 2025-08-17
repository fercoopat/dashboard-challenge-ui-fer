import { Minus, TrendingDown, TrendingUp } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { MetricCard } from '@/modules/dashboard/types/dashboard.types';

const getChangeIcon = (change: MetricCard['change']) => {
  switch (change) {
    case 'increase':
      return <TrendingUp className='h-4 w-4 text-green-500' />;
    case 'decrease':
      return <TrendingDown className='h-4 w-4 text-red-500' />;
    default:
      return <Minus className='h-4 w-4 text-gray-400' />;
  }
};

const getChangeColor = (change: MetricCard['change']) => {
  switch (change) {
    case 'increase':
      return 'text-green-600 bg-green-50 border-green-200';
    case 'decrease':
      return 'text-red-600 bg-red-50 border-red-200';
    default:
      return 'text-gray-600 bg-gray-50 border-gray-200';
  }
};

interface Props {
  metrics: MetricCard[] | undefined;
  isLoading?: boolean;
}

const MetricCards = ({ metrics = [], isLoading }: Props) => {
  if (isLoading) {
    return (
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
        {Array.from({ length: 8 }).map((_, index) => (
          <Card key={index} className='animate-pulse'>
            <CardHeader className='pb-2'>
              <div className='h-4 bg-gray-200 rounded w-3/4'></div>
            </CardHeader>
            <CardContent>
              <div className='h-8 bg-gray-200 rounded w-1/2 mb-2'></div>
              <div className='h-3 bg-gray-200 rounded w-1/4'></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
      {metrics?.map((metric) => (
        <Card key={metric.key} className='hover:shadow-lg transition-shadow'>
          <CardHeader className='pb-2'>
            <div className='flex items-center justify-between'>
              <CardTitle className='text-sm font-medium text-muted-foreground'>
                {metric.label}
              </CardTitle>
              <Badge variant='outline' className='text-xs'>
                {metric.operator.toUpperCase()}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className='flex items-center justify-between'>
              <div className='space-y-1'>
                <p className='text-2xl font-bold'>{metric.value.toFixed(2)}</p>
                {metric.previousValue !== undefined && (
                  <div className='flex items-center gap-1'>
                    {getChangeIcon(metric.change)}
                    <span
                      className={cn(
                        'text-xs font-medium',
                        getChangeColor(metric.change)
                      )}
                    >
                      {metric.change === 'increase' ? '+' : ''}
                      {(
                        ((metric.value - metric.previousValue) /
                          metric.previousValue) *
                        100
                      ).toFixed(1)}
                      %
                    </span>
                  </div>
                )}
              </div>
              <div className='flex items-center gap-2'>
                {getChangeIcon(metric.change)}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default MetricCards;
