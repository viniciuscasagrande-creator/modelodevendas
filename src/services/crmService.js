import { apiClient } from './apiClient';

export const crmService = {
  async getClients() {
    await apiClient.get('/crm/clients');
    return [];
  },
  async getLeads() {
    await apiClient.get('/crm/leads');
    return [];
  },
  async getPipeline() {
    await apiClient.get('/crm/pipeline');
    return [];
  }
};
