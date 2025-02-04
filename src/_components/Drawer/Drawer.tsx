'use client';

/* Utils */
import { cn } from '@/lib/utils/tailwind';

/* Context */
import { useHeaderContext } from '@/lib/context/HeaderContext';

/* Components */
import Link from '@/_components/Link';
import Backdrop from '@/_components/Backdrop';

/* Hooks */
import { useRef } from 'react';
import { useOnClickOutside } from '@/lib/hooks/useOnClickOutside';

/* Types */
import type { Header } from '@/payload-types';

export default function Drawer({ headerData }: { headerData?: Header }) {
	/* Context */
	const { isMobileMenuOpen, setIsMobileMenuOpen } = useHeaderContext();

	/* Refs */
	const drawerRef = useRef<HTMLElement>(null);

	/* Hooks */
	useOnClickOutside(drawerRef, () => {
		if (isMobileMenuOpen) {
			setIsMobileMenuOpen(false);
		}
	});

	return (
		<>
			{/* Backdrop */}
			<Backdrop isVisible={isMobileMenuOpen} />

			{/* Drawer */}
			<nav
				ref={drawerRef}
				className={cn(
					'scrollbar-hide animate-transition-left fixed top-0 left-0 z-50 flex h-screen max-w-[360px] min-w-[300px] transform flex-col overflow-y-auto rounded-r-[16px] bg-blue-900 px-[12px] py-[28px] pt-[12px] pb-[24px] shadow-lg transition-transform duration-300',
					isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full',
				)}
			>
				<ul className="flex h-full w-full flex-col">
					{headerData?.navItems &&
						headerData.navItems.length > 0 &&
						headerData.navItems.map((navItem) => {
							return (
								<li key={navItem.link.label}>
									<Link {...navItem.link} />
								</li>
							);
						})}
				</ul>
			</nav>
		</>
	);
}
