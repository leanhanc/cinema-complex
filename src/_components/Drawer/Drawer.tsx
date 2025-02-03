'use client';

/* Utils */
import { cn } from '@/lib/utils/tailwind';

/* Context */
import { useHeaderContext } from '@/lib/context/HeaderContext';

/* Components */
import Link from '@/_components/Link';

/* Types */
import type { Customization } from '@/payload-types';

export default function Drawer({
	customizationData,
}: {
	customizationData: Customization;
}) {
	const { isMobileMenuOpen } = useHeaderContext();

	return (
		<div
			className={cn(
				'fixed inset-0 z-50 flex h-full w-full flex-col bg-white transition-transform duration-300',
				isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full',
			)}
		>
			<nav className="flex h-full w-full flex-col">
				{/* {headerData.navItems &&
					headerData.navItems.length > 0 &&
					headerData.navItems.map((navItem) => {
						return <Link key={navItem.link.label} {...navItem.link} />;
					})} */}
			</nav>
		</div>
	);
}
