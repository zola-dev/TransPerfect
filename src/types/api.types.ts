export interface ApiResponse<T> {
  data: T;
  status: number;
  statusText: string;
}
export interface ApiError {
  message: string;
  status?: number;
  statusText?: string;
}
export interface RequestConfig {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  headers?: Record<string, string>;
  body?: any;
  timeout?: number;
}
export interface ErrorDisplayProps {
  error: ApiError;
  onRetry: () => void;
}
