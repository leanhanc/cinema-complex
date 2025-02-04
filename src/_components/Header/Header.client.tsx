'use client';

import NextImage from 'next/image';

/* Context */
import { useHeaderContext } from '@/lib/context/HeaderContext';

/* Utils */
import { isMedia } from '@/lib/utils/payload';

/* Types */
import type { Header, Customization } from '@/payload-types';

/* Components */
import Link from '@/_components/Link';
import Backdrop from '@/_components/Backdrop';

interface HeaderClientProps {
	headerData: Header;
	customizationData: Customization;
}

export default function HeaderClient({
	headerData,
	customizationData,
}: HeaderClientProps) {
	const { isMobileMenuOpen, shouldShowGoBackIcon, setIsMobileMenuOpen } =
		useHeaderContext();

	return (
		<>
			{/* Mobile Icons */}
			<button
				className="relative right-2 mr-2 flex appearance-none items-center justify-center gap-6"
				onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
			>
				{shouldShowGoBackIcon ? (
					<NextImage
						src="/icons/arrow-back.svg"
						alt="back"
						width={36}
						height={36}
					/>
				) : (
					<NextImage
						src="/icons/hamburger.svg"
						alt="menu"
						width={36}
						height={36}
					/>
				)}
			</button>

			{/* Logo */}
			{customizationData.logo &&
				isMedia(customizationData.logo) &&
				customizationData.logo.url && (
					<div className="mr-auto flex-1">
						<NextImage
							src={customizationData.logo.url}
							alt={customizationData.logo.alt}
							width={180}
							height={44}
							className="h-[36px] w-[148px] md:h-[44px] md:w-[180px]"
						/>
					</div>
				)}

			{/* Desktop Nav */}
			<ul className="hidden items-center justify-center gap-4 md:flex">
				{headerData.navItems &&
					headerData.navItems.length > 0 &&
					headerData.navItems.map((navItem) => {
						return (
							<li key={navItem.link.label}>
								<Link {...navItem.link}>{navItem.link.label}</Link>
							</li>
						);
					})}
			</ul>

			{/* Desktop User Icons */}
			<div className="ml-auto hidden flex-1 items-center justify-end gap-6 md:flex">
				<NextImage src="/icons/tickets.svg" alt="user" width={24} height={22} />
				<NextImage src="/icons/user.svg" alt="user" width={24} height={24} />
			</div>

			{/* Backdrop */}
			<Backdrop isVisible={isMobileMenuOpen} />
		</>
	);
}
