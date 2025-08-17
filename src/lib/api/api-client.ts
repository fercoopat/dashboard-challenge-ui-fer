import apiInstance from '@/lib/api/api-instance';
import type { ApiConfig } from '@/lib/api/api.types';

export abstract class ApiClient<T, PostT = Partial<T>, PatchT = Partial<T>> {
  constructor(basePath: string) {
    this.basePath = basePath;
  }

  private readonly basePath: string;

  protected getPath(path: string = ''): string {
    return `${this.basePath}${path}`;
  }

  protected get(path: string, config?: ApiConfig) {
    return apiInstance.get(path, config);
  }

  protected post(path: string, data?: PostT, config?: ApiConfig) {
    return apiInstance.post(path, data, config);
  }

  protected patch(path: string, data?: PatchT, config?: ApiConfig) {
    return apiInstance.patch(path, data, config);
  }

  protected delete(path: string, config?: ApiConfig) {
    return apiInstance.delete(path, config);
  }
}
