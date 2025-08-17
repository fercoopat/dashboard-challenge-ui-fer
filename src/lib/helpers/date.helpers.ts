import { format } from 'date-fns';
import { DateRange } from 'react-day-picker';

export const DATE_FORMATS = {
  DISPLAY: 'dd/MM/yyyy',
  DISPLAY_WITH_TIME: 'dd/MM/yyyy HH:mm',
  ISO: 'yyyy-MM-dd',
  API_DATE: 'yyyy-MM-dd',
  API_DATETIME: "yyyy-MM-dd'T'HH:mm:ss",
  SHORT: 'dd-MM',
  MONTH_YEAR: 'MMM yyyy',
  YEAR: 'yyyy',
} as const;

export type DateFormat = (typeof DATE_FORMATS)[keyof typeof DATE_FORMATS];

export const formatDate = (
  date: Date | undefined,
  dateFormat: DateFormat = 'dd/MM/yyyy'
): string => {
  if (!date) {
    return format(new Date(), dateFormat);
  }

  return format(date, dateFormat);
};

export const formatDateRange = (
  range: DateRange
): { from: string | undefined; to: string | undefined } => {
  return {
    from: range.from ? format(range.from, DATE_FORMATS.API_DATE) : undefined,
    to: range.to ? format(range.to, DATE_FORMATS.API_DATE) : undefined,
  };
};
