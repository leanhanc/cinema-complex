interface BackdropProps {
	isVisible: boolean;
}

export default function Backdrop({ isVisible }: BackdropProps) {
	if (!isVisible) return null;

	return (
		<div
			className="fixed inset-0 z-40 bg-[black] opacity-50 transition-opacity"
			aria-hidden="true"
		/>
	);
}
