export class ApiError extends Error {
  status: number;
  data: any;
  code?: string;
  requestId?: string;

  constructor(status: number, message: string, data?: any, code?: string, requestId?: string) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
    this.code = code;
    this.requestId = requestId;
  }
}

interface RequestOptions extends RequestInit {
  timeoutMs?: number;
}

class ApiClient {
  private baseURL: string;
  private tenantId: string | null = null;

  constructor() {
    this.baseURL = (import.meta.env.VITE_DISKHUB_API_URL || 'http://localhost:3001').replace(/\/+$/, '');
    try {
      this.tenantId = localStorage.getItem('diskhub_tenant_id') || 'tenant-diskhub-01';
    } catch {
      this.tenantId = 'tenant-diskhub-01';
    }
  }

  setBaseURL(url: string) {
    this.baseURL = url.replace(/\/+$/, '');
  }

  getBaseURL(): string {
    return this.baseURL;
  }

  setTenantId(id: string | null) {
    this.tenantId = id;
    if (id) {
      try {
        localStorage.setItem('diskhub_tenant_id', id);
      } catch {}
    } else {
      try {
        localStorage.removeItem('diskhub_tenant_id');
      } catch {}
    }
  }

  getTenantId(): string | null {
    if (!this.tenantId) {
      try {
        this.tenantId = localStorage.getItem('diskhub_tenant_id') || 'tenant-diskhub-01';
      } catch {
        this.tenantId = 'tenant-diskhub-01';
      }
    }
    return this.tenantId;
  }

  private getToken(): string | null {
    try {
      return localStorage.getItem('diskhub_token');
    } catch {
      return null;
    }
  }

  async request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    const { timeoutMs = 2500, headers = {}, ...customConfig } = options;
    const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    const url = `${this.baseURL}${cleanEndpoint}`;

    const requestId = `req-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    const token = this.getToken();
    const currentTenant = this.getTenantId();

    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeoutMs);

    const defaultHeaders: Record<string, string> = {
      'Content-Type': 'application/json',
      'X-Request-Id': requestId,
      'Accept': 'application/json',
    };

    if (token) {
      defaultHeaders['Authorization'] = `Bearer ${token}`;
    }

    if (currentTenant) {
      defaultHeaders['X-Tenant-Id'] = currentTenant;
    }

    try {
      const response = await fetch(url, {
        ...customConfig,
        headers: {
          ...defaultHeaders,
          ...(headers as Record<string, string>),
        },
        signal: controller.signal,
      });

      clearTimeout(id);

      // Handle 401 Unauthorized
      if (response.status === 401) {
        if (typeof window !== 'undefined') {
          const currentPath = window.location.pathname;
          if (!currentPath.startsWith('/login')) {
            localStorage.removeItem('diskhub_token');
            localStorage.removeItem('diskhub_user');
            window.location.href = `/login?redirect=${encodeURIComponent(currentPath)}`;
          }
        }
        throw new ApiError(401, 'Sessão expirada ou não autorizada. Faça login novamente.', null, 'session_expired', requestId);
      }

      // Handle 403 Forbidden
      if (response.status === 403) {
        const errorBody = await response.json().catch(() => ({}));
        throw new ApiError(
          403,
          errorBody.message || 'Acesso negado para a operação solicitada.',
          errorBody,
          errorBody.error || 'forbidden',
          requestId
        );
      }

      // Handle 429 Rate Limit
      if (response.status === 429) {
        throw new ApiError(429, 'Muitas solicitações simultâneas. Tente novamente em alguns instantes.', null, 'rate_limit', requestId);
      }

      if (!response.ok) {
        const errorBody = await response.json().catch(() => ({}));
        throw new ApiError(
          response.status,
          errorBody.error || errorBody.message || `Erro na requisição (${response.status})`,
          errorBody,
          errorBody.code,
          requestId
        );
      }

      return (await response.json()) as T;
    } catch (err: any) {
      clearTimeout(id);
      if (err.name === 'AbortError') {
        throw new ApiError(408, 'Tempo limite de resposta excedido (Timeout).', null, 'timeout', requestId);
      }
      if (err instanceof ApiError) {
        throw err;
      }
      throw new ApiError(500, err.message || 'Falha de conexão com a API do DiskHub.', null, 'network_error', requestId);
    }
  }

  get<T>(endpoint: string, options?: RequestOptions): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: 'GET' });
  }

  post<T>(endpoint: string, data?: any, options?: RequestOptions): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  put<T>(endpoint: string, data?: any, options?: RequestOptions): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  delete<T>(endpoint: string, options?: RequestOptions): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: 'DELETE' });
  }
}

export const apiClient = new ApiClient();
