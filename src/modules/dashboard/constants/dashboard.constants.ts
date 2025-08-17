export enum AIR_QUERY_PARAM {
  CO = 'CO',
  PT08S1 = 'PT08S1',
  NMHC = 'NMHC',
  C6H6 = 'C6H6',
  PT08S2 = 'PT08S2',
  NOx = 'NOx',
  PT08S3 = 'PT08S3',
  NO2 = 'NO2',
  PT08S4 = 'PT08S4',
  PT08S5 = 'PT08S5',
  T = 'T',
  RH = 'RH',
  AH = 'AH',
}

export enum OPERATORS {
  AVG = 'avg',
  MIN = 'min',
  MAX = 'max',
}

export enum INTERVALS {
  DAILY = 'daily',
  MONTHLY = 'monthly',
  YEARLY = 'yearly',
}

export const VALUES_KEY_LABELS: Record<AIR_QUERY_PARAM, { label: string }> = {
  CO: { label: 'CO(GT)' },
  PT08S1: { label: 'PT08.S1(CO)' },
  NMHC: { label: 'NMHC(GT)' },
  C6H6: { label: 'C6H6(GT)' },
  PT08S2: { label: 'PT08.S2(NMHC)' },
  NOx: { label: 'NOx(GT)' },
  PT08S3: { label: 'PT08.S3(NOx)' },
  NO2: { label: 'NO2(GT)' },
  PT08S4: { label: 'PT08.S4(NO2)' },
  PT08S5: { label: 'PT08.S5(O3)' },
  T: { label: 'T' },
  RH: { label: 'RH' },
  AH: { label: 'AH' },
} as const;

export const DEFAULT_DATE_RANGE = {
  from: new Date(2004, 2, 1),
  to: new Date(2004, 4, 1),
} as const;
