'use client';
import { useRef, type ReactNode } from 'react';

/* Utils */
import { cn } from '@/lib/utils/tailwind';

/* Context */
import { useHeaderContext } from '@/lib/context/HeaderContext';

/* Components */
import Backdrop from '@/_components/Backdrop';

/* Hooks */
import { useOnClickOutside } from '@/lib/hooks/useOnClickOutside';

interface DrawerProps {
	children: ReactNode;
}

export default function Drawer({ children }: DrawerProps) {
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
				<ul className="flex h-full w-full flex-col">{children}</ul>
			</nav>
		</>
	);
}
