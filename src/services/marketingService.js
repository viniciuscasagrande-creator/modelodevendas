import { apiClient } from './apiClient';

export const marketingService = {
  async getCampaigns() {
    await apiClient.get('/marketing/campaigns');
    return [];
  },
  async getAudiences() {
    await apiClient.get('/marketing/audiences');
    return [];
  },
  async getAnalytics() {
    await apiClient.get('/marketing/analytics');
    return {};
  }
};

export const supportService = {
  async getTickets() {
    await apiClient.get('/support/tickets');
    return [];
  },
  async getCustomer360(id) {
    await apiClient.get(`/support/customers/${id}`);
    return {};
  },
  async getSLA() {
    await apiClient.get('/support/sla');
    return {};
  }
};
