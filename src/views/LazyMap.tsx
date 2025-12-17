import { lazy, Suspense } from 'react';
import { ActivityIndicator } from 'react-native';

export default function LazyMap() {
  const LazMap = lazy(() => import('./Map'));
  return (
    <Suspense fallback={<ActivityIndicator size="large" />}>
      <LazMap />
    </Suspense>
  );
}
