import {
  AIR_QUERY_PARAM,
  INTERVALS,
  OPERATORS,
} from '../constants/dashboard.constants';

export interface AirQualityData {
  Date: string; // format "2004-03-10T23:00:00.000Z"
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
  _id?: string;
  createdAt?: string; // format "2004-03-10T23:00:00.000Z"
  updatedAt?: string; // format "2004-03-10T23:00:00.000Z"
  Time?: string; // format "18.00.00"
}

export type TimelineResponse<T extends AIR_QUERY_PARAM> = Array<
  {
    [K in T]: number;
  } & {
    count: number;
    interval: string; // "2004-03-10"
  }
>;
export type SummaryResponse = Record<AIR_QUERY_PARAM, number>;

export type RangeResponse = Array<AirQualityData>;

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
