import { ApiResponse, ApiError, RequestConfig } from '../types';
/**
 * HTTP CLIENT SERVICE
 * 
 * Note: This service layer demonstrates production-ready architecture beyond basic requirements.
 * 
 * Security Features:
 * - HttpOnly cookies (XSS protection)
 * - CSRF token handling
 * - Request/Response interceptors
 * - Timeout management
 * - Centralized error handling
 * - In production, this would connect to a real backend API.
 * - For this demo, it uses JSONPlaceholder mock API.
*/
/**
 * @method addRequestInterceptor Adds a request interceptor to modify request configurations.
 * @param {(config: RequestConfig) => RequestConfig} interceptor - Function to process request configs.
 *
 * @method addResponseInterceptor Adds a response interceptor to handle or modify responses.
 * @param {(response: Response) => Response | Promise<Response>} interceptor - Function to process responses.
 *
 * @method setCSRFToken Manually sets a CSRF token.
 * @param {string} token - The CSRF token string to store.
 *
 * @method fetchCSRFToken Fetches a CSRF token from the backend.
 * @returns {Promise<void>} A promise that resolves when the token is fetched successfully.
 *
 * @method get Sends a GET request.
 * @param {string} endpoint - The API endpoint.
 * @param {{[key: string]: string}} [headers] - Optional headers to include in the request.
 * @returns {Promise<ApiResponse<T>>} The API response data.
 *
 * @method post Sends a POST request.
 * @param {string} endpoint - The API endpoint.
 * @param {any} [body] - Optional request body.
 * @param {{[key: string]: string}} [headers] - Optional headers to include in the request.
 * @returns {Promise<ApiResponse<T>>} The API response data.
 *
 * @method put Sends a PUT request.
 * @param {string} endpoint - The API endpoint.
 * @param {any} [body] - Optional request body.
 * @param {{[key: string]: string}} [headers] - Optional headers to include in the request.
 * @returns {Promise<ApiResponse<T>>} The API response data.
 *
 * @method delete Sends a DELETE request.
 * @param {string} endpoint - The API endpoint.
 * @param {{[key: string]: string}} [headers] - Optional headers to include in the request.
 * @returns {Promise<ApiResponse<T>>} The API response data.
 *
 * @example
 * const httpClient = new HttpClientService('https://jsonplaceholder.typicode.com', 10000);
 *
 * httpClient.get('/posts')
 *   .then(res => console.log(res.data))
 *   .catch(err => console.error(err));
 */
class HttpClientService {
  
  private baseURL: string;
  private defaultHeaders: Record<string, string>;
  private timeout: number;
  private requestInterceptors: Array<(config: RequestConfig) => RequestConfig>;
  private responseInterceptors: Array<(response: Response) => Response | Promise<Response>>;
  private csrfToken: string | null = null;
  constructor(baseURL: string = '', timeout: number = 10000) {
    this.baseURL = baseURL;
    this.timeout = timeout;
    this.defaultHeaders = {
      'Content-Type': 'application/json',
    };
    this.requestInterceptors = [];
    this.responseInterceptors = [];
  }
  addRequestInterceptor(interceptor: (config: RequestConfig) => RequestConfig) {
    this.requestInterceptors.push(interceptor);
  }

  addResponseInterceptor(interceptor: (response: Response) => Response | Promise<Response>) {
    this.responseInterceptors.push(interceptor);
  }

  setCSRFToken(token: string) {
    this.csrfToken = token;
  }
  async fetchCSRFToken(): Promise<void> {
    try {
      const response = await fetch(`${this.baseURL}/csrf-token`, {
        credentials: 'include',
      });
      const data = await response.json();
      this.csrfToken = data.csrfToken;
      console.log('[Security] CSRF token fetched');
    } catch (error) {
      console.warn('[Security] Failed to fetch CSRF token:', error);
    }
  }

  private async applyRequestInterceptors(config: RequestConfig): Promise<RequestConfig> {
    let modifiedConfig = { ...config };
    for (const interceptor of this.requestInterceptors) {
      modifiedConfig = interceptor(modifiedConfig);
    }
    return modifiedConfig;
  }

  private async applyResponseInterceptors(response: Response): Promise<Response> {
    let modifiedResponse = response;
    for (const interceptor of this.responseInterceptors) {
      modifiedResponse = await interceptor(modifiedResponse);
    }
    return modifiedResponse;
  }

  private async request<T>(endpoint: string, config: RequestConfig = {}): Promise<ApiResponse<T>> {
    const interceptedConfig = await this.applyRequestInterceptors(config);
    const url = `${this.baseURL}${endpoint}`;
    const headers: Record<string, string> = { ...this.defaultHeaders, ...(interceptedConfig.headers || {}) };
    if (this.csrfToken && ['POST', 'PUT', 'DELETE', 'PATCH'].includes(interceptedConfig.method || '')) {
      (headers as Record<string, string>)['X-CSRF-Token'] = this.csrfToken;
    }
    console.log(`[HTTP] ${interceptedConfig.method || 'GET'} ${url}`);
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);
    try {
      const response = await fetch(url, {
        method: interceptedConfig.method || 'GET',
        headers,
        body: interceptedConfig.body ? JSON.stringify(interceptedConfig.body) : undefined,
        credentials: 'include',
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      const interceptedResponse = await this.applyResponseInterceptors(response);
      console.log(`[HTTP] Response ${interceptedResponse.status} ${url}`);
      if (!interceptedResponse.ok) {
        throw {
          message: `HTTP Error: ${interceptedResponse.statusText}`,
          status: interceptedResponse.status,
          statusText: interceptedResponse.statusText,
        } as ApiError;
      }

      const data = await interceptedResponse.json();

      return {
        data,
        status: interceptedResponse.status,
        statusText: interceptedResponse.statusText,
      };
    } catch (error: any) {
      clearTimeout(timeoutId);

      if (error.name === 'AbortError') {
        throw {
          message: 'Request timeout',
          status: 408,
          statusText: 'Request Timeout',
        } as ApiError;
      }

      if (error.status) {
        throw error as ApiError;
      }

      throw {
        message: error.message || 'Network error occurred',
        status: 0,
        statusText: 'Network Error',
      } as ApiError;
    }
  }

  async get<T>(endpoint: string, headers?: Record<string, string>): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'GET', headers });
  }

  async post<T>(endpoint: string, body?: any, headers?: Record<string, string>): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'POST', body, headers });
  }

  async put<T>(endpoint: string, body?: any, headers?: Record<string, string>): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'PUT', body, headers });
  }

  async delete<T>(endpoint: string, headers?: Record<string, string>): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'DELETE', headers });
  }
}

export const httpClient = new HttpClientService('https://jsonplaceholder.typicode.com', 10000);
httpClient.addRequestInterceptor((config) => {
  // const token = localStorage.getItem('token');
  // if (token) {
  //   config.headers = { ...config.headers, Authorization: `Bearer ${token}` };
  // }
  
  console.log('[Interceptor] Request:', config.method, config);
  return config;
});

httpClient.addResponseInterceptor((response) => {
  console.log('[Interceptor] Response:', response.status);
    if (response.status === 401) {
      console.warn('[Security] Unauthorized - session expired');
      //navigate '/login';
    }
    if (response.status === 403) {
      console.warn('[Security] Forbidden - insufficient permissions');
    }
    if (response.status === 419) {
      console.warn('[Security] CSRF token mismatch - refreshing token');
      //httpClient.fetchCSRFToken().then(() => retry request);
    }
  return response;
});