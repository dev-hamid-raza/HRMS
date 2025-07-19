import type React from 'react';
import { Suspense } from 'react';

export const LazyLoad = (Component: React.FC) => {
	return (
		<Suspense fallback={<>Loading...</>}>
			<Component />
		</Suspense>
	);
};
