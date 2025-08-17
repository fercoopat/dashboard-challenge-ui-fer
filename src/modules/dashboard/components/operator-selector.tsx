import { Calculator, Minus, TrendingDown, TrendingUp } from 'lucide-react';
import { memo, useMemo } from 'react';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { OPERATORS } from '@/modules/dashboard/constants/dashboard.constants';

const getOperatorInfo = (operator: OPERATORS) => {
  switch (operator) {
    case OPERATORS.AVG:
      return {
        label: 'Promedio',
        description: 'Valor medio de los parámetros',
        icon: Minus,
        color: 'bg-blue-100 text-blue-800 border-blue-200',
      };
    case OPERATORS.MIN:
      return {
        label: 'Mínimo',
        description: 'Valor más bajo registrado',
        icon: TrendingDown,
        color: 'bg-green-100 text-green-800 border-green-200',
      };
    case OPERATORS.MAX:
      return {
        label: 'Máximo',
        description: 'Valor más alto registrado',
        icon: TrendingUp,
        color: 'bg-red-100 text-red-800 border-red-200',
      };
  }
};

interface Props {
  selectedOperator: OPERATORS;
  onOperatorChange: (operator: OPERATORS) => void;
  isLoading?: boolean;
}

const OperatorSelector = ({
  selectedOperator,
  onOperatorChange,
  isLoading = false,
}: Props) => {
  const currentOperatorInfo = useMemo(
    () => getOperatorInfo(selectedOperator),
    [selectedOperator]
  );

  if (isLoading) {
    return (
      <Card className='w-full'>
        <CardHeader>
          <div className='h-6 bg-gray-200 rounded w-1/3 animate-pulse'></div>
        </CardHeader>
        <CardContent>
          <div className='h-20 bg-gray-200 rounded animate-pulse'></div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className='w-full'>
      <CardHeader>
        <CardTitle className='text-lg font-semibold flex items-center gap-2'>
          <Calculator className='h-5 w-5' />
          Operador de Resumen
        </CardTitle>
      </CardHeader>

      <CardContent className='space-y-4'>
        <div className='flex items-center gap-3'>
          <Select
            value={selectedOperator}
            onValueChange={(value) => onOperatorChange(value as OPERATORS)}
          >
            <SelectTrigger className='w-40'>
              <SelectValue />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value={OPERATORS.AVG}>
                <div className='flex items-center gap-2'>
                  <Minus className='h-4 w-4' />
                  Promedio
                </div>
              </SelectItem>

              <SelectItem value={OPERATORS.MIN}>
                <div className='flex items-center gap-2'>
                  <TrendingDown className='h-4 w-4' />
                  Mínimo
                </div>
              </SelectItem>

              <SelectItem value={OPERATORS.MAX}>
                <div className='flex items-center gap-2'>
                  <TrendingUp className='h-4 w-4' />
                  Máximo
                </div>
              </SelectItem>
            </SelectContent>
          </Select>

          <Badge variant='outline' className={currentOperatorInfo.color}>
            {currentOperatorInfo.label}
          </Badge>
        </div>

        <div className='flex items-start gap-2 p-3 bg-muted/50 rounded-lg'>
          <currentOperatorInfo.icon className='h-4 w-4 mt-0.5 text-muted-foreground' />

          <p className='text-sm text-muted-foreground'>
            {currentOperatorInfo.description}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default memo(OperatorSelector);
