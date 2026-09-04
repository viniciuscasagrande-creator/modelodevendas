import { apiService } from './apiService';
import { subscriptionService } from './subscriptionService';
import { defaultRoles } from '../config/roles';

class UserAccessService {
  constructor() {
    this.currentUserId = 'usr_001'; // Default: Owner
  }

  getCurrentUserId() {
    return this.currentUserId;
  }

  setCurrentUserId(id) {
    this.currentUserId = id;
  }

  async getCurrentUser() {
    const users = await apiService.getUsers();
    return users.find(u => u.id === this.currentUserId) || users[0];
  }

  async canUserAccess({ appId, permission }) {
    const user = await this.getCurrentUser();

    // 1. Check user status
    if (user.status !== 'active') {
      return { allowed: false, reason: 'USER_SUSPENDED' };
    }

    // 2. Check company license
    if (appId && !subscriptionService.canAccess(appId)) {
      return { allowed: false, reason: 'LICENSE_REQUIRED' };
    }

    // 3. Check app access for user
    if (appId && user.role !== 'owner' && !user.apps.includes(appId)) {
      return { allowed: false, reason: 'APP_ACCESS_DENIED' };
    }

    // 4. Check role and permission
    if (permission) {
      const roleDef = defaultRoles[user.role] || defaultRoles.operator;
      if (roleDef.permissions.includes('*')) {
        return { allowed: true };
      }

      const hasExact = roleDef.permissions.includes(permission);
      const [mod] = permission.split('.');
      const hasWildcard = roleDef.permissions.includes(`${mod}.*`);

      if (!hasExact && !hasWildcard) {
        return { allowed: false, reason: 'PERMISSION_DENIED' };
      }
    }

    return { allowed: true };
  }

  async can(permission) {
    const res = await this.canUserAccess({ permission });
    return res.allowed;
  }

  async canAccessApp(appId) {
    const res = await this.canUserAccess({ appId });
    return res.allowed;
  }

  hasPermission(permission) {
    try {
      const stored = localStorage.getItem('diskhub_current_profile');
      const roleKey = stored ? JSON.parse(stored).role : 'owner';
      const roleDef = defaultRoles[roleKey] || defaultRoles.owner;
      if (!roleDef || roleDef.permissions.includes('*')) return true;
      if (roleDef.permissions.includes(permission)) return true;
      const [mod] = permission.split('.');
      return roleDef.permissions.includes(`${mod}.*`);
    } catch {
      return true;
    }
  }
}

export const userAccessService = new UserAccessService();
