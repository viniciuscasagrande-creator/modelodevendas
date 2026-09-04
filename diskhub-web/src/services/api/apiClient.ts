export class ApiError extends Error {
  status: number;
  data: any;

  constructor(status: number, message: string, data?: any) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }
}

interface RequestOptions extends RequestInit {
  timeoutMs?: number;
}

class ApiClient {
  private baseURL: string;

  constructor() {
    this.baseURL = (import.meta.env.VITE_DISKHUB_API_URL || 'http://localhost:3001').replace(/\/+$/, '');
  }

  setBaseURL(url: string) {
    this.baseURL = url.replace(/\/+$/, '');
  }

  getBaseURL(): string {
    return this.baseURL;
  }

  private getToken(): string | null {
    try {
      return localStorage.getItem('diskhub_token');
    } catch {
      return null;
    }
  }

  async request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    const { timeoutMs = 15000, headers = {}, ...customConfig } = options;
    const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    const url = `${this.baseURL}${cleanEndpoint}`;

    const requestId = `req-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    const token = this.getToken();

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
        if (typeof window !== 'undefined' && !window.location.pathname.startsWith('/login')) {
          localStorage.removeItem('diskhub_token');
          localStorage.removeItem('diskhub_user');
          // Dispatch auth event or let RequireAuth handle
        }
        throw new ApiError(401, 'Sessão expirada ou não autorizada. Faça login novamente.');
      }

      // Handle 403 Forbidden
      if (response.status === 403) {
        throw new ApiError(403, 'Acesso restrito ao plano atual ou permissões insuficientes.');
      }

      if (!response.ok) {
        const errorBody = await response.json().catch(() => ({}));
        throw new ApiError(
          response.status,
          errorBody.error || errorBody.message || `Erro na requisição (${response.status})`,
          errorBody
        );
      }

      return (await response.json()) as T;
    } catch (err: any) {
      clearTimeout(id);
      if (err.name === 'AbortError') {
        throw new ApiError(408, 'Tempo limite de resposta excedido (Timeout).');
      }
      if (err instanceof ApiError) {
        throw err;
      }
      throw new ApiError(500, err.message || 'Falha de conexão com a API do DiskHub.');
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
