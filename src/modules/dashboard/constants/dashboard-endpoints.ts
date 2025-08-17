const BASE_PATH = '/air-quality' as const;

export const DASHBOARD_AIR_QUALITY_API_ENDPOINTS = {
  BASE_PATH,

  RANGE: `${BASE_PATH}/range`,

  SUMMARY: `${BASE_PATH}/summary`,

  TIMELINE: `${BASE_PATH}/timeline`,
} as const;
