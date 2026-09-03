import React, { useState, useEffect } from 'react';
import { userAccessService } from '../../services/userAccessService';

export default function PermissionGuard({ permission, appId, fallback = null, children }) {
  const [hasAccess, setHasAccess] = useState(true);

  useEffect(() => {
    let isMounted = true;
    userAccessService.canUserAccess({ permission, appId }).then(res => {
      if (isMounted) setHasAccess(res.allowed);
    });
    return () => { isMounted = false; };
  }, [permission, appId]);

  if (!hasAccess) {
    return fallback;
  }

  return <>{children}</>;
}
