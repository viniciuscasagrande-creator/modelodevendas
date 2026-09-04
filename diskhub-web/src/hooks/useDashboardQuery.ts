import { useQuery } from '@tanstack/react-query';
import { dashboardService } from '../services/dashboardService';
import { DashboardSummaryResponse } from '../types/dashboard';
import { useAppContext } from './useAppContext';

export function useDashboardQuery(period?: string) {
  const { tenant } = useAppContext();
  const tenantId = tenant?.id || 'default';

  return useQuery<DashboardSummaryResponse, Error>({
    queryKey: ['dashboard', 'summary', tenantId, period || 'default'],
    queryFn: () => dashboardService.getSummary(),
    staleTime: 1000 * 60 * 2, // 2 minutes
    refetchOnWindowFocus: false,
    enabled: !!tenant?.id,
  });
}

