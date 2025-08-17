import { ApiClient } from '@/lib/api/api-client';
import { DASHBOARD_AIR_QUALITY_API_ENDPOINTS } from '@/modules/dashboard/constants/dashboard-endpoints';
import {
  AIR_QUERY_PARAM,
  INTERVALS,
  OPERATORS,
} from '@/modules/dashboard/constants/dashboard.constants';
import {
  RangeResponse,
  SummaryResponse,
  TimelineResponse,
} from '@/modules/dashboard/types/dashboard.types';

export class DashboardService {
  private static formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
  }

  static async getSummary(
    from: Date,
    to: Date,
    operator: OPERATORS
  ): Promise<SummaryResponse> {
    try {
      const response = await ApiClient.get(
        DASHBOARD_AIR_QUALITY_API_ENDPOINTS.SUMMARY,
        {
          params: {
            from: this.formatDate(from),
            to: this.formatDate(to),
            operator,
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error('Error fetching summary:', error);
      throw new Error(`Failed to fetch summary data: ${error}`);
    }
  }

  static async getTimeline(
    parameter: AIR_QUERY_PARAM,
    from: Date,
    to: Date,
    interval: INTERVALS = INTERVALS.DAILY
  ): Promise<TimelineResponse<typeof parameter>> {
    try {
      const response = await ApiClient.get(
        `${DASHBOARD_AIR_QUALITY_API_ENDPOINTS.TIMELINE}/${parameter}`,
        {
          params: {
            from: this.formatDate(from),
            to: this.formatDate(to),
            interval,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching timeline:', error);
      throw new Error(`Failed to fetch timeline data: ${error}`);
    }
  }

  static async getRangeData(from: Date, to: Date): Promise<RangeResponse> {
    try {
      const response = await ApiClient.get(
        DASHBOARD_AIR_QUALITY_API_ENDPOINTS.RANGE,
        {
          params: {
            from: this.formatDate(from),
            to: this.formatDate(to),
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching range data:', error);
      throw new Error(`Failed to fetch range data: ${error}`);
    }
  }
}
