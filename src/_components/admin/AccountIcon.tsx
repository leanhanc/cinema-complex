import NextImage from 'next/image';

export default function AccountIcon() {
	return (
		<NextImage
			src="/icons/user.svg"
			alt=""
			width={32}
			height={32}
			className="rounded-full"
		/>
	);
}
