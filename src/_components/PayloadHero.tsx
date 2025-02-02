'use client';

import Image from 'next/image';
import type { Media } from '@/payload-types';

interface PayloadHeroProps {
	hero?: {
		title?: string;
		showAppIcon?: boolean;
		backgroundImage?: Media | string;
	};
}

export function PayloadHero({ hero }: PayloadHeroProps) {
	if (!hero?.title) return null;

	const backgroundImageUrl =
		typeof hero.backgroundImage === 'string'
			? hero.backgroundImage
			: hero.backgroundImage?.url;

	return (
		<div className="relative w-full min-h-[300px] flex items-center justify-center">
			{/* Background Image */}
			{backgroundImageUrl && (
				<Image
					src={backgroundImageUrl}
					alt={hero.title}
					fill
					className="object-cover z-0"
					priority
				/>
			)}

			{/* Overlay for better text readability */}
			<div className="absolute inset-0 bg-black/40 z-10" />

			{/* Content */}
			<div className="relative z-20 container mx-auto px-4 text-center">
				{hero.showAppIcon && (
					<div className="mb-6">
						<Image
							src="/logo.png"
							alt="App Logo"
							width={80}
							height={80}
							className="mx-auto"
						/>
					</div>
				)}
				<h1 className="text-4xl md:text-5xl font-bold text-white">
					{hero.title}
				</h1>
			</div>
		</div>
	);
}
