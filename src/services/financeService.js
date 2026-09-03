import { apiClient } from './apiClient';

export const financeService = {
  async getCashFlow() {
    await apiClient.get('/finance/cashflow');
    return [];
  },
  async getDRE() {
    await apiClient.get('/finance/dre');
    return {};
  },
  async getAccountsPayable() {
    await apiClient.get('/finance/accounts-payable');
    return [];
  },
  async approveRepasse(id) {
    await apiClient.post(`/finance/repasses/${id}/approve`);
    return { success: true };
  }
};
