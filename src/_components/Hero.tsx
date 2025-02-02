'use client';

import Image from 'next/image';

/* Utils */
import { cn } from '@/lib/utils/tailwind';

interface HeroProps {
	title: string;
	showAppIcon?: boolean;
	backgroundImage?: {
		src: string;
		alt: string;
	};
	className?: string;
}

export function Hero({
	title,
	showAppIcon = false,
	backgroundImage,
	className,
}: HeroProps) {
	return (
		<div
			className={cn(
				'relative w-full min-h-[300px] flex items-center justify-center',
				className,
			)}
		>
			{/* Background Image */}
			{backgroundImage && (
				<Image
					src={backgroundImage.src}
					alt={backgroundImage.alt}
					fill
					className="object-cover z-0"
					priority
				/>
			)}

			{/* Overlay for better text readability */}
			<div className="absolute inset-0 bg-black/40 z-10" />

			{/* Content */}
			<div className="relative z-20 container mx-auto px-4 text-center">
				{showAppIcon && (
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
				<h1 className="text-4xl md:text-5xl font-bold text-white">{title}</h1>
			</div>
		</div>
	);
}
