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

// Parse date string to local date (handles timezone issues)
export const parseLocalDate = (dateString: string): Date => {
  const [year, month, day] = dateString.split('-').map(Number);
  // Create date in local timezone (month is 0-indexed in JavaScript)
  return new Date(year, month - 1, day);
};

// Format date to local date string (ensures no timezone shift)
export const formatLocalDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};
