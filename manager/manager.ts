import axios, {
  AxiosResponse,
  InternalAxiosRequestConfig,
  AxiosError,
} from 'axios';

import {
  storage,
  getCacheNumber,
  getCacheString,
} from './storage';

interface CacheableAxiosResponse<T = any> extends AxiosResponse<T> {
  fromCache?: boolean;
}

export class DataManager {
  private static instance: DataManager;
  private axiosInstance = axios.create({
    baseURL: 'http://192.168.124.17:1888',
    timeout: 30000,
    headers: { 'Content-Type': 'application/json' }
  });
  // private readonly CACHE_VALID_TIME = 5 * 60 * 1000; // 5 min
  private readonly CACHE_VALID_TIME = 10 * 1000;
  private readonly CACHE_KEY = '@cached_data';
  private readonly CACHE_EXPIRY_KEY = '@cache_expiry';

  private timer: NodeJS.Timeout | null = null;

  constructor() {
    this.setupInterceptors();
    this.setupAutoRefresh();
  }

  /************* public function ****************/
  public static getInstance(): DataManager {
    if (!DataManager.instance) {
      DataManager.instance = new DataManager();
    }
    return DataManager.instance;
  }

  public clearCache() {
    console.log('clear cache');
    storage.clearAll();
  }

  public async getData() {
    return await this.fetchData();
  }

  /************* private function ****************/
  private setupInterceptors() {

    /// request interceptor
    this.axiosInstance.interceptors.request.use(
      async (config) => {

        const cachedData = this.getCachedData();
        const isExpired = this.isCacheExpired();
        // cache exist && cache is valid 
        if (cachedData && !isExpired) {
          // create a cancel token
          const source = axios.CancelToken.source();
          config.cancelToken = source.token;
          // cancel request
          source.cancel(JSON.stringify({ type: 'RESPONSE_CACHE', data: cachedData.data }));
        }

        return config;
      }
    );
    /// response interceptor
    this.axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => {
        /// cache response data
        this.updateCache(response.data);
        return response;
      },
      async (error: AxiosError) => {
        if (axios.isCancel(error) && error.message) {
          const cancelData = JSON.parse(error.message);
          if (cancelData.type === 'RESPONSE_CACHE') {
            const cacheResponse: CacheableAxiosResponse = {
              data: cancelData.data,
              status: 200,
              statusText: 'OK',
              headers: {},
              config: error.config as InternalAxiosRequestConfig,
              request: error.request,
              fromCache: true,
            };
            return Promise.resolve(cacheResponse);
          }
        }
        return Promise.reject(error);
      }
    );
  }

  private setupAutoRefresh() {

    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }

    const expiry = getCacheNumber(this.CACHE_EXPIRY_KEY);
    if (!expiry) return;

    // set timer with remaining time
    const now = Date.now();
    const remainingTime = expiry - now;

    if (remainingTime > 0) {
      this.timer = setTimeout(() => {
        this.fetchData();
      }, remainingTime);
    }
  }

  private async fetchData() {

    try {
      const response = await this.axiosInstance.get<any>('/api/booking');
      if ((response as CacheableAxiosResponse).fromCache) {
        console.log('Data request from cache: ', response);
        this.setupAutoRefresh();
        return;
      }
      console.log('Data request from network:', response);

    } catch (error) {
      console.error('Fetch failed:', error);
    }
  }

  private getCachedData() {
    const cachedData = getCacheString(this.CACHE_KEY);
    return cachedData ? JSON.parse(cachedData) : null;
  }

  private isCacheExpired() {
    const expiry = getCacheNumber(this.CACHE_EXPIRY_KEY);
    return !expiry || Date.now() > expiry;
  }

  private updateCache(data: any) {
    storage.set(this.CACHE_KEY, JSON.stringify(data));
    storage.set(this.CACHE_EXPIRY_KEY, Date.now() + this.CACHE_VALID_TIME);
    // reset timer
    if (this.timer) {
      clearTimeout(this.timer);
    }
    this.timer = setTimeout(() => {
      this.fetchData();
    }, this.CACHE_VALID_TIME);
  }
}
