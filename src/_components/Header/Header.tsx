'use client';

import type { ReactNode } from 'react';

export default function Header({ children }: { children: ReactNode }) {
	return (
		<header className="bg-blue-800">
			<div className="container flex h-20 flex-row items-center justify-between py-4">
				{children}
			</div>
		</header>
	);
}
