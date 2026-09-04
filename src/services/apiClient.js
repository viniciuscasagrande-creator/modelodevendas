import { subscriptionService } from './subscriptionService';
import { userAccessService } from './userAccessService';

class ApiClient {
  constructor(baseURL = '/api') {
    this.baseURL = baseURL;
  }

  getTenantId() {
    try {
      const sub = subscriptionService.getSubscription();
      return sub.producerId || 'prod_pedreira_001';
    } catch {
      return 'prod_pedreira_001';
    }
  }

  getHeaders() {
    const sub = subscriptionService.getSubscription();
    const userId = userAccessService.getCurrentUserId();
    const correlationId = `req_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

    return {
      'Content-Type': 'application/json',
      'X-Tenant-ID': this.getTenantId(),
      'X-User-ID': userId || 'usr_001',
      'X-Correlation-ID': correlationId,
      'Authorization': 'Bearer diskhub_session_token_valid'
    };
  }

  async request(endpoint, options = {}) {
    const headers = {
      ...this.getHeaders(),
      ...(options.headers || {})
    };

    // In a full client/server setup this would do:
    // const res = await fetch(`${this.baseURL}${endpoint}`, { ...options, headers });
    // For this client simulation, return formatted response:
    return {
      ok: true,
      status: 200,
      correlationId: headers['X-Correlation-ID']
    };
  }

  async get(endpoint, params = {}) {
    return this.request(endpoint, { method: 'GET', params });
  }

  async post(endpoint, data = {}) {
    return this.request(endpoint, { method: 'POST', body: JSON.stringify(data) });
  }

  async patch(endpoint, data = {}) {
    return this.request(endpoint, { method: 'PATCH', body: JSON.stringify(data) });
  }

  async delete(endpoint) {
    return this.request(endpoint, { method: 'DELETE' });
  }
}

export const apiClient = new ApiClient();
