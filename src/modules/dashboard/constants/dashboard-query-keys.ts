export const DASHBOARD_QUERY_KEYS = {
  SUMMARY: 'dashboard-summary',
  TIMELINE: 'dashboard-timeline',
  HISTORICAL: 'dashboard-historical',
} as const;

export const createDashboardQueryKeys = {
  summary: (dateFrom: Date | null, dateTo: Date | null, operator: string) => [
    DASHBOARD_QUERY_KEYS.SUMMARY,
    dateFrom,
    dateTo,
    operator,
  ],

  timeline: (
    parameter: string,
    dateFrom: Date | null,
    dateTo: Date | null,
    interval: string
  ) => [DASHBOARD_QUERY_KEYS.TIMELINE, parameter, dateFrom, dateTo, interval],

  historical: (dateFrom: Date | null, dateTo: Date | null) => [
    DASHBOARD_QUERY_KEYS.HISTORICAL,
    dateFrom,
    dateTo,
  ],
} as const;
