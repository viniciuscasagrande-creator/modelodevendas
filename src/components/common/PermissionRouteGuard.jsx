import React, { useState, useEffect } from 'react';
import { userAccessService } from '../../services/userAccessService';
import AccessDenied from '../users/AccessDenied';

export default function PermissionRouteGuard({ permission, children }) {
  const [allowed, setAllowed] = useState(true);

  useEffect(() => {
    let isMounted = true;
    userAccessService.can(permission).then(res => {
      if (isMounted) setAllowed(res);
    });
    return () => { isMounted = false; };
  }, [permission]);

  if (!allowed) {
    return (
      <div data-testid="permission-route-guard">
        <div data-testid="access-no-permission">
          <AccessDenied reason="PERMISSION_DENIED" />
        </div>
      </div>
    );
  }

  return (
    <div data-testid="permission-route-guard">
      {children}
    </div>
  );
}
