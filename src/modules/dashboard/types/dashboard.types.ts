import { AIR_QUERY_PARAM, OPERATORS, INTERVALS } from '../constants/dashboard.constants';

export interface AirQualityData {
  date: string;
  CO?: number;
  PT08S1?: number;
  NMHC?: number;
  C6H6?: number;
  PT08S2?: number;
  NOx?: number;
  PT08S3?: number;
  NO2?: number;
  PT08S4?: number;
  PT08S5?: number;
  T?: number;
  RH?: number;
  AH?: number;
}

export type AirQualityField = Exclude<
  {
    [K in keyof AirQualityData]: AirQualityData[K] extends number | undefined
      ? K
      : never;
  }[keyof AirQualityData],
  undefined
>;

export type TimelineResponse<T extends AirQualityField> = Array<
  {
    [K in T]: number;
  } & {
    count: number;
    interval: string; // "2004-03-10"
  }
>;
export type SummaryResponse = Record<AirQualityField, number>;

export interface RangeResponse {
  data: AirQualityData[];
}

export interface MetricCard {
  key: string;
  label: string;
  value: number;
  previousValue?: number;
  change: 'increase' | 'decrease' | 'none';
  operator: OPERATORS;
}

export interface ChartDataPoint {
  date: string;
  [key: string]: string | number;
}

export interface FilterState {
  dateRange: {
    from: Date;
    to: Date;
  };
  selectedParameters: AIR_QUERY_PARAM[];
  operator: OPERATORS;
  interval: INTERVALS;
}
