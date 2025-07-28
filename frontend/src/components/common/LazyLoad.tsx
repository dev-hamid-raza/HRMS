import type React from 'react';
import { Suspense } from 'react';
import LoadingPage from './LoadingPage';

export const LazyLoad = (Component: React.FC) => {
	return (
		<Suspense fallback={<LoadingPage />}>
			<Component />
		</Suspense>
	);
};
