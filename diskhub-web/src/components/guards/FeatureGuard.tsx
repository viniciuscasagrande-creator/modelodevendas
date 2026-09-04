import React, { ReactNode } from 'react';
import { useAppContext } from '../../hooks/useAppContext';

interface FeatureGuardProps {
  feature: string;
  fallback?: ReactNode;
  children: ReactNode;
}

export function FeatureGuard({ feature, fallback = null, children }: FeatureGuardProps) {
  const { hasFeature } = useAppContext();

  if (hasFeature(feature)) {
    return <>{children}</>;
  }

  return <>{fallback}</>;
}
