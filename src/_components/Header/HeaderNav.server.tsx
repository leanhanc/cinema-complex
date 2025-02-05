import { Suspense } from 'react';

/* Components */
import Header from './Header';
import HeaderClientComponent from './Header.client';

/* Server Actions */
import { getHeaderData } from './Header.actions';

async function AsyncHeaderContent() {
	const { headerData, customizationData } = await getHeaderData();

	return (
		<HeaderClientComponent
			headerData={headerData}
			customizationData={customizationData}
		/>
	);
}

function HeaderContent() {
	return (
		<Suspense
			fallback={
				<div className="flex w-full animate-pulse items-center justify-between">
					<div className="h-8 w-32 rounded bg-blue-700"></div>
					<div className="hidden gap-4 md:flex">
						<div className="h-4 w-20 rounded bg-blue-700"></div>
						<div className="h-4 w-20 rounded bg-blue-700"></div>
						<div className="h-4 w-20 rounded bg-blue-700"></div>
					</div>
					<div className="flex gap-4">
						<div className="h-6 w-6 rounded bg-blue-700"></div>
						<div className="h-6 w-6 rounded bg-blue-700"></div>
					</div>
				</div>
			}
		>
			<AsyncHeaderContent />
		</Suspense>
	);
}

export default function HeaderNav() {
	return (
		<Header>
			<HeaderContent />
		</Header>
	);
}
