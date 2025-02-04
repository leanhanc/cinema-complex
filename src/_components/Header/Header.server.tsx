import { Suspense } from 'react';

/* Types */
import type { Customization, Header as HeaderData } from '@/payload-types';

/* Components */
import HeaderClientComponent from './Header.client';

export default function Header({
	customizationData,
	headerData,
}: {
	customizationData: Customization;
	headerData: HeaderData;
}) {
	return (
		<header className="bg-blue-800">
			<div className="container flex h-20 flex-row items-center justify-between py-4">
				<Suspense fallback={<div>Loading...</div>}>
					<HeaderClientComponent
						headerData={headerData}
						customizationData={customizationData}
					/>
				</Suspense>
			</div>
		</header>
	);
}
