import { ChevronDownIcon } from 'lucide-react';
import { memo, useCallback, useMemo, useState } from 'react';
import { ActiveModifiers, DateRange } from 'react-day-picker';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useToggle } from '@/hooks/use-toggle';
import { formatDate } from '@/lib/helpers/date.helpers';

const INITIAL_RANGE: DateRange = {
  from: new Date(2004, 2, 1),
  to: new Date(2004, 4, 1),
};

type Props = {
  value?: DateRange;
  onChange?: (range: DateRange) => void;
};
const DateRangeFilter = ({ value = INITIAL_RANGE, onChange }: Props) => {
  const [range, setRange] = useState<DateRange>(value);

  const { isOpen: isOpenFromPicker, onToggle: onToggleFromPicker } =
    useToggle();
  const { isOpen: isOpenToPicker, onToggle: onToggleToPicker } = useToggle();

  const { formattedFrom, formattedTo } = useMemo(
    () => ({
      formattedFrom: formatDate(range.from),
      formattedTo: formatDate(range.to),
    }),
    [range.from, range.to]
  );

  const handleUpdateRange = useCallback(
    (range: DateRange) => {
      setRange(range);
      onChange?.(range);
    },
    [onChange]
  );

  const handleChangeFrom = useCallback(
    (
      date: Date | undefined,
      _selectedDay: Date,
      _activeModifiers: ActiveModifiers,
      _e: React.MouseEvent
    ) => {
      handleUpdateRange({
        ...range,
        from: date,
      });
      onToggleFromPicker();
    },
    [handleUpdateRange, range, onToggleFromPicker]
  );

  const handleChangeTo = useCallback(
    (
      date: Date | undefined,
      _selectedDay: Date,
      _activeModifiers: ActiveModifiers,
      _e: React.MouseEvent
    ) => {
      handleUpdateRange({
        ...range,
        to: date,
      });
      onToggleToPicker();
    },
    [handleUpdateRange, range, onToggleToPicker]
  );

  return (
    <div className='flex flex-col gap-3'>
      <Label htmlFor='date' className='px-1'>
        Rango de fecha
      </Label>

      <div className='flex gap-2'>
        <Popover open={isOpenFromPicker} onOpenChange={onToggleFromPicker}>
          <PopoverTrigger asChild>
            <Button
              variant='outline'
              id='date'
              className='w-fit justify-between font-normal'
            >
              {formattedFrom}

              <ChevronDownIcon />
            </Button>
          </PopoverTrigger>

          <PopoverContent className='w-auto overflow-hidden p-0' align='start'>
            <Calendar
              mode='single'
              selected={range.from}
              captionLayout='dropdown'
              onSelect={handleChangeFrom}
            />
          </PopoverContent>
        </Popover>

        <Popover open={isOpenToPicker} onOpenChange={onToggleToPicker}>
          <PopoverTrigger asChild>
            <Button
              variant='outline'
              id='date'
              className='w-fit justify-between font-normal'
            >
              {formattedTo}

              <ChevronDownIcon />
            </Button>
          </PopoverTrigger>

          <PopoverContent className='w-auto overflow-hidden p-0' align='start'>
            <Calendar
              mode='single'
              selected={range.to}
              captionLayout='dropdown'
              onSelect={handleChangeTo}
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};
export default memo(DateRangeFilter);
